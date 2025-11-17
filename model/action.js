import mongoose from "mongoose";

const actionData = new mongoose.Schema({
    device: {type: mongoose.Types.ObjectId, ref: "Device"},
    data: String
});

const Action = mongoose.model('Action', actionData);

module.exports = Action;