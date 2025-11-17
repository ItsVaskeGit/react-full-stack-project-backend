import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import homeRouter from './rest/home.js';
import accountRouter from './rest/account.js';
import devicesRouter from './rest/devices.js';
import deviceRouter from './rest/device.js';
import documentationRouter from './rest/documentation.js';
import forumRouter from './rest/forum.js';
import loginRouter from './rest/login.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
dotenv.config();

async function connect() {
    await mongoose.connect(process.env.MONGO_URI);
}

app.use("/", homeRouter);
app.use("login", loginRouter);
app.use("/account", accountRouter);
app.use("/devices", devicesRouter);
app.use("/device", deviceRouter);
app.use("/docs", documentationRouter);
app.use("forum", forumRouter);

app.listen(3000, () => { console.log("Started listening to the port 3000.") })

connect().then(() => { console.log("Connected to MongoDB") });