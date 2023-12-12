const Message = require("../models/messageModel.js");
const mongoose = require("mongoose");

// GET all messages
const getMessages = async (req, res) => {
    const messages = await Message.find({}).sort({createdAt: -1})

    res.status(200).json(messages)
};

// GET messages page
const getMessagesPage = async (req, res) => {
    const { userID } = req.params

    const messages = await Message.find({ author: userID }).sort({createdAt: -1})

    const length = messages.length;
    const pageNum = parseInt(req.query.pageNum);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort == "asc" ? 1 : -1;

    startIdx = pageNum * limit;
    endIdx = Math.min(startIdx + limit, length);

    const page = {
        totalItems: length,
        items: messages.slice(startIdx, endIdx),
        totalPages: Math.ceil(length / limit),
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

    try {
        const message = await Message.create({ name, email, mssg, author })
        res.status(200).json(message)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a message
const deleteMessage = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such message!"})
    }

    const message = await Message.findOneAndDelete({_id: id})

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