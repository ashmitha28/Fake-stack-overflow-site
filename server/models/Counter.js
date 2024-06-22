// Question Document Schema
const mongoose = require("mongoose");

const Counter = require("./schema/counter");



module.exports = mongoose.model("Counter", Counter);
