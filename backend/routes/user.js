const express = require('express');

const AuthController = require('../controllers/authController.js');

const { loginUser,
        signupUser,
        getPaginatedUsersWithMessages, 
        updateUserRoleByEmail,
        disableUserByEmail} = require('../controllers/userController.js')

const router = express.Router()

router.get('/userPages/', AuthController.roleAuthorization(['admin']), getPaginatedUsersWithMessages)

router.post('/login', loginUser)
router.post('/signup', signupUser)

router.patch('/updateRoleByEmail/:email', AuthController.roleAuthorization(['admin']), updateUserRoleByEmail)
router.patch('/disableByEmail/:email', AuthController.roleAuthorization(['admin']), disableUserByEmail)

module.exports = router