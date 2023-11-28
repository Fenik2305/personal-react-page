const express = require('express')
const AuthController = require('../controllers/authController.js');

const {
    getMessages,
    getMessage,
    createMessage,
    deleteMessage,
    deleteMessages
} = require("../controllers/messageController.js")

const router = express.Router()

// GET all messages
router.get('/', AuthController.roleAuthorization(["user", "admin"]), getMessages);

// GET a single message
router.get('/:id', AuthController.roleAuthorization(["user", "admin"]), getMessage);

// POST a new message
router.post('/', createMessage);

// DELETE a message
router.delete('/:id', AuthController.roleAuthorization(["admin"]), deleteMessage);

// DELETE all messages
router.delete('/', AuthController.roleAuthorization(["admin"]), deleteMessages);

module.exports = router