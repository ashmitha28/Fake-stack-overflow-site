
/* eslint-disable react/prop-types */
import React from "react";
import "./index.css";
import { homePage, tagsPage } from "../../utils/stateUpdateHelpers";



const SidebarComponent = ({ setShowPageDictionary, activeTab, setActiveTab, setCurrentTid, setEditingQuestion, setEditingAnswer }) => {
    return (
        <div>
            {activeTab === 'tags' && (
                <div id="sideBarNav" className="sidebar">
                    <div className="filter-container">

                        <a id="questions-link" className="side-bar-link-inactive" onClick={() => {
                            setActiveTab("home");
                            setCurrentTid("");
                            setEditingAnswer(null);
                            setEditingQuestion(null);
                            homePage(setShowPageDictionary);
                        }}>
                            Questions
                        </a>
                        <br />
                        <br />
                        <a id="tags-link" className="side-bar-link-active" onClick={() => {
                            tagsPage(setShowPageDictionary)
                            setCurrentTid("");
                            setEditingAnswer(null);
                            setEditingQuestion(null);
                            setActiveTab("tags");
                        }}>
                            Tags
                        </a>
                    </div>
                </div>
            )}
            {activeTab === 'home' && (
                <div>
                    <div id="sideBarNav" className="sidebar">
                        <div className="filter-container">


                            <a id="questions-link" className="side-bar-link-active" onClick={() => {
                                setActiveTab("home");
                                setCurrentTid("");
                                setEditingAnswer(null);
                                setEditingQuestion(null);
                                homePage(setShowPageDictionary);
                            }}>
                                Questions
                            </a>
                            <br />
                            <br />
                            <a id="tags-link" className="side-bar-link-inactive" onClick={() => {
                                setActiveTab("tags");
                                setCurrentTid("");
                                setEditingAnswer(null);
                                setEditingQuestion(null);
                                tagsPage(setShowPageDictionary);
                            }}>
                                Tags
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default SidebarComponent;
