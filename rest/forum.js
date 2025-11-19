import express from "express";
import User from "../model/user.js";
import Thread from "../model/thread.js";
import Comment from "../model/comment.js";
import verifyAuth from "../middleware/verifyAuth.js";

const forumRouter = express.Router();

forumRouter.get("/", verifyAuth, async (req, res) => {

    const threads = Thread.find({});

    res.json(threads.map((thread) => {
        return {
            id: thread.id,
            name: thread.name,
            startedAt: thread.startedAt,
            active: thread.active
        }
    }));
});

forumRouter.get("/thread/{threadId}", verifyAuth, async (req, res) => {

    const thread = await Thread.findById(req.params.threadId);

    const startedBy = User.findById(thread.startedBy.toString());

    const comments = [];

    thread.comments.forEach(async (entry) => {
        const comment = await Comment.findById(entry.toString());

        comments.push(comment);
    });

    const constructedComments = comments.map(async (entry) => {
        const postedBy = await User.findById(entry.user.toString());
        return {
            id: entry.id,
            user: postedBy.username,
            commentDate: entry.commentDate,
            data: entry.data
        }
    });

    const completeThread = {
        name: thread.name,
        startDate: thread.startDate,
        startedBy: startedBy,
        active: thread.active,
        comments: constructedComments
    }

    res.json(completeThread);
});

forumRouter.post("/new", verifyAuth, async (req, res) => {

    const user = await User.findById(req.user._id);

    if(user) {

        const newThreadPayload = {
            name: req.body.name,
            startDate: Date.now(),
            startedBy: user.id,
            active: true
        };

        const newThread = await Thread.create(newThreadPayload);

        res.status(201).json(newThread.map((entry) => {
            return {
                id: entry.id,
                name: entry.name
            }
        }))

    }else {
        res.status(401).json("Not logged in properly.")
    }
});

forumRouter.put("/thread/{threadId}/new", verifyAuth, async (req, res) => {

    const user = await User.findById(req.user._id);

    const thread = await Thread.findById(req.params.threadId);

    if(user) {
        res.status(401).json("Not logged in properly.");
    }

    if(!thread) {
        res.status(404).json("");
    }

    const newCommentPayload = {
        data: req.body.data,
        user: user.id,
        thread: thread.id,
        commentDate: Date.now
    };

    const newComment = await Comment.create(newCommentPayload);

    res.status(201).json(newComment.map((entry) => {
        return {
            id: entry.id.toString,
            data: entry.data
        }
    }));
})

export default forumRouter;