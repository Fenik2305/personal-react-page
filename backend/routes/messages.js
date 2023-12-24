const express = require('express')
const AuthController = require('../controllers/authController.js');

const {
    getMessages,
    getMessagesPage,
    getMessage,
    createMessage,
    deleteMessage
} = require("../controllers/messageController.js")

const router = express.Router()

// POST a new message
router.post('/', createMessage);

// GET all messages
router.get('/', AuthController.roleAuthorization(["admin"]), getMessages);

// DELETE a message by index
router.delete('/:idx', AuthController.roleAuthorization(["admin"]), deleteMessage);

// GET messages page
router.get('/messagePages/:userID', AuthController.roleAuthorization(["user", "admin"]), getMessagesPage);

// GET a single message
router.get('/:id', AuthController.roleAuthorization(["user", "admin"]), getMessage);



module.exports = router