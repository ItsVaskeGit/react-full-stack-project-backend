import mongoose from "mongoose";

const userData = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    devices: [{type: mongoose.Schema.Types.ObjectId, ref: 'Device'}]
});

const User = mongoose.model('User', userData);

export default User;