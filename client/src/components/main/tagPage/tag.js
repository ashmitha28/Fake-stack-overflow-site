/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { questionsForTagPage } from "../utils/stateUpdateHelpers";

const Tag = ({ tag, setCurrentTid, setShowPageDictionary, currentTid, modelData, inline = 0 }) => {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        //getQuestionData();
        setQuestions(modelData);
    }, [currentTid])

    const countQuestionsWithTag = (tagId) => {
        return modelData.reduce((count, question) => {
            const hasTag = question.tags.some(tag => tag._id === tagId);
            return count + (hasTag ? 1 : 0);
        }, 0);
    };

    if (inline == 0) {
        return (
            <div className="tagNode">
                <a className="tag-link" onClick={() => {
                    setCurrentTid(tag.tid)
                    questionsForTagPage(setShowPageDictionary)
                }}>{tag.name}</a>
                <div className="tag-count">{countQuestionsWithTag(tag._id)} {countQuestionsWithTag(tag._id) > 1 ? 'questions' : 'question'}</div>
            </div>
        )
    }
    else {
        return (
            <div className="tagNode">
                <a className="tag-link" onClick={() => {
                    setCurrentTid(tag.tid)
                    questionsForTagPage(setShowPageDictionary)
                }}>{tag.name}</a>
            </div>
        )
    }


}

export default Tag;
