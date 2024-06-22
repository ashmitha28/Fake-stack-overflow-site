/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { parseText } from "../../utils/helpers.js";
import formatDate from "../../utils/helpers.js";
import CommentComp from "../Comments/index.js";
import upvote from '../../static/upvote.png';
import downvote from '../../static/downvote.png';


const AnswerComp = ({ answer, userType, apiService, getData, userData, modelData, currQuestion, setDbUpdated }) => {

    const [newComment, setNewComment] = useState("");
    const [commentErrors, setCommentErrors] = useState([]);
    const [votingErrorMessage, setVotingErrorMessage] = useState("");

    const formattedDate = formatDate(answer.ans_date_time);
    const parsedTextQuestion = parseText(answer.text);

    const handleUpvote = async (id, username) => {
        if (userData.data.rep_score <= 50) {
            setVotingErrorMessage("Reputation Score should be greater than 50 to vote");
        }
        else {
            await apiService.increaseVote("answer", id)
            await apiService.updateActivity("answer", id);
            const data = await apiService.getUserDetailsByUsername(username);
            await apiService.increaseRepScore(data._id);
            setDbUpdated(1);

            const filteredQuestions = modelData.filter((question) =>
                question.answers.some((answer) => answer.aid === id)
            );

            await apiService.updateActivity("question", filteredQuestions[0].qid);
            await getData();
        }
    }

    const handleDownvote = async (id, username) => {
        if (userData.data.rep_score <= 50) {
            setVotingErrorMessage("Reputation Score should be greater than 50 to vote");
        }
        else {
            await apiService.decreaseVote("answer", id)

            await apiService.updateActivity("answer", id);

            const data = await apiService.getUserDetailsByUsername(username);
            await apiService.decreaseRepScore(data._id);
            setDbUpdated(1);

            const filteredQuestions = modelData.filter((question) =>
                question.answers.some((answer) => answer.aid === id)
            );

            await apiService.updateActivity("question", filteredQuestions[0].qid);
            await getData();
        }
    }

    const handleAddComment = async (id, username) => {
        const errors = []
        // Validation checks
        if (userData.data.rep_score < 50) {
            errors.push("You need at least 50 reputation points to add a comment.");
        }

        if (newComment.length > 140) {
            errors.push("Comment should be 140 characters or less.");
        }

        if (newComment.length <= 0) {
            errors.push("Comment Cannot be empty.");
        }

        // If there are errors, return from the function
        if (errors.length > 0) {
            // Update the errors state
            setCommentErrors(errors);
            return;
        }

        // Attempt to add a new comment
        try {
            await apiService.addNewComment("answer", id, newComment, userData.data.username);
            await getData();
            await apiService.updateActivity("answer", id);

            const filteredQuestions = modelData.filter((question) =>
                question.answers.some((answer) => answer.aid === id)
            );
            await apiService.updateActivity("question", filteredQuestions[0].qid);

            setNewComment("");

        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment. Please try again.");
        }


    }

    const handleAcceptAnswer = async (id) => {
        console.log("Accept answer");
        await apiService.acceptAnswer(id);
        await getData();

    }

    const RenderComments = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const commentsPerPage = 3;

        const sortedComments = answer.comments.sort((a, b) => new Date(b.comment_date_time) - new Date(a.comment_date_time));

        const indexOfLastComment = currentPage * commentsPerPage;
        const indexOfFirstComment = indexOfLastComment - commentsPerPage;
        const currentComments = sortedComments.slice(indexOfFirstComment, indexOfLastComment);

        const handleNextPage = () => {
            setCurrentPage(currentPage + 1);
        };

        const handlePrevPage = () => {
            setCurrentPage(currentPage - 1);
        };

        return (
            <>
                <h5>Answer Comments</h5>
                {currentComments.length > 0 ? (
                    <>
                        {currentComments.map((comment) => (
                            <CommentComp key={comment._id} comment={comment} userType={userType} apiService={apiService} getData={getData} />
                        ))}
                        <div className="commentnavigation">
                            <button id="previousAnswerComment" onClick={handlePrevPage} disabled={currentPage === 1}>
                                Prev
                            </button>
                            <button id="nextAnswerComment" onClick={handleNextPage} disabled={indexOfLastComment >= answer.comments.length}>
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <h6><i>No Comments</i></h6>
                )}
            </>
        );
    }


    return (
        <>
            <div id="questionBody" className="answer-body">
                <p className="answer-info"> {parsedTextQuestion} </p>
                <div className="answer-details">
                    <span className="answerAuthor">
                        <div className="nameText"> <span className="username-style">{answer.ans_by}</span> </div>
                        <div className="dateText"> answered {formattedDate}</div>
                        <div className="dateText"> {answer.votes} votes</div>
                    </span>

                    {userType.registered && (
                        <div className="voting-section">

                            <span className="upvote">Upvote &nbsp; </span>
                            <button id="answer-upvote" className="vote-button" onClick={() => { handleUpvote(answer.aid, answer.ans_by) }}>
                                <img src={upvote} alt="Upvote" className="transparent-image" />
                            </button>

                            &nbsp;
                            <span className="downvote">Downvote &nbsp; </span>
                            <button id="answer-downvote" className="vote-button" onClick={() => { handleDownvote(answer.aid, answer.ans_by) }}>
                                <img src={downvote} alt="Downvote" className="transparent-image"  />
                            </button>
                            <br />
                            <span className="error-message">{votingErrorMessage}</span>
                        </div>
                    )}

                    {!answer.accepted && (currQuestion.asked_by == userData.data.username) && (
                        <>
                            <br></br>
                            <div>
                                <button id="acceptAnswer" key={answer.aid} onClick={() => { handleAcceptAnswer(answer.aid) }}>Accept Answer</button>
                            </div>
                        </>
                    )}
                    {answer.accepted && (
                        <>
                            <br></br>
                            <span className="answer-accepted"><b> Accepted Answer</b> </span>
                        </>
                    )}
                </div>

                <br />
                <div>
                    <RenderComments />
                </div>

                {userType.registered && (
                    <>
                        <br />
                        <div className="add-comment-section">
                            <input id="addAnswerComment" type="text" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddComment(answer.aid);
                                    }
                                }}
                            />
                            <br />
                            <span className="comment-error">
                                {commentErrors.map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}</span>
                        </div>
                    </>)}
            </div>
            <hr className="seperator"></hr>
        </>
    )

}

export default AnswerComp;
