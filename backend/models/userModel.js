const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
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

    const user = await this.create({ name, email, password: hash })

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
