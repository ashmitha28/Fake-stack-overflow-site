/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { answersPage, newQuestionPage, questionsForTagPage } from "../utils/stateUpdateHelpers";
import "./index.css";
import { formatDateDisplay } from "../utils/utils";

const HomePageComponent = ({ showPageDictionary,
    setShowPageDictionary,
    userToken,
    userType,
    setUserType,
    setActiveTab,
    fetchData,
    modelData,
    setCurrentQid,
    currentTid,
    setCurrentTid,
    setAllQuestions,
    setAllAnswers,
    setAllTags,
    setAllComments,
    apiService,
    setFilter,
    filter,
    searchQuery,
    setSearchQuery }) => {


    useEffect(() => {
        setActiveTab('home');
    }, []);

    //-------------------------------------------------------
    // helper functions 
    const handleFilterButtonClick = (buttonId) => {
        if (filter === buttonId) {
            // do nothing
        }
        else {
            setFilter(buttonId);

        }
    };

    const getData = async () => {
        const questionData = await apiService.getAllQuestions();
        const answersData = await apiService.getAllAnswers();
        const tagsData = await apiService.getAllTags();
        setAllQuestions(questionData);
        setAllAnswers(answersData);
        setAllTags(tagsData);
        fetchData(apiService.FILTER_QUESTION_API + filter);
    }

    const handleIncreaseViewCount = async (qid) => {
        const res = await apiService.increaseViewCount(qid);
        await getData();

    }

    // create tags to display the model data, with updated links
    const RenderQuestionData = () => {
        var questions = modelData;
        const [currentPage, setCurrentPage] = useState(1);
        const questionsPerPage = 5;

        const startIndex = (currentPage - 1) * questionsPerPage;
        const endIndex = startIndex + questionsPerPage;

        const questionsToDisplay = modelData.slice(startIndex, endIndex);

        const handleNextPage = () => {
            const totalPages = Math.ceil(modelData.length / questionsPerPage);
            setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : 1));
        };

        const handlePrevPage = () => {
            setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
        };

        return (
            <div className="question-data-container">
                {questionsToDisplay.map((question) => (
                    <>
                        <div key={question.qid} className="question-container">
                            <div className="postStats">
                                <p>{question.votes} votes </p>
                                <p>{question.answers.length} answers</p>
                                <p>{question.views} views</p>
                            </div>

                            <div className="postTitle">
                                <a id={question.qid} href="#" className="question-title" onClick={async () => {
                                    handleIncreaseViewCount(question.qid);
                                    setCurrentQid(question.qid);
                                    answersPage(setShowPageDictionary); // Action 1
                                    setCurrentTid("");
                                }}>
                                    {question.title}
                                </a>
                                <br />

                                {question.tags.map((tag) => {
                                    return (
                                        // eslint-disable-next-line react/jsx-key
                                        <a href="#" className="tag-style" onClick={() => {
                                            setCurrentTid(tag.tid);
                                            questionsForTagPage(setShowPageDictionary);
                                        }}>
                                            {tag.name}
                                        </a>
                                    );
                                })}
                            </div>

                            <div className="lastActivity">
                                <span style={{ color: 'red', display: 'inline' }}>
                                    {question.asked_by} &nbsp;
                                </span>
                                <span>
                                    {formatDateDisplay(question.ask_date_time)}
                                </span>
                            </div>


                        </div>
                        <hr className="" />
                    </>
                ))}

                <div className="pagination-buttons">
                    <button id="prevButton" onClick={handlePrevPage} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <button id="nextButton" onClick={handleNextPage} disabled={currentPage === Math.ceil(modelData.length / questionsPerPage)}>
                        Next
                    </button>
                </div>
            </div>
        );
    }

    //-------------------------------------------------------
    return (
        <>
            <div id="mainbar" className="mainbar">
                <div className="main-header-container">
                    <div className="">
                        <div id="allquestions" className="all-questions">
                            <h2 id="questions-heading-value">All Questions </h2>
                        </div>

                        <div id="numquestions" className="num-questions">
                            <p id="numberofquestions">  {modelData.length} questions </p>
                        </div>
                    </div>

                    <div className="ask-question-container">
                        {userType.registered && <button id="ask-question-button" className="askaquestion" onClick={() => newQuestionPage(setShowPageDictionary)}> Ask a Question </button>}

                        <br></br>
                        <br></br>

                        <div className="filter-container">
                            <button
                                id="newest"
                                className={`toggle-button ${filter === 'newest' ? 'selected' : ''}`}
                                onClick={() => handleFilterButtonClick('newest')}>
                                Newest
                            </button>
                            <button
                                id="active"
                                className={`toggle-button ${filter === 'active' ? 'selected' : ''}`}
                                onClick={() => handleFilterButtonClick('active')}>
                                Active
                            </button>
                            <button
                                id="answered"
                                className={`toggle-button ${filter === 'unanswered' ? 'selected' : ''}`}
                                onClick={() => handleFilterButtonClick('unanswered')}>
                                Unanswered
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="" />
                <RenderQuestionData />
                <div id="data-container" className="">

                </div>
            </div>
        </>
    )

};


export default HomePageComponent;
