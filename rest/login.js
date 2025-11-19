import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import dotenv from "dotenv";
dotenv.config();

const loginRouter = express.Router();

const jwtSecret = process.env.JWT_SECRET;

loginRouter.post("/", async (req, res) => {

    const user = await User.find({username: req.body.username});

    if(user.length !== 0) {

        const correct = bcrypt.compareSync(req.body.password, user[0].password);

        if(correct) {
            const payload = {
                _id: user[0].id,
                username: user[0].username
            }
            res.status(200).json(jwt.sign(payload, jwtSecret));
        }else {
            res.status(401).json("Incorrect password.");
        }
    }else {
        res.status(404).json("User not found.");
    }
});

export default loginRouter;