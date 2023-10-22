const Message = require("../models/messageModel.js");
const mongoose = require("mongoose");

// GET all messages
const getMessages = async (req, res) => {
    const messages = await Message.find({}).sort({createdAt: -1})

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
    const {name, email, mssg} = req.body

    try {
        const message = await Message.create({ name, email, mssg })
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
    getMessage,
    createMessage,
    deleteMessage,
    deleteMessages
  }