const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    _id: {
        type: String,required: true,
        default:generateCustomId
    },
    sequence_value: {
        type: Number,
        default: 0,
    }
},
{ collection: "Counter" }
);

