
// Question Document Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./counter'); // Import the Counter model
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
    qid: {
        type: String,unique: true,
        default: generateCustomId,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    asked_by: {
        type: String,
        required: true,
    },
    ask_date_time: {
        type: Date,
        required: true,
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    views: {
        type: Number,
        default: 0,
    },
    votes: {
        type: Number,
        default: 0,
    },
    activity_date_time: {
        type: Date,
        required: false,
    }
},
{ collection: "Question" }
);

