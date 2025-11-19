import express from "express";
import User from "../model/user.js";
import bcrypt from "bcrypt";

const accountRouter = express.Router();

accountRouter.put("/", async (req, res) => {

    const user = User.findById(req.user._id);

    if(user) {

        user.username = req.body.username;
        user.email = req.body.email;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.password = bcrypt.hashSync(req.body.password, 10);

        await user.save();

        user.password = "hidden";

        res.status(202).json(user);
    }

});

export default accountRouter;