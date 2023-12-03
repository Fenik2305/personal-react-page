const express = require('express')
const AuthController = require('../controllers/authController.js');

const {
    getMessages,
    getUserMessages,
    getMessage,
    createMessage,
    deleteMessage,
    deleteMessages
} = require("../controllers/messageController.js")

const router = express.Router()

// GET all messages
router.get('/', AuthController.roleAuthorization(["admin"]), getMessages);

// GET all user's messages
router.get('/:userID', AuthController.roleAuthorization(["user", "admin"]), getUserMessages)

// GET a single message
router.get('/:id', AuthController.roleAuthorization(["user", "admin"]), getMessage);

// POST a new message
router.post('/', createMessage);

// DELETE a message
router.delete('/:id', AuthController.roleAuthorization(["admin"]), deleteMessage);

// DELETE all messages
router.delete('/', AuthController.roleAuthorization(["admin"]), deleteMessages);

module.exports = router