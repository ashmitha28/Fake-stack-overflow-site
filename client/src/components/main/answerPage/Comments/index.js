/* eslint-disable react/prop-types */
import React from "react";
import upvote from '../../static/upvote.png';
import { formatDateDisplay } from "../../utils/utils";


const CommentComp = ({ comment, userType, apiService, getData, modelData }) => {
    const handleUpvote = async (id) => {
        await apiService.increaseVote("comment", id)
        await getData();
        await apiService.updateActivity("comment", id);

        const filteredQuestions = modelData.filter((question) =>
            question.comments.some((comment) => comment.cid === id)
        );
        await apiService.updateActivity("question", filteredQuestions[0]._id);
    }

    return (
        <>
            <div className="comments">
                <div id="questionBody" className="answer-body">
                    <p className="comment-info"> {comment.text} </p>
                    <div className="comment-details">
                        <span className="">
                            <div className="nameText"> <span className="username-style">{comment.comment_by}</span> </div>
                            <div className="nameText"> {formatDateDisplay(comment.comment_date_time)} </div>
                            <div className="nameText"> {comment.votes} votes</div>
                        </span>

                        {userType.registered && (
                            <div className="voting-section-comment">
                                <span className="upvote">Upvote &nbsp; </span>
                                <button id="comment-upvote" className="vote-button-comment" onClick={() => { handleUpvote(comment.cid) }}>
                                    <img src={upvote} alt="Upvote" className="transparent-image-comment" style={{ height: '16px', width: '16px' }}/>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <hr className=""></hr>
            </div>

        </>
    )



}

export default CommentComp;
