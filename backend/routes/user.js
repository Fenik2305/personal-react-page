const express = require('express');
const AuthController = require('../controllers/authController.js');

//controller
const { loginUser, signupUser, getUsers } = require('../controllers/userController.js')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//get all users
router.get('/', AuthController.roleAuthorization(['user', 'admin']), getUsers)

module.exports = router