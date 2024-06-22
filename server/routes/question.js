/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();

const QuestionModel = require('../models/questions');
const TagModel = require('../models/tags');
const { filteredQuestions, searchQuestions, calculateMetaData, questionCreate, tagCreate, commentCreate } = require('./utils');

//GET ------------------------------------------------------------------------------------------------
//get all questions
router.get("/", async (req, res) => {
    try {
        var questions = await QuestionModel.find().populate('tags').populate('answers').populate('comments');
        questions = calculateMetaData(questions);

        //console.log('questions', questions)
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get questions based on qid
router.get("/:qid", async (req, res) => {
    try {
        const qid = req.params.qid;
        const question = await QuestionModel.findOne({ qid }).populate('tags').populate('answers').populate('comments');

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

//get questions based on filter
router.get("/filtered/:filter", async (req, res) => {
    try {
        const filter = req.params.filter;

        var questions = await QuestionModel.find().populate('tags').populate('answers').populate('comments');
        if (filter === 'newest' || filter === 'active' || filter === 'unanswered') {
            questions = filteredQuestions(questions, filter);
        } else {
            // Default to 'new' filter if the provided filter is invalid
            questions = filteredQuestions(questions, 'newest');
        }

        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get questions based on searchParam(text and tag)
router.get("/search/:param", async (req, res) => {
    try {
        const param = req.params.param;
        var questions = await QuestionModel.find().populate('tags').populate('answers').populate('comments');
        questions = searchQuestions(param, questions);
        questions = filteredQuestions(questions, "newest");
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


//get questions based on searchParam and filter(text and tag)
router.get("/search/:param/:filter", async (req, res) => {
    try {
        const param = req.params.param;
        const filter = req.params.filter;
        var questions = await QuestionModel.find().populate('tags').populate('answers').populate('comments');
        questions = searchQuestions(param, questions);
        questions = filteredQuestions(questions, filter);
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// get questions based on tag id
router.get("/tag/:tagid", async (req, res) => {
    try {
        const tagid = req.params.tagid;
        var questions = await QuestionModel
            .find()
            .populate('tags')
            .populate('answers')
            .then(questions => {
                return questions.filter(question => {
                    // Filter based on tagid in the populated 'tags' array
                    return question.tags.some(tag => tag.tid === tagid);
                });
            });
        questions = filteredQuestions(questions, "newest");
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


//POST ------------------------------------------------------------------------------------------------
//put Increase View Count for given questionID
router.put("/increaseviewcount/:qid", async (req, res) => {
    try {
        const qid = req.params.qid;
        const status = await QuestionModel.findOneAndUpdate({ qid: qid }, { $inc: { views: 1 } }, { new: true });
        res.json(status)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put("/updateQuestionAnswers/:qid", async (req, res) => {
    try {
        const qid = req.params.qid;
        const updates = req.body
        const status = await QuestionModel.updateOne({ qid: qid }, { $set: updates })
        res.json(status)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//post new question
router.post("/", async (req, res) => {
    
    
    try {
       
        allTagIDs = [];
        const tags = await TagModel.find();
        

        for (var i = 0; i < req.body.tags.length; i++) {
            var tagName = req.body.tags[i].name;

            // check if tag exists
            const tagExists = tags.some(tag => tag.name === tagName);
           

            if (tagExists) {
                const existingTag = tags.find(tag => tag.name === tagName);
               
                allTagIDs.push(existingTag);
                
            }
            else {

                let t = await tagCreate(tagName);
                allTagIDs.push(t);
             
            }
        }
        
 
        let q = await questionCreate(req.body.title, req.body.text, allTagIDs, req.body.answers, req.body.asked_by, req.body.ask_date_time, req.body.views)
       
        res.json(q);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//UPDATE
//update question
router.put("/:qid", async (req, res) => {
    try {
        console.log('reached the backedn')
        const qid = req.params.qid;
        const question = req.body
        console.log('qid', qid)
        console.log('question', question)
        const updatedQuestion = await QuestionModel.updateOne({ _id: qid }, { $set: question }, { new: true });
        res.json(updatedQuestion)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//put Increase Vote for given questionID
router.put("/increasevote/:qid", async (req, res) => {
    try {
        const qid = req.params.qid;
        const status = await QuestionModel.findOneAndUpdate({ qid: qid }, { $inc: { votes: 1 } }, { new: true });
        res.json(status)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//put Decrease Vote for given questionID
router.put("/decreasevote/:qid", async (req, res) => {
    try {
        const qid = req.params.qid;
        const status = await QuestionModel.findOneAndUpdate({ qid: qid }, { $inc: { votes: -1 } }, { new: true });

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


router.put("/newcomment/:qid", async (req, res) => {
    console.log("new comment question");
    try {
        console.log(req.body);
        const qid = req.params.qid;
        const comment = await commentCreate(req.body.comment, req.body.username);

        const updatedQuestion = await QuestionModel.findOneAndUpdate(
            { qid: qid },
            { $push: { comments: comment }},
            { new: true }
        );
        
        res.json(updatedQuestion)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
})

router.put("/activity/:qid", async (req, res) => {
    console.log("Update activity");
    try {
        const qid = req.params.qid;

        const updatedQuestion = await QuestionModel.findOneAndUpdate(
            { qid: qid },
            { $set: { activity_date_time: new Date() } },
            { new: true }
        );

        res.json(updatedQuestion)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
})

//DELETE QUESTION
router.delete('/delete/:qid', async (req, res) => {
    try {
        console.log('over here')
        const qid = req.params.qid;
        const deleteQuestion = await QuestionModel.deleteOne({ qid: qid });
        res.status(200).json(deleteQuestion)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;