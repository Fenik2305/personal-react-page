const express = require('express');
const AuthController = require('../controllers/authController.js');

//controller
const { loginUser,
        signupUser,
        updateUser,
        deleteUser, 
        getUsers } = require('../controllers/userController.js')

const router = express.Router()

//get all users
router.get('/', AuthController.roleAuthorization(['user', 'admin']), getUsers)

//login user
router.post('/login', loginUser)

//signup user
router.post('/signup', signupUser)

//update user
router.patch('/:id', updateUser)

//delete user
router.delete('/:id', deleteUser)


module.exports = router