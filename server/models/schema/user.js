const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.Schema(
  {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  rep_score: {
    type: Number,
    required: true,
    default: 0
  }
},
{ collection: "User" }
);

