/* eslint-disable no-undef */
const QuestionModel = require('../models/questions');
const AnswerModel = require('../models/answers');
const TagModel = require('../models/tags');
const CommentModel = require('../models/comments');
const UserModel = require('../models/user');

function filteredQuestions(questions, filter) {
    let sortedQuestions = [...questions];

    if (filter == "newest") {
        sortedQuestions = sortedQuestions.sort((a, b) => {
            return b.ask_date_time - a.ask_date_time;
        });
    }
    else if (filter == "active") {
        sortedQuestions = sortedQuestions.sort((a, b) => {
            return b.activity_date_time - a.activity_date_time;
        });

    }
    else if (filter == "unanswered") {
        sortedQuestions = sortedQuestions.filter(sortedQuestions => sortedQuestions.answers.length === 0);
    }

    return sortedQuestions;
}


function searchQuestions(searchQuery, questions) {
    if (!searchQuery) {
        // No search query provided, return all questions
        return questions;
    }

    const results = questions.filter(question => {
        // Check if any word in the search query is present in the title or text
        const queryWords = searchQuery.split(/\s+/);
        const matchTitle = queryWords.some(word =>
            question.title.toLowerCase().includes(word.toLowerCase())
        );
        const matchText = queryWords.some(word =>
            question.text.toLowerCase().includes(word.toLowerCase())
        );

        // Check if square brackets [] are used to specify tags
        if (/\[(.*?)\]/.test(searchQuery)) {
            const tags = searchQuery.match(/\[(.*?)\]/g).map(tag => tag.replace(/[[\]]/g, '').toLowerCase());
            const matchTags = tags.some(tag =>
                question.tags.some(questionTag => questionTag.name.toLowerCase().includes(tag))
            );
            return (matchTitle || matchText) || matchTags;
        }

        return matchTitle || matchText;
    });

    if (results.length == 0) {
        return [{
            qid: '',
            title: "No Questions Found",
            text: "No questions match your search criteria.",
            tags: [],
            asked_ny: '',
            ask_date_time: new Date(),
            answers: [],
            views: 0,
        }];
    }
    else {
        return results;
    }

}


function calculateMetaData(questions) {
    const currentDate = new Date();
    for (let i = 0; i < questions.length; i++) {
        questions[i].askDataFormatted = formatQuestionMetadata(questions[i].ask_date_time, currentDate);
    }
    return questions;
}

function formatQuestionMetadata(postDate, currentDate) {
    // Calculate the time difference in milliseconds
    if (typeof (postDate) == "string") {
        postDate = new Date(postDate);
    }
    const timeDifference = currentDate - postDate;

    // Convert milliseconds to seconds, minutes, or hours
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hours >= 24) {
        // If more than 24 hours have passed, display the full date
        const options = { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: false };
        return `asked ${postDate.toLocaleDateString('en-US', options)}`;
    } else if (minutes >= 60) {
        // If more than 60 minutes have passed, display hours
        return `asked ${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes >= 1) {
        // If more than 1 minute has passed, display minutes
        return `asked ${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
        // If less than 1 minute has passed, display seconds
        return `asked ${seconds} second${seconds === 1 ? '' : 's'} ago`;
    }
}


function tagCreate(name) {
    let tag = new TagModel({ name: name });
    return tag.save();
}

async function answerCreate(text, ans_by, ans_date_time) {
    answerdetail = { text: text };
    if (ans_by != false) answerdetail.ans_by = ans_by;
    if (ans_date_time != false) answerdetail.ans_date_time = ans_date_time;
    answerdetail.activity_date_time = ans_date_time;

    let answer = new AnswerModel(answerdetail);

    // Save the answer to the user's answers array
    const status = await UserModel.findOneAndUpdate(
        { username: ans_by },
        { $push: { answers: answer._id } },
        { new: true },
    );

    return answer.save();
}

async function questionCreate(title, text, tags, answers, asked_by, ask_date_time, views) {
    qstndetail = {
        title: title,
        text: text,
        tags: tags,
        asked_by: asked_by,
        votes: 0
    }
    if (answers != false) qstndetail.answers = answers;

    var latestDate = ask_date_time;
    // Check if the answers array is not empty
    if (answers && answers.length > 0) {
        // Use the reduce function to find the answer with the latest ans_date_time
        const latestAnswer = answers.reduce((latest, current) => {
            const currentDate = new Date(current.ans_date_time);
            const latestDate = latest ? new Date(latest.ans_date_time) : null;

            // Compare dates and update the latest answer if current is newer
            if (!latestDate || currentDate > latestDate) {
                return current;
            }

            return latest;
        }, null);

        // Now latestAnswer contains the answer with the latest ans_date_time
        if (latestAnswer) {
            latestDate = new Date(latestAnswer.ans_date_time);
        }
    }

    if (ask_date_time != false) qstndetail.ask_date_time = ask_date_time;
    qstndetail.activity_date_time = latestDate;
    if (views != false) qstndetail.views = views;

    let qstn = new QuestionModel(qstndetail);

    // Save the question to the user's questions array
    const status = await UserModel.findOneAndUpdate(
        { username: asked_by },
        { $push: { questions: qstn._id } },
        { new: true },
    );

    return qstn.save();
}

async function commentCreate(text, username) {
    const created_date = new Date();
    commentdetail = { text: text, comment_date_time: created_date, comment_by: username, activity_date_time: created_date };
    let comment = new CommentModel(commentdetail);

    // Save the comment to the user's comments array
    const status = await UserModel.findOneAndUpdate(
        { username: username },
        { $push: { comments: comment._id } },
        { new: true },
    );

    return comment.save();
}

module.exports = { filteredQuestions, searchQuestions, calculateMetaData, questionCreate, answerCreate, tagCreate, commentCreate };