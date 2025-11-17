import mongoose from "mongoose";

const threadData = new mongoose.Schema({
    startDate: Date,
    startedBy: {type: mongoose.Types.ObjectId, ref: 'User'},
    active: Boolean,
    comments: [{type: mongoose.Types.ObjectId, ref: 'Comment'}]
});


const Comment = mongoose.model('Thread', threadData);

module.exports = Comment;