const User = require('../models/userModel.js');
const Role = require('../models/Role.js');
const jwt = require('jsonwebtoken');

const createToken = (_id, roles) => {
    return jwt.sign({_id: _id, roles: roles}, process.env.SECRET, {expiresIn: "7d"})
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const _id = user._id
        const roles = user.roles

        //create token
        const token = createToken(_id, roles)
 
        res.status(200).json({email, _id, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const user = await User.signup(name, email, password)
        const _id = user._id
        const roles = user.roles

        //create token
        const token = createToken(_id, roles)

        res.status(200).json({email, _id, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: -1})

        res.status(200).json({users})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser, getUsers }