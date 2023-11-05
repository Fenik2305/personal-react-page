const express = require('express');

//controller
const { loginUser, signupUser } = require('../controllers/userController.js')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

module.exports = router