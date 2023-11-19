const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: "12h"})
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const _id = user._id

        //create token
        const token = createToken(_id)

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

        //create token
        const token = createToken(_id)

        res.status(200).json({email, _id, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser }