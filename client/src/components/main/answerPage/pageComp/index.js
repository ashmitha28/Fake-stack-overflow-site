/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { parseText } from "../../utils/helpers.js";
import AnswerComp from "../answer/index.js";
import { newAnswersPage, newQuestionPage } from "../../utils/stateUpdateHelpers.js";
import formatDate from "../../utils/helpers.js";
import { getCommentById } from "../../../../services/api.js";
import CommentComp from "../Comments/index.js";
import TagItemComponent from "../../tagPage/tag.js";

import upvote from '../../static/upvote.png';
import downvote from '../../static/downvote.png';

import './index.css';



const PageComp = ({ setShowPageDictionary, qid, allQuestions, allAnswers, setCurrentTid, currentTid, modelData, userType, apiService, getData, userData, setDbUpdated }) => {
    const [commentDetails, setCommentDetails] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commentErrors, setCommentErrors] = useState([]);

    const question = allQuestions.find(q => q.qid === qid);
    const questionComments = question.comments;
    const [scoreVoteCounter, setScoreVoteCounter] = useState(0);
    const [questionerDetails, setQuestionerDetails] = useState(null);
    const [votingErrorMessage, setVotingErrorMessage] = useState("");

   
    useEffect(() => {



        const getQuestionerDetails = async () => {
            const data = await apiService.getUserDetailsByUsername(question.asked_by);

            setQuestionerDetails(data);
        }

        const fetchCommentDet = async () => {
            var finalComments = [];
            questionComments.forEach(async (comment) => {
                const detail = await getCommentById(comment._id)
                finalComments.push(detail);
            })
            setCommentDetails(finalComments)
        }

        fetchCommentDet();
        getQuestionerDetails();
    }, []);

    const answers = question.answers
        .map(ans => allAnswers.find(a => a._id === ans._id))
        .filter(Boolean) // Remove undefined elements in case an answer is not found
        .sort((a, b) => new Date(b.ans_date_time) - new Date(a.ans_date_time));

    const formattedQuestionDate = formatDate(question.ask_date_time)
    const parsedTextQuestion = parseText(question.text);

    // ---------------------------------------------------------------
    const handleUpvote = async (id) => {

        if (userData.data.rep_score <= 50) {
            setVotingErrorMessage("Reputation Score should be greater than 50 to vote");
        }
        else {
            await apiService.increaseVote("question", id)
            await apiService.increaseRepScore(questionerDetails._id)
            await apiService.updateActivity("question", id);
            setDbUpdated(1);
            await getData();
        }
    }

    const handleDownvote = async (id) => {
        if (userData.data.rep_score <= 50) {
            setVotingErrorMessage("Reputation Score should be greater than 50 to vote");
        }
        else {
            await apiService.decreaseVote("question", id)

            await apiService.decreaseRepScore(questionerDetails._id)
            await apiService.updateActivity("question", id);
            setDbUpdated(1);
            await getData();
        }

    }

    const handleAddComment = async (id) => {
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

        if (errors.length > 0) {
            // Update the errors state
            setCommentErrors(errors);
            return;
        }

        try {
            await apiService.addNewComment("question", id, newComment, userData.data.username);
            await getData();
            await apiService.updateActivity("question", id);
            setNewComment("");

        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment. Please try again.");
        }
    }

    // ---------------------------------------------------------------
    const RenderAnswers = () => {
        const itemsPerPage = 5;
        const [currentPage, setCurrentPage] = useState(1);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleAnswers = answers.slice(startIndex, endIndex);
        visibleAnswers.sort((a, b) => {
            // Sort in descending order based on the 'accepted' property
            if (a.accepted && !b.accepted) {
                return -1; // 'a' comes first
            } else if (!a.accepted && b.accepted) {
                return 1; // 'b' comes first
            } else {
                return 0; // No change in order
            }
        });

        console.log("answers", visibleAnswers);

        const totalPages = Math.ceil(answers.length / itemsPerPage);

        const handleNextPage = () => {
            setCurrentPage(currentPage + 1);
        };

        const handlePrevPage = () => {
            setCurrentPage(currentPage - 1);
        };

        // get the current question username using qid and modeldata
        const currQuestion = modelData.find((q) => q.qid === qid);

        return (
            <div className="answers-container">
                <h1>Answers</h1>
                <div className="answers-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {visibleAnswers.length > 0 ? (
                        <>
                            {visibleAnswers.map(answer => (
                                <>
                                    <AnswerComp key={answer.aid} answer={answer} userType={userType} apiService={apiService} getData={getData} userData={userData} modelData={modelData} currQuestion={currQuestion} setDbUpdated={setDbUpdated} />
                                </>
                            ))}

                            <br />
                            <div className="pagination">
                                <button id="previousAnswers" onClick={handlePrevPage} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                                <button id="nextAnswers" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <h6><i>No Answers</i></h6>
                    )}
                </div>
            </div>
        );
    }

    const RenderComments = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const commentsPerPage = 3;

        const sortedComments = question.comments.sort((a, b) => new Date(b.comment_date_time) - new Date(a.comment_date_time));

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
                {currentComments.length > 0 ? (
                    <>
                        {currentComments.map((comment) => (
                            <CommentComp key={comment._id} comment={comment} userType={userType} apiService={apiService} getData={getData} modelData={modelData} />
                        ))}
                        <br />
                        <div className="commentnavigation">
                            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                Prev
                            </button>
                            <button onClick={handleNextPage} disabled={indexOfLastComment >= question.comments.length}>
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

    // ---------------------------------------------------------------
    return (
        <>

            <div id="main" className="main">
                <div className="container">
                    <div id="mainbar" className="mainbar">
                        <div id="answersHeader" className="main-header-container">
                            <div className="question-heading-container">
                                <div id="numanswers" className="num-questions">
                                    <span id=""> {answers.length} answers &nbsp;</span>
                                </div>
                                <div id="allquestions" className="question-title-answerpage">

                                    <h2> {question.title} </h2>
                                </div>
                                <div className="ask-question-container">
                                    {userType.registered && <button id="" className="askaquestion" onClick={() => newQuestionPage(setShowPageDictionary)}> Ask a Question </button>}
                                </div>
                            </div>
                        </div>
                        <div id="answersHeader" className="main-header-container">
                            <div id="questionBody" className="question-body-container">
                                <div id="numviews" className="num-views">
                                    <p id=""> {question.views} views</p>
                                </div>
                                <div id="text" className="question-text">
                                    <p id=""> {parsedTextQuestion}</p>
                                </div>
                                <div className="questionAuthor">
                                    <span>
                                        <div className=""> <span className="username-style">{question.asked_by}</span></div>
                                        <div className="dateText"> asked {formattedQuestionDate}</div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <span>
                                <div className=""> {question.votes} Votes</div>
                            </span>
                        </div>
                        <br />
                        {userType.registered && (
                            <div className="voting-section">

                                <span className="upvote">Upvote &nbsp; </span>
                                <button id="question-upvote" className="vote-button" onClick={() => { handleUpvote(question.qid) }}>
                                    <img src={upvote} alt="Upvote" className="transparent-image" />
                                </button>

                                &nbsp;
                                <span className="downvote">Downvote &nbsp; </span>
                                <button id="question-downvote" className="vote-button" onClick={() => { handleDownvote(question.qid) }}>
                                    <img src={downvote} alt="Downvote" className="transparent-image" />
                                </button>
                                <br />
                                <span className="error-message">{votingErrorMessage}</span>
                            </div>
                        )}
                        <br />

                        <div className="tag-list">
                            {
                                question.tags.map(tag => {
                                    return <TagItemComponent key={tag.tid} tag={tag} setCurrentTid={setCurrentTid} setShowPageDictionary={setShowPageDictionary} currentTid={currentTid} modelData={modelData} inline={1} />
                                })
                            }
                        </div>

                        <hr className="seperator" />
                        <div>
                            <h5>Question Comments</h5>
                            <RenderComments />

                            {userType.registered && (
                                <>
                                    <br />
                                    <div className="add-comment-section">
                                        <input id="addQuestionComment" type="text" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleAddComment(question.qid);
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

                        <hr className="seperator" />

                        <RenderAnswers />

                        <br />
                        <div className="answer-question-container">
                            {userType.registered && <button id="" className="ansquestion" onClick={() => newAnswersPage(setShowPageDictionary)}> Answer Question </button>}
                        </div>
                    </div>

                </div>
            </div>
        </>

    )


}

export default PageComp;
