/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { homePage, profilePage } from "../utils/stateUpdateHelpers";

/**
 * TagItemComponent displays a single tag item.
 * @param {Object} props - The component props.
 * @param {Object} props.tag - The tag object.
 * @param {Object} props.modelData - The model data.
 * @param {function} props.setCurrentTid - A function to set the current tag ID.
 * @param {function} props.setShowPageDictionary - A function to set the show page dictionary.
 * @returns {JSX.Element} JSX representation of the TagItemComponent.
 */

const UserProfileTagComponent = ({ tag, apiService, setDbUpdated, setShowPageDictionary, allQuestions, userData }) => {

    console.log('here', tag.name)
    const [editEnabled, setEditEnabled] = useState(false)
    const [tagName, setTagName] = useState(tag.name);
    const [canEdit, setCanEdit] = useState(true)
    const deleteTag = async () => {
        const response = await apiService.deleteTag(tag.tid);
        console.log('deleted tag', response)
        setDbUpdated(1)
        homePage(setShowPageDictionary)
    }

    const editTag = async () => {
        console.log('called')
        const editedTag = {
            ...tag,
            name: tagName
        }
        const response = await apiService.updateTag(tag.tid, editedTag)

        setDbUpdated(1)
        setEditEnabled(false);
        homePage(setShowPageDictionary)

    }

    useEffect(() => {
        allQuestions.forEach((question) => {

            if (question.tags.some((qtag) => qtag.name === tag.name)) {

                if (question.asked_by !== userData.data.username) {
                    setCanEdit(false);
                }
            }
        })
    }, [])





    return (
        <div className="tag-container">
            <div className="tagNode">
                <a className="tag-link" onClick={() => {
                }}>{tag.name}</a>
                <div style={{ marginTop: '10px' }}>
                    <button id="tag-edit-btn" onClick={() => {
                        if (canEdit) {
                            setEditEnabled(true);
                        }
                    }} disabled={!canEdit}>
                        Edit
                    </button>
                    {editEnabled && <div>
                        <input value={tagName} type="text" id="formTagInput" required onChange={(e) => setTagName(e.target.value)} />
                        <button id="tag-submit-btn" onClick={editTag}>Submit</button>
                    </div>}
                    <button id="tag-delete-btn" onClick={() => {
                        if (canEdit) {
                            deleteTag();
                        }
                    }} style={{ marginLeft: '10px' }} disabled={!canEdit}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )



}

export default UserProfileTagComponent;
