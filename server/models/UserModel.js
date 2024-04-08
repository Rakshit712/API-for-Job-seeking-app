const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        unique: [true, "Email alreay in use"]
    },
    password: {
        type: String,
        required: true,

    },
    userName: {
        type: String,
        required: [true, "Please provide your username"],
        unique: true,
    },
    isProvider: {
        default: false,
        type: Boolean
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;