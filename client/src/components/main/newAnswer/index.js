/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./index.css";
import { answersPage, homePage } from "../utils/stateUpdateHelpers";


const NewAnswerComponent = ({ setShowPageDictionary, qid, allAnswers, allQuestions, setDbUpdated, apiService, userData, editingAnswer, setEditingAnswer, modelData }) => {


    const [ansBy, setAnsBy] = useState(userData.data.username);
    const [text, setText] = useState(editingAnswer ? editingAnswer.text : '');
    const [usernameError, setUsernameError] = useState('');
    const [textError, setTextError] = useState('')

    const question = allQuestions.find(q => q.qid === qid);


    const deleteAnswer = async () => {
        const ansResponse = await apiService.deleteAnswer(editingAnswer.aid);
        setDbUpdated(1);
        setEditingAnswer(null);
        homePage(setShowPageDictionary);
    }

    const submitAnswer = async () => {
        setUsernameError('');
        setTextError('');

        const errorMessages = [];
        if (text === '') {
            errorMessages.push('Answer text cannot be empty')
        } else {
            // eslint-disable-next-line no-useless-escape
            const pattern = /[\[\]\(\)]/;
            if (!pattern.test(text)) {
                // do nothing   
            }
            else {
                // validate answer text has link, and if it does have a link, check valid link
                const regex = /\[(.*?)\]\((https:\/\/.*?)\)/;
                if (!regex.test(text)) {
                    errorMessages.push('Invalid hyperlink');
                } else {
                    const matches = text.match(regex);
                    const linkText = matches[1];
                    const linkUrl = matches[2];
                    // check if text has [] and ()
                    // check if https inside link and nothing else
                    if (linkText.trim().length === 0 || linkUrl.trim().length === 0 || !linkUrl.startsWith('https://')) {
                        errorMessages.push('Invalid hyperlink');
                    }
                }
            }
        }

        // Set all error messages at once
        errorMessages.forEach((errorMessage) => {
            if (errorMessage.includes('Username')) setUsernameError(errorMessage);
            if (errorMessage.includes('Answer')) setTextError(errorMessage);
            if (errorMessage.includes('Invalid')) setTextError(errorMessage);
        });

        // If there are any error messages, return early
        if (errorMessages.length > 0) {
            return;
        }

        if (usernameError === '' && textError === '') {


            // update the model
            if (editingAnswer) {
                const editedAnswer = {
                    ...editingAnswer,
                    text
                };
                const ansResponse = await apiService.updateAnswer(editingAnswer.aid, editedAnswer);
                console.log('ans response', ansResponse)

                // update the activity
                await apiService.updateActivity("answer", editingAnswer.aid);
                const filteredQuestions = modelData.filter((question) =>
                    question.answers.some((answer) => answer.aid === editingAnswer.aid)
                );
                await apiService.updateActivity("question", filteredQuestions[0].qid);

                setAnsBy('')
                setText('')
                setDbUpdated(1);
                setEditingAnswer(null);
                homePage(setShowPageDictionary);
            }
            // else {
            //     const newAnswer = {
            //         aid: `a${allAnswers.length + 1}`,
            //         text,
            //         ans_by: ansBy,
            //         ans_date_time: new Date(),
            //     };
            //     const ans = await apiService.createNewAnswer(newAnswer)

            // }
            else {
                const newAnswer = {
                    aid: `a${allAnswers.length + 1}`,
                    text,
                    ans_by: ansBy,
                    ans_date_time: new Date(),
                };
                const ans = await apiService.createNewAnswer(newAnswer)

                const newQuestion = {
                    ...question,
                    answers: [...question.answers, ans]
                }

                const questionResp = await apiService.addQuestionAnswer(qid, newQuestion);
                //NOTE: CAUSING THE PAGE TO REFRESH. DO NOT REMOVE.
                console.log('response', questionResp)


                // Clear the input fields
                setAnsBy('')
                setText('')
                setDbUpdated(1);
                answersPage(setShowPageDictionary);
            }


        }

    }


    return (
        <div className="main" id="main">

            <div className="container">

                <div id="mainbar" className="mainbar">
                    <p className="form-headings"> Username * </p>
                    <p className="usernameText">{ansBy}</p>
                    <span id="username-error" className="error">{usernameError}</span>

                    <p className="form-headings"> Answer Text * </p>
                    <textarea value={text} id="answerTextInput" required onChange={(e) => setText(e.target.value)}></textarea>
                    <span id="answer-text-error" className="error">{textError}</span>

                    <div>
                        <button id="submit-button" onClick={submitAnswer}>Post Answer</button>
                    </div>

                    {editingAnswer &&
                        <div>
                            <button id="delete-button" onClick={deleteAnswer}>Delete Answer</button>
                        </div>
                    }
                </div>


            </div>


        </div>
    )

}

export default NewAnswerComponent;