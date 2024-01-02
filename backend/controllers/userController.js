const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const {
    getUnregMessages,
    getUserMessages,
} = require("../controllers/messageController.js")

const createToken = (_id, role) => {
    return jwt.sign({_id: _id, role: role}, process.env.SECRET, {expiresIn: "12h"})
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const userValidation = await User.findOne({ email });

        if (!userValidation) {
            return res.status(404).json({ error: "User not found" });
        }

        if (userValidation.isDisabled) {
            return res.status(401).json({ error: "Account is disabled" });
        }

        const user = await User.login(email, password)
        const _id = user._id
        const name = user.name
        const role = user.role

        const token = createToken(_id, role)
 
        res.status(200).json({ _id, email, token, role, name})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const user = await User.signup(name, email, password)
        const _id = user._id
        const role = user.role

        const token = createToken(_id, role)
        
        res.status(200).json({email, _id, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateUserRoleByEmail = async (req, res) => {
    try {
        const { email } = req.params

        const { role } = req.body;

        if (role) {
            const user = await User.findOneAndUpdate({ email: email },
                { $set: { role: role } },
                { new: true });
    
            res.status(200).json(user)
        }

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const disableUserByEmail = async (req, res) => {
    const { email } = req.params

    const user = await User.findOneAndUpdate({ email: email },
        { $set: { isDisabled: true } },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({error: "No such user!"})
    }

    const userMessages = await Message.deleteMany({ author: user["_id"] });

    res.status(200).json(user)
}

/**
 * Returns a page object with paginator parameters.
 *
 * @param {Object} req - For the function to work, the pageNum and itemsLimit fields must be stored in 
 * res.query to set requested page number and the number of requested elements. 
 * You can also specify the propFilter and sortOrder fields if you want to sort the result 
 * by the propFilter field in sortOrder order (desc or asc). Otherwise, the order will
 *  be sorted by the date of your last login to your account in descending order.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Returns a page object containing parameters necessary for the proper functioning of a paginator, 
 * including the total number of items «totalItems», the current page number «currentPage», 
 * the overall number of pages «totalPages». The object also holds the field «items», 
 * storing an array of user objects with message fields, where messages sent by each user are stored.
 */
const getPaginatedUsersWithMessages = async (req, res) => {
    const { pageNum, itemsLimit, propFilter, sortOrder } = req.query;
    const sort = sortOrder === "des" ? -1 : 1;
    
    const usersSort = {};
    usersSort[propFilter] = sort;

    try {
        const totalUsers = await User.countDocuments({ isDisabled: false }) + 1; //users + unreg mssgs

        const totalPages = Math.ceil(totalUsers / itemsLimit);

        const usersForPage = await User.find({ isDisabled: false })
            .sort(usersSort)
            .skip(pageNum * itemsLimit)
            .limit(itemsLimit)
            .select('_id name email role lastVisitAt');

        const userIDs = usersForPage.map(user => user._id);
        const messages = await getUserMessages(userIDs);

        const users = usersForPage.map(user => {
            const userMessages = messages
                .filter(message => message["author"] === user._id.toString())
                .map(message => message.toObject())
                .map(({ author, ...messageWithoutAuthor }) => messageWithoutAuthor);
        
            const { _id, ...userWithoutId } = user.toObject();
        
            return {
                ...userWithoutId,
                messages: userMessages
            };
        });

        const unregMessages = await getUnregMessages();

        const unregMessagesUser = {
            name: "unreg messages",
            email: "",
            lastVisitAt: "",
            role: "",
            messages:unregMessages
        }
        
        if (pageNum == totalPages - 1) {
            users.push(unregMessagesUser);
        }

        const page = {
            totalItems: totalUsers,
            items: users,
            totalPages: totalPages,
            currentPage: pageNum
        }

        res.status(200).json(page)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser, updateUserRoleByEmail, disableUserByEmail, getPaginatedUsersWithMessages }
