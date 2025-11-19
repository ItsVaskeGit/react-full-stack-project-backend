import mongoose from "mongoose";

const commentData = new mongoose.Schema({
    thread: {type: mongoose.Types.ObjectId, ref: 'Thread'},
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    commentDate: Date,
    data: String
});

const Comment = mongoose.model('Comment', commentData);

export default Comment;