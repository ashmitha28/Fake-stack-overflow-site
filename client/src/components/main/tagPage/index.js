/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./index.css";
import Tag from "./tag";
import { newQuestionPage } from "../utils/stateUpdateHelpers.js";

const TagPage = ({ setShowPageDictionary, setActiveTab, setCurrentTid, allQuestions, currentTid, fetchData, modelData, apiService, userType }) => {

    const [allTags, setAllTags] = useState([])

    const getTagData = async () => {
        const tagsData = await apiService.getAllTags();
        setAllTags(tagsData);
    }

    useEffect(() => {
        getTagData();
        setActiveTab('tags');
    }, [])


    return (
        <>
            <div id="mainbar" className="mainbar">
                <div className="main-header-container">
                    <div className="question-heading-container">
                        <b>
                            <div id="numquestions" className="num-tags">
                                <p id=""> {allTags.length} Tags</p>
                            </div>
                            <div id="alltags" className="all-tags">
                                <h2> All Tags </h2>
                            </div>
                        </b>
                    </div>
                    <div className="ask-question-container">
                        {userType.registered && <button id="" className="askaquestion" onClick={() => { newQuestionPage(setShowPageDictionary) }}> Ask a Question </button>}
                    </div>
                </div>
                <hr className="separator" />
                <div className="tag-container">
                    {
                        allTags.map(tag => {
                            return <Tag key={tag.tid} tag={tag} setCurrentTid={setCurrentTid} setShowPageDictionary={setShowPageDictionary} currentTid={currentTid} modelData={modelData} />
                        })
                    }

                </div>
            </div>
        </>
    )


}


export default TagPage;
