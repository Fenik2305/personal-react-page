const express = require('express')
const Message = require('../models/messageModel.js')

const router = express.Router()

// GET all messages
router.get('/', (req, res) => {
    res.json({mssg: "GET all messages"});
});

// GET a single message
router.get('/:id', (req, res) => {
    res.json({mssg: "GET a single messages"});
});

// POST a new message
router.post('/', async (req, res) => {
    const {name, email, mssg} = req.body

    try {
        const message = await Message.create({ name, email, mssg })
        res.status(200).json(message)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

// DELETE a message
router.delete('/:id', (req, res) => {
    res.json({mssg: "DELETE a message"})
});

// DELETE all messages
router.delete('/', (req, res) => {
    res.json({mssg: "DELETE all messages"})
})

module.exports = router