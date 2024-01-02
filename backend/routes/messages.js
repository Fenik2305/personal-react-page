const express = require('express')
const AuthController = require('../controllers/authController.js');

const {
    getMessages,
    getMessagesPage,
    createMessage,
    deleteMessage,
    countUserMessages
} = require("../controllers/messageController.js")

const router = express.Router()

// POST a new message
router.post('/', createMessage);

router.get('/count/:userID', AuthController.roleAuthorization(['user', 'admin']), countUserMessages)

// GET all messages
router.get('/', AuthController.roleAuthorization(["admin"]), getMessages);

// DELETE a message by index
router.delete('/:idx', AuthController.roleAuthorization(["admin"]), deleteMessage);

// GET messages page
router.get('/messagePages/:userID', AuthController.roleAuthorization(["user", "admin"]), getMessagesPage);

module.exports = router