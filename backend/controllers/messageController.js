const Message = require("../models/messageModel.js");
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const getUnregMessages = async () => {
    return await Message.find({ author: 'unregistred' })
                        .sort({ createdAt: -1 })
                        .select('-_id -__v -author');
};

const getUserMessages = async (userIDs) => {
    return await Message.find({ author: { $in: userIDs } })
                        .sort({ createdAt: -1 })
                        .select('-_id -__v');
};

// GET all messages
const getMessages = async (req, res) => {
    const messages = await Message.find({}).sort({createdAt: -1})

    res.status(200).json(messages)
};

// GET messages page
const getMessagesPage = async (req, res) => {
    const { userID } = req.params;

    const token = req.headers.authorization.split(' ')[1]

    const {_id: _id, role: userRole} = jwt.verify(token, process.env.SECRET)

    if (userID != _id && userRole == "user") {
        return res.status(403).json({message: "Access to messages of other users is not allowed."})
    }

    const pageNum = req.query.pageNum;
    const itemsLimit = req.query.itemsLimit;
    const propFilter = decodeURIComponent(req.query.propFilter);
    const sortOrder = decodeURIComponent(req.query.sortOrder);
    
    const sort = sortOrder === "des" ? -1 : 1;

    const totalMessages = await Message.countDocuments({ author: userID })

    const messagesFilter = {
        author: userID
    };

    const messagesSort = {};
    messagesSort[propFilter] = sort;

    const messages = await Message.find(messagesFilter)
                                  .sort(messagesSort)
                                  .skip(pageNum * itemsLimit)
                                  .limit(itemsLimit)
                                  .select('-_id -__v -author');

    const page = {
        totalItems: totalMessages,
        items: messages,
        totalPages: Math.ceil(totalMessages / itemsLimit),
        currentPage: pageNum
    };

    res.status(200).json(page);
}

// POST a new message
const createMessage = async (req, res) => {
    const {name, email, mssg, author} = req.body

    const idx = uuidv4();

    try {
        const message = await Message.create({ idx, name, email, mssg, author })
        res.status(200).json(message)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const countUserMessages = async (req, res) => {
    const { userID } = req.params;

    try {
        const totalMessages = await Message.countDocuments({ author: userID })
        res.status(200).json(totalMessages)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a message
const deleteMessage = async (req, res) => {
    const { idx } = req.params

    const message = await Message.findOneAndDelete({ idx: idx })

    if (!message) {
        return res.status(404).json({error: "No such message!"})
    }

    res.status(200).json(message)
}

// DELETE all messages
const deleteMessages = async (req, res) => {
    const messages = await Message.deleteMany({});
    res.status(200).json(messages);
}

module.exports = {
    getMessages,
    getMessagesPage,
    createMessage,
    deleteMessage,
    deleteMessages,
    countUserMessages,

    getUnregMessages,
    getUserMessages
  }