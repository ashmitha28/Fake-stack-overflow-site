const express = require("express");
const router = express.Router();
const TagModel = require('../models/tags');

//GET ------------------------------------------------------------------------------------------------

router.get("/", async (req, res) => {
    try {
        const tags = await TagModel.find();
        res.json(tags);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get tag by ID
router.get("/:tid", async (req, res) => {
    try {
        const tid = req.params.tid;
        const tag = await TagModel.findOne({ tid });

        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});


//POST
router.post("/", async (req, res) => {
    try {
        const newTag = await TagModel.create(req.body)
        res.json(newTag);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Update a tag
router.put("/updatetag/:tid", async (req, res) => {
    try {
        const tid = req.params.tid;
        const content = req.body;
        const updatedTag = await TagModel.findOneAndUpdate({ tid: tid }, { $set: content });
        res.json(updatedTag)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//Delete a tag
router.delete("/delete/:tid", async (req, res) => {
    try {
        const tid = req.params.tid;
        const deletedTag = await TagModel.deleteOne({ tid: tid });
        res.json(deletedTag)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;
