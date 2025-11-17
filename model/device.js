import mongoose from "mongoose";

const deviceData = new mongoose.Schema({
    history: [{type: mongoose.Types.ObjectId, ref: 'History'}],
    actions: [{type: mongoose.Types.ObjectId, ref: 'Action'}]
});

const Device = mongoose.model('Device', deviceData);

module.exports = Device;