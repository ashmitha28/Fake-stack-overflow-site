
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
    aid: { type: String,unique: true, default:generateCustomId },
    text: { type: String, required: true },
    ans_by: { type: String, required: false },
    ans_date_time: { type: Date, require: true },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    votes: {
        type: Number,
        default: 0,
    },
    activity_date_time: {
        type: Date,
        required: false,
    },
    accepted: {
        type: Boolean,
        default: false
    }
},
{ collection: "Answer" }
);
