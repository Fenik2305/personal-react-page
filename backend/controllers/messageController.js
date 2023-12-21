const Message = require("../models/messageModel.js");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

// GET all messages
const getMessages = async (req, res) => {
    const messages = await Message.find({}).sort({createdAt: -1})

    res.status(200).json(messages)
};

// GET messages page
const getMessagesPage = async (req, res) => {
    const { userID } = req.params;

    const { pageNum, itemsLimit, propFilter, sortOrder } = req.query;
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

// GET user messages
const getUserMessages = async (req, res) => {
    const { userID } = req.params

    const messages = await Message.find({ author: userID }).sort({createdAt: -1})

    res.status(200).json(messages)
};

// GET a message
const getMessage = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such message!"})
    }

    const message = await Message.findById(id)

    if (!message) {
        return res.status(404).json({error: "No such message!"})
    }

    res.status(200).json(message)
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
    getUserMessages,
    getMessage,
    createMessage,
    deleteMessage,
    deleteMessages
  }