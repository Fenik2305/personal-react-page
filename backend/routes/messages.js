const express = require('express')
const AuthController = require('../controllers/authController.js');

const {
    getMessages,
    getMessagesPage,
    getUserMessages,
    getMessage,
    createMessage,
    deleteMessage,
    deleteMessages
} = require("../controllers/messageController.js")

const router = express.Router()

// DELETE a message
router.delete('/:idx', AuthController.roleAuthorization(["admin"]), deleteMessage);

// GET all messages
router.get('/', AuthController.roleAuthorization(["admin"]), getMessages);

// POST a new message
router.post('/', createMessage);

// DELETE all messages
router.delete('/', AuthController.roleAuthorization(["admin"]), deleteMessages);

// GET messages page
router.get('/messagePages/:userID', AuthController.roleAuthorization(["user", "admin"]), getMessagesPage);

// GET all user's messages
router.get('/:userID', AuthController.roleAuthorization(["user", "admin"]), getUserMessages)

// GET a single message
router.get('/:id', AuthController.roleAuthorization(["user", "admin"]), getMessage);



module.exports = router