const express = require('express')
const {
    getMessages,
    getMessage,
    createMessage,
    deleteMessage,
    deleteMessages
} = require("../controllers/messageController.js")

const router = express.Router()

// GET all messages
router.get('/', getMessages);

// GET a single message
router.get('/:id', getMessage);

// POST a new message
router.post('/', createMessage);

// DELETE a message
router.delete('/:id', deleteMessage);

// DELETE all messages
router.delete('/', deleteMessages);

module.exports = router