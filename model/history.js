import mongoose from "mongoose";

const historyData = new mongoose.Schema({
    type: String,
    data: String
});

const History = mongoose.model('History', historyData);

module.exports = History;