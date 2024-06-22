/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Use bcrypt for password hashing
const router = express.Router();
const _ = require('lodash');

const UserModel = require('../models/user');

const secretKey = process.env.JWT_SECRET || '12345678';

// guest user ID
const guestID = "123123";

//GET ------------------------------------------------------------------------------------------------
router.get("/userdata/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const decodedToken = jwt.verify(token, secretKey);
        const id = decodedToken.userId;
        if (id === guestID) {
            const guestUser = {
                username: "Guest",
                email: "",
                password: ""
            }
            return res.status(200).json(guestUser);
        }
        else {
            const user = await UserModel.findById(id).populate('answers').populate('comments').populate('questions');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get("/userdetails/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const response = await UserModel.findOne({ username: username }).populate('answers').populate('comments').populate('questions');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }
})

router.get("/tokenexpiry/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const decodedToken = jwt.verify(token, secretKey);

        if (decodedToken.exp * 1000 < Date.now()) {
            res.status(200).json({ message: "true" });
        }

        res.status(200).json({ message: "false" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


router.get("/checkemail/:email", async (req, res) => {
    try {
        // get the email
        const email = req.params.email

        // Check if email exists in the database
        const existingUser = await UserModel.findOne({ email }).populate('answers').populate('comments').populate('questions');

        // return true or false
        if (existingUser) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.get("/checkusername/:username", async (req, res) => {
    try {
        // get the email
        const username = req.params.username

        // Check if email exists in the database
        const existingUser = await UserModel.findOne({ username }).populate('answers').populate('comments').populate('questions');

        // return true or false
        if (existingUser) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

//POST------------------------------------------------------------------------------------------------ 
router.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body;

        // Check if the user with the provided email exists
        const user = await UserModel.findOne({ username }).populate('answers').populate('comments').populate('questions');

        if (!user) {
            return res.status(401).json({ message: 'User With Username Doesnt Exist' });
        }

        // Check if the provided password matches the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        // Generate a JWT
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        // add the new token to db
        user.token = token;

        // Save the updated user to the database
        await user.save();

        // create session 
        req.session.token = token;

        // Return the JWT to the client
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


router.post("/signup", async (req, res) => {
    try {

        const { username, password, email } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the hashed password
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email,
            rep_score: 0
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT
        const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '1h' });

        // Save the token to the user model
        newUser.token = token;

        // Save the user to the database with the updated token
        await newUser.save();

        // create session 
        req.session.token = token;

        // Return the JWT to the client
        res.json({ token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post("/guestlogin", async (req, res) => {

    try {
        // Generate a JWT
        const token = jwt.sign({ userId: guestID }, secretKey, { expiresIn: '1h' });

        // create session 
        req.session.token = token;

        // Return the JWT to the client
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.put("/update/:username", async (req, res) => {
    try {

        const username = req.params.username
        const content = _.cloneDeep(req.body);


        const updatedUserDetails = UserModel.updateOne({ username: username }, { $set: content });
        res.json(updatedUserDetails)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


router.put("/increasescore/:id", async (req, res) => {
    try {

        const username = req.params.id

        const updatedUserDetails = await UserModel.findOneAndUpdate({ _id: username }, { $inc: { rep_score: 5 } }, { new: true });
        console.log(updatedUserDetails);
        res.json(updatedUserDetails)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.put("/decreasescore/:id", async (req, res) => {
    try {

        const username = req.params.id
        const updatedUserDetails = await UserModel.findOneAndUpdate({ _id: username }, { $inc: { rep_score: -10 } }, { new: true });
        res.json(updatedUserDetails)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})




module.exports = router;
