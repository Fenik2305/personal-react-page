const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
    },
    mssg: {
        type: String,
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("Message", messageSchema);