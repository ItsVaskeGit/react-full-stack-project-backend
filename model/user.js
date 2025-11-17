import mongoose from "mongoose";

const userData = new mongoose.Schema({
    username: String,
    password: String,
    devices: [{type: mongoose.Schema.Types.ObjectId, ref: 'Device'}]
});

const User = mongoose.model('User', userData);

module.exports = User;