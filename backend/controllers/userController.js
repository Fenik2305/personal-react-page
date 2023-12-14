const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const mailer = require('../mailer.js');

const createToken = (_id, role) => {
    return jwt.sign({_id: _id, role: role}, process.env.SECRET, {expiresIn: "7d"})
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const _id = user._id
        const name = user.name
        const role = user.role

        //create token
        const token = createToken(_id, role)
 
        res.status(200).json({ _id, email, token, role, name})
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
        const role = user.role

        //create token
        const token = createToken(_id, role)

        {/*const message = {
            to: email,
            subject: "Email verification.",
            text: "test test test"
        };*/}

        //mailer(message);
        
        res.status(200).json({email, _id, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// UPDATE user
const updateUser = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a single user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user!"})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(404).json({error: "No such user!"})
    }

    res.status(200).json(user)
}

// GET all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: -1})

        res.status(200).json({users})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser, updateUser, deleteUser, getUsers }