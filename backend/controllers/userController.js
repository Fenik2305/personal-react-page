const User = require('../models/userModel.js');
const Message = require('../models/messageModel.js');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const mailer = require('../mailer.js');

const createToken = (_id, role) => {
    return jwt.sign({_id: _id, role: role}, process.env.SECRET, {expiresIn: "7d"})
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
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

        //create token
        const token = createToken(_id, role)

        {/*const message = {
            to: email,
            subject: "Email verification.",
            text: "test test test"
        };*/}

        //mailer(message);
        
        res.status(200).json({email, _id, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findOneAndUpdate({ _id: id }, {
            ...req.body
        });

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateUserByEmail = async (req, res) => {
    try {
        const { email } = req.params

        const user = await User.findOneAndUpdate({ email: email }, {
            ...req.body
        });

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user!"})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(404).json({error: "No such user!"})
    }

    res.status(200).json(user)
}

const deleteUserByEmail = async (req, res) => {
    const { email } = req.params

    const user = await User.findOneAndDelete({ email: email })

    if (!user) {
        return res.status(404).json({error: "No such user!"})
    }

    const userMessages = await Message.deleteMany({ author: user["_id"] });

    res.status(200).json(user)
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: -1})

        res.status(200).json({users})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getUsersPage = async (req, res) => {
    const { pageNum, itemsLimit, propFilter, sortOrder } = req.query;
    const sort = sortOrder === "des" ? -1 : 1;
    
    const usersSort = {};
    usersSort[propFilter] = sort;

    try {
        const totalUsers = await User.countDocuments() + 1; //users + unreg mssgs

        const totalPages = Math.ceil(totalUsers / itemsLimit);

        const usersForPage = await User.find({})
            .sort(usersSort)
            .skip(pageNum * itemsLimit)
            .limit(itemsLimit)
            .select('_id name email role lastVisitAt');

        const getUserMessages = async (userIDs) => {
            return await Message.find({ author: { $in: userIDs } })
                                .sort({ createdAt: -1 })
                                .select('-_id -__v');
        };

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

        const getUnregMessages = async () => {
            return await Message.find({ author: 'unregistred' })
                                .sort({ createdAt: -1 })
                                .select('-_id -__v -author');
        };

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

module.exports = { loginUser, signupUser, updateUser, updateUserByEmail, deleteUser, deleteUserByEmail, getUsers, getUsersPage }