const express = require("express");
const router = express.Router();
const AnswerModel = require('../models/answers');
const QuestionModel = require('../models/questions');
const { commentCreate } = require('./utils');

//GET ------------------------------------------------------------------------------------------------
//Get all answers
router.get("/", async (req, res) => {
    try {
        const answers = await AnswerModel.find().populate("comments");
        res.status(200).json(answers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get answer by ID
router.get("/:aid", async (req, res) => {
    try {
        const aid = req.params.aid;
        const answer = await AnswerModel.findOne({ aid }).populate("comments");

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        res.status(200).json(answer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

//POST
//Add new Answer
router.post("/", async (req, res) => {
    try {
        req.body.activity_date_time = new Date();
        const newAnswer = await AnswerModel.create(req.body)
        res.json(newAnswer);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//UPDATE
//update answer
router.put("/:aid", async (req, res) => {
    try {
        const aid = req.params.aid;
        const answer = req.body
        const updatedAnswer = await AnswerModel.updateOne({ aid: aid }, { $set: answer });
        res.json(updatedAnswer)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//put Increase Vote for given answerID
router.put("/increasevote/:aid", async (req, res) => {
    try {
        const aid = req.params.aid;
        const status = await AnswerModel.findOneAndUpdate({ aid: aid }, { $inc: { votes: 1 } }, { new: true });
        res.json(status)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//put Decrease Vote for given questionID
router.put("/decreasevote/:aid", async (req, res) => {
    try {
        const aid = req.params.aid;
        const status = await AnswerModel.findOneAndUpdate({ aid: aid }, { $inc: { votes: -1 } }, { new: true });

        
        res.json(status)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put("/newcomment/:aid", async (req, res) => {
    console.log("new comment");
    try {
        console.log(req.body);
        const aid = req.params.aid;
        const comment = await commentCreate(req.body.comment,req.body.username);

        const updatedQuestion = await AnswerModel.findOneAndUpdate(
            { aid: aid },
            { $push: { comments: comment } },
            { new: true }
        );
        
        res.json(updatedQuestion)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


router.put("/activity/:aid", async (req, res) => {
    console.log("Update activity");
    try {
        const aid = req.params.aid;

        const updatedAnswer = await AnswerModel.findOneAndUpdate(
            { aid: aid },
            { $set: { activity_date_time: new Date() } },
            { new: true }
        );

        res.json(updatedAnswer)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
})

router.put("/acceptanswer/:aid", async (req, res) => {
    console.log("Accept answer");
    try {
        const aid = req.params.aid;

        const updatedAnswer = await AnswerModel.findOneAndUpdate(
            { aid: aid },
            { $set: { accepted: true } },
            { new: true }
        );

        // Update all other answers to set accepted: false
        await AnswerModel.updateMany(
            { aid: { $ne: aid } }, // Exclude the target answer
            { $set: { accepted: false } }
        );

        res.json(updatedAnswer)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
})

router.put("/unacceptanswer/:aid", async (req, res) => {
    console.log("Unaccept answer");
    try {
        const aid = req.params.aid;

        const updatedAnswer = await AnswerModel.findOneAndUpdate(
            { aid: aid },
            { $set: { accepted: false } },
            { new: true }
        );

        res.json(updatedAnswer)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
})


//DELETE QUESTION
router.delete('/delete/:aid', async (req, res) => {
    try {

        const aid = req.params.aid;
        const deletedAnswer = await AnswerModel.deleteOne({ aid: aid });
        res.status(200).json(deletedAnswer)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;