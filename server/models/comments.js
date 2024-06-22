// Comments Document Schema
const mongoose = require("mongoose");

const Comment = require("./schema/comments");



module.exports = mongoose.model("Comment", Comment);
