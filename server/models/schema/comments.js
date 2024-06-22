// Tag Document Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./counter');
const crypto = require('crypto');
function generateCustomId() {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const machineId = crypto.randomBytes(3).toString('hex');  // Simulates the machine identifier
    const processId = crypto.randomBytes(2).toString('hex');  // Simulates the process identifier
    const counter = crypto.randomBytes(3).toString('hex');  // Simulates the counter

    return timestamp + machineId + processId + counter;
  }
module.exports = mongoose.Schema(
    {
    cid: { type: String, unique: true,default:generateCustomId },
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    comment_by: { type: String, required: false, default: "" },
    comment_date_time: { type: Date, require: true },
    activity_date_time: {
        type: Date,
        required: false,
    }
},
{ collection: "Comments" }
);

