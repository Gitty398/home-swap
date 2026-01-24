const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});



userSchema.pre('save', function (next) {
    const docToBeSaved = this
    if (docToBeSaved.username) {
        docToBeSaved.username = docToBeSaved.username[0].toUpperCase() + docToBeSaved.username.slice(1);
    }
});

const User = mongoose.model("User", userSchema)
module.exports = User;