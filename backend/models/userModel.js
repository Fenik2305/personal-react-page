const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Role = require("../models/Role")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
        default: "noname"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        ref: 'Role'
    }],
    lastVisitAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

// static signup method
userSchema.statics.signup = async function (name, email, password) {

    // validation
    if (!email || !password) {
        throw Error("Email and password fields must be filled!");
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use!')
    }

    if (!validator.isEmail(email)) {
        throw Error("Email isn't valid!")
    }

    name = name ? name : "noname" 

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const userRole = await Role.findOne({value: "admin"})

    const user = await this.create({ name, email, password: hash, roles: [userRole.value]})

    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled!");
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email!')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error("Incorrect password!")
    }

    return user
}

module.exports = mongoose.model("User", userSchema);
