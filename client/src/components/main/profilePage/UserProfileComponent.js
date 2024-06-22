/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./index.css";
import UserProfileTagComponent from "./UserProfileTags";
import { newAnswersPage, newQuestionPage } from "../utils/stateUpdateHelpers";


const UserProfileComponent = ({ setShowPageDictionary, userData, allQuestions, allAnswers, setEditingQuestion, setEditingAnswer, setDbUpdated, apiService }) => {

    const [activeDays, setActiveDays] = useState(null);
    const [askedQuestions, setAskedQuestions] = useState([])
    const [givenAnswers, setGivenAnswers] = useState([])



    useEffect(() => {

        const calculateActiveDays = () => {
            const currentDate = new Date();

            // Convert the createdAt string to a Date object
            const createdDate = new Date(userData.data.createdAt);

            // Calculate the time difference in milliseconds
            const timeDifference = currentDate - createdDate;

            // Calculate the number of days
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            return daysDifference;

        }

        const getAllUserAskedQuestions = () => {
            const userAskedQuestions = allQuestions.filter(
                (question) => question.asked_by === userData.data.username
            );

            setAskedQuestions(userAskedQuestions);
        }

        const getAllUserAnswers = () => {
            const userAnswers = allAnswers.filter(
                (answer) => answer.ans_by === userData.data.username
            );
            setGivenAnswers(userAnswers);
        }

        const days = calculateActiveDays();
        setActiveDays(days)
        getAllUserAskedQuestions();
        getAllUserAnswers();




    }, [])

    const allTags = [];
    askedQuestions.forEach((question) => {
        question.tags.forEach((tag) => {
            const tagExists = allTags.some((existingTag) => existingTag.name === tag.name);

            if (!tagExists) {
                console.log('pushing', tag.name);
                allTags.push(tag);
            }
        });
    });

    const RenderQuestionData = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const questionsPerPage = 5;
        const startIndex = (currentPage - 1) * questionsPerPage;
        const endIndex = startIndex + questionsPerPage;
        const questionsToDisplay = askedQuestions.slice(startIndex, endIndex);

        const handleNextPage = () => {
            const totalPages = Math.ceil(askedQuestions.length / questionsPerPage);
            setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : 1));
        };

        const handlePrevPage = () => {
            setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
        };

        return (
            <div>
                {questionsToDisplay.map((question) => (
                    <div key={question.qid}>
                        <a href="#" onClick={() => {
                            setEditingQuestion(question)
                            newQuestionPage(setShowPageDictionary)
                        }}><h4>Title: {question.title}</h4></a>
                        <p>Text: {question.text}</p>
                        {/* Add more content as needed */}
                        <hr className="dotted" />
                    </div>
                ))}
                <div className="pagination-buttons">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <span> Page {currentPage} </span>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(askedQuestions.length / questionsPerPage)}>
                        Next
                    </button>
                </div>
            </div>

        )
    }


    const RenderAnswerData = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const answersPerPage = 5;

        // Calculate the indexes for the current page
        const indexOfLastAnswer = currentPage * answersPerPage;
        const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage;
        const currentAnswers = givenAnswers.slice(indexOfFirstAnswer, indexOfLastAnswer);

        return (
            <div>
                <h2>Answers by user</h2>
                <p className="desc">(Click to edit answer)</p>
                <hr />
                {
                    currentAnswers.map((answer) => (
                        <div key={answer.aid}>
                            <a href="#" onClick={() => {
                                setEditingAnswer(answer);
                                newAnswersPage(setShowPageDictionary);
                            }}>
                                <h4>{answer.text.length > 50 ? answer.text.substring(0, 50) + "..." : answer.text}</h4>
                            </a>
                            <hr className="dotted" />
                        </div>
                    ))
                }

                {/* Pagination */}
                <div>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span> Page {currentPage} </span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={indexOfLastAnswer >= givenAnswers.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    const RenderTagData = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const tagsPerPage = 5;

        // Calculate the indexes for the current page
        const indexOfLastTag = currentPage * tagsPerPage;
        const indexOfFirstTag = indexOfLastTag - tagsPerPage;
        const currentTags = allTags.slice(indexOfFirstTag, indexOfLastTag);

        return (
            <div className="tag-container">
                <h2>Tags by user</h2>
                {
                    currentTags.map((tag) => (
                        <UserProfileTagComponent
                            key={tag._id}
                            tag={tag}
                            setDbUpdated={setDbUpdated}
                            apiService={apiService}
                            setShowPageDictionary={setShowPageDictionary}
                            allQuestions={allQuestions}
                            userData={userData}
                        />
                    ))
                }

                {/* Pagination */}
                <div>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span> Page {currentPage} </span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={indexOfLastTag >= allTags.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="main-container">
            <div className="profile-info">
                <div className="inline-text">
                    <h1 className="profile-title">Username: </h1>
                    <h1 className="italic-font">{userData.data.username}</h1>
                </div>
                <div className="inline-text">
                    <h1 className="profile-title">User score: </h1>
                    <h1 className="italic-font">{userData.data.rep_score}</h1>
                </div>
                <div className="inline-text">
                    <h1 className="profile-title">Active since </h1>
                    <h1 className="italic-font">{activeDays} days</h1>
                </div>
            </div>
            <hr className="thick" />
            <div>
                <h2>Questions by user</h2>
                <p className="desc">(Click on title to edit question)</p>
                <hr className="line-seperator" />
                <RenderQuestionData />
            </div>

            <hr className="thick" />
            <RenderTagData />

            <hr className="thick" />
            <RenderAnswerData />
        </div>
    )

}

export default UserProfileComponent;