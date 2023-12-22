const express = require('express');

//controller
const AuthController = require('../controllers/authController.js');

const { loginUser,
        signupUser,
        updateUser,
        deleteUser, 
        getUsers,
        getPaginatedUsersWithMessages, 
        deleteUserByEmail,
        updateUserByEmail} = require('../controllers/userController.js')

const router = express.Router()

//get all users
router.get('/', AuthController.roleAuthorization(['admin']), getUsers)

//get users page
router.get('/userPages/', AuthController.roleAuthorization(['admin']), getPaginatedUsersWithMessages)

//login user
router.post('/login', loginUser)

//signup user
router.post('/signup', signupUser)

//update user
router.patch('/:id', AuthController.roleAuthorization(['admin']), updateUser)

router.patch('/updateByEmail/:email', AuthController.roleAuthorization(['admin']), updateUserByEmail)

//delete user
router.delete('/:id', AuthController.roleAuthorization(['admin']), deleteUser)

router.delete('/deleteByEmail/:email', AuthController.roleAuthorization(['admin']), deleteUserByEmail)

module.exports = router