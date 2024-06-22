/* eslint-disable no-unused-vars */
// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require('express')
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

const { MONGO_URL } = require("./config");

const app = express();
const port = 8000
app.use(cors());
app.use(express.json());
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


const secretKeySession = process.env.SESSION_SECRET || '123456789';

// Database setup - singleton pattern -------------------------------------------------------------------
// connect to DB 
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once("open", () => console.log("Connected to DB"));

// end points
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Set up session middleware
app.use(session({
  secret: secretKeySession,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60 * 60 * 1000 }, // Session expires in 1 hour
}));

// Routes middleware pattern -------------------------------------------------------------------
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);


// Use the verifyToken middleware for all routes below this point
const verifyToken = require('./middlewareauth/authMiddleware');
//app.use(verifyToken);

const questionRoutes = require("./routes/question");
app.use("/questions", questionRoutes);

const answerRoutes = require("./routes/answer");
app.use("/answers", answerRoutes);

const tagRoutes = require("./routes/tag");
app.use("/tags", tagRoutes);

const commentRoutes = require("./routes/comment");
app.use("/comments", commentRoutes)




// Server -------------------------------------------------------------------
// start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Cleaning up before exit.');
  // Perform cleanup tasks if needed
  process.exit(0);
});
