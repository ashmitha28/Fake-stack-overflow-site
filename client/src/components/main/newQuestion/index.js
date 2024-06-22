/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./index.css";

import { homePage } from "../utils/stateUpdateHelpers";
//import { getAllTags, postNewQuestion } from "../helpers/api";


const NewQuestionComponent = ({ setShowPageDictionary, modelData, setDbUpdated, apiService, userData, editingQuestion, setEditingQuestion }) => {

    const [title, setTitle] = useState(editingQuestion ? editingQuestion.title : '');
    const [tags, setTags] = useState(editingQuestion ? `${editingQuestion.tags.map(tag => `${tag.name}`).join(' ')}` : '');
    const [text, setText] = useState(editingQuestion ? editingQuestion.text : '');
    const [author, setAuthor] = useState(userData.data.username);
    const [titleError, setTitleError] = useState('')
    const [questionError, setQuestionError] = useState('')
    const [tagsError, setTagsError] = useState('')
    const [usernameError, setUsernameError] = useState('');
    const [allTagsObject, setAllTagsObject] = useState([]);

    const getData = async () => {
        const tagsData = await apiService.getAllTags();
        setAllTagsObject(tagsData);
    }

    useEffect(() => {
        getData();
    }, [])


    const deleteQuestion = async () => {
        if (editingQuestion.answers.length > 0) {
            editingQuestion.answers.forEach(async (answer) => {
                const deleteAnsResponse = await apiService.deleteAnswer(answer.aid)
                console.log('deleted response ans', deleteAnsResponse)
            })

        }
        const response = await apiService.deleteQuestion(editingQuestion.qid);
        console.log('response', response)
        setEditingQuestion(null);
        setDbUpdated(1);
        homePage(setShowPageDictionary)
    }

    const newTag = async (tags) => {
        const allTagsFromBackend = await apiService.getAllTags();
        const existingTagNames = allTagsFromBackend.map(tag => tag.name);
        return tags.some(tag => !existingTagNames.includes(tag));
    }

    const getNewTags = async (tags) => {
        const allTagsFromBackend = await apiService.getAllTags();
        const existingTagNames = allTagsFromBackend.map(tag => tag.name);
        return tags.filter(tag => !existingTagNames.includes(tag));
    };


    const submitQuestion = async () => {

        // Clear any previous error messages

        setTitleError('')
        setQuestionError('')
        setTagsError('')
        setUsernameError('')

        const errorMessages = [];

        // Validate the title
        if (title === '') {
            errorMessages.push('Title cannot be empty');

        } else if (title.length > 100) {
            errorMessages.push('Title cannot be more than 100 characters');

        }

        // Validate the question text
        if (text === '') {
            errorMessages.push('Question text cannot be empty');
        }
        else {
            // check if text has "[]()""
            // eslint-disable-next-line no-useless-escape
            const pattern = /[\[\]\(\)]/;
            if (!pattern.test(text)) {
                // do nothing   
            }
            else {
                // validate question text has link, and if it does have a link, check valid link
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


        // Validate the tags
        const tagsSplit = tags.split(/\s+/);
        if (tags == '') {
            errorMessages.push('Tag cannot be empty');
        }
        else if (tagsSplit.length > 5) {
            errorMessages.push('Cannot have more than 5 tags');
        }
        else if (userData.data.rep_score < 50) {
            const tagsSplit = tags.split(/\s+/);
            const value = await newTag(tagsSplit)
            if (value) {
                const newTags = await getNewTags(tagsSplit);
                errorMessages.push('Reputation score is less than 50, new tags (the following) cannot be added ' + newTags.join(', '));
            }
        }
        else {
            for (const tag of tagsSplit) {
                if (tag.length > 20) {
                    errorMessages.push('New tag length cannot be more than 20');
                }
            }
        }



        // Set all error messages at once
        errorMessages.forEach((errorMessage) => {
            if (errorMessage.includes('Title')) setTitleError(errorMessage);
            if (errorMessage.includes('Question text')) setQuestionError(errorMessage);
            if (errorMessage.includes('Invalid hyperlink')) setQuestionError(errorMessage);
            if (errorMessage.includes('Tag')
                || errorMessage.includes('Cannot have more than 5 tags')
                || errorMessage.includes('New tag length cannot be more than 20')
                || errorMessage.includes('Reputation')) {
                setTagsError(errorMessage);
            }

        });

        // If there are any error messages, return early
        if (errorMessages.length > 0) {
            return;
        }


        // If all input is valid, you can submit the form or take further action here
        if (tagsError == '' && usernameError == '' && titleError == '' && questionError == '') {
            // Number of tags
            const numberOfTags = tags.length;
            const allTags = tags.split(" ");
            const allTagObject = [];

            // Create tags and add them to the tag array
            for (let i = 0; i < numberOfTags; i++) {
                if (allTags[i]) {
                    // Check if the tag exists
                    const isTagPresent = allTagsObject.some(tag => {
                        //console.log(tag);
                        tag.name.toLowerCase() === allTags[i]
                    });
                    //const isTagPresent = modelData.tags.some(tag => tag.name === allTags[i]);

                    if (isTagPresent) {
                        // Find the existing tag
                        const existingTag = allTagsObject.find(tag => tag.name === allTags[i]);

                        // Link to the question
                        allTagObject.push(existingTag);
                    } else {
                        // Create a new tag
                        var tId = `t${allTagsObject.length + 1}`;
                        const newTag = {
                            tid: tId,
                            name: allTags[i],
                        };

                        if (newTag.name && newTag.name.length >= 1) {
                            // Add the tag to the array
                            allTagObject.push(newTag);
                        }
                    }
                }
            }

            // Create a new question object


            // Add the new question to the data
            if (editingQuestion) {
                var editingNewQuestion = {
                    ...editingQuestion,
                    title,
                    text,
                    updated_date_time: new Date(),
                };
                const questionResp = await apiService.updateQuestion(editingQuestion._id, editingNewQuestion);
                await apiService.updateActivity("question", editingQuestion.qid);
                console.log('after putting', questionResp)

                // update the activity
                await apiService.updateActivity("question", editingQuestion.qid);

            }
            else {
                var newQuestion = {
                    qid: `q${modelData.length + 1}`,
                    title,
                    text,
                    tags: allTagObject,
                    asked_by: userData.data.username,
                    ask_date_time: new Date(),
                    answers: [],
                    comments: [],
                    views: 0,
                };
                const questionResp = await apiService.postNewQuestion(newQuestion);
                //NOTE: CAUSING THE PAGE TO REFRESH. DO NOT REMOVE.
                console.log('questionresp', questionResp)
            }

            // Clear the input fields
            setTitle('')
            setText('')
            setTags('')
            setAuthor('')
            setDbUpdated(1);
            setEditingQuestion(null);
            homePage(setShowPageDictionary);
        }



    }

    return (
        <div id="mainbar" className="mainbar">
            <p className="form-headings">Question Title *</p>
            <p className="form-desc">Limit title to 100 characters or less</p>
            <input value={title} type="text" id="formTitleInput" required onChange={(e) => setTitle(e.target.value)} />
            <br></br>
            <span id="title-error" className="error">{titleError}</span>

            <p className="form-headings">Question Text *</p>
            <p className="form-desc">Add Details</p>
            <textarea value={text} id="formTextInput" required onChange={(e) => setText(e.target.value)}></textarea>
            <br></br>
            <span id="question-text-error" className="error">{questionError}</span>

            <p className="form-headings">Tags *</p>
            <p className="form-desc">Add keywords separated by whitespace</p>
            <input value={tags} type="text" id="formTagInput" required onChange={(e) => setTags(e.target.value)} />
            <br></br>
            <span id="tags-error" className="error">{tagsError}</span>

            <p className="form-headings">Username *</p>
            
             <input type="text" id="formUsernameInput" required onChange={(e) => setAuthor(e.target.value)} /> 
             <p className="usernameText">{author}</p>
            <br></br>
            <span id="username-error" className="error">{usernameError}</span>
            <br />
            <div>
                <button id="submit-button" onClick={submitQuestion}>Post Question</button>
            </div>
            {editingQuestion &&
                <div>
                    <button id="delete-button" onClick={deleteQuestion}>Delete Question</button>
                </div>
            }
        </div>

    )


}

export default NewQuestionComponent;