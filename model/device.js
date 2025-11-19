import mongoose from "mongoose";

const deviceData = new mongoose.Schema({
    active: Boolean,
    image: String,
    history: [{type: mongoose.Types.ObjectId, ref: 'History'}],
    actions: [{type: mongoose.Types.ObjectId, ref: 'Action'}]
});

const Device = mongoose.model('Device', deviceData);

export default Device;