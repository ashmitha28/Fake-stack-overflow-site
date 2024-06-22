const express = require("express");
const router = express.Router();
const CommentsModel = require('../models/comments');

//GET ------------------------------------------------------------------------------------------------
//Get all comments
router.get("/", async (req, res) => {
    try {
        const comments = await CommentsModel.find();
        //console.log('comments', comments)
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get comment by id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const comment = await CommentsModel.findOne({ _id: id });
        //console.log('comments by id', comment)
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//put Increase Vote for given questionID
router.put("/increasevote/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const status = await CommentsModel.findOneAndUpdate({ cid: cid }, { $inc: { votes: 1 } }, { new: true });
        res.json(status)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//put Decrease Vote for given commentID
router.put("/decreasevote/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const status = await CommentsModel.findOneAndUpdate({ cid: cid }, { $inc: { votes: -1 } }, { new: true });

        /*
        if (status.votes < 0) {
            status.votes = 0;
            await status.save();
        }*/

        res.json(status)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put("/activity/:cid", async (req, res) => {
    console.log("Update activity");
    try {
        const cid = req.params.cid;

        const updatedComment = await CommentsModel.findOneAndUpdate(
            { cid: cid },
            { $set: { activity_date_time: new Date() }},
            { new: true }
        );
        
        res.json(updatedComment)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
})

module.exports = router