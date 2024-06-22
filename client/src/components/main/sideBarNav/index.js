/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./index.css";
import { homePage, loginPage, profilePage } from "../utils/stateUpdateHelpers";

const NavBarComponent = ({ setShowPageDictionary,
  userType,
  setUserType,
  setUserToken,
  fetchData,
  apiService,
  userData,
  setUserData,
  setFilter,
  filter,
  setSearchQuery,
  searchQuery,
  setCurrentTid }) => {

  // functions ------------------------------------------------------
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchQuestions(event.target.value);
    }
  };

  const searchQuestions = (searchQuery) => {
    setSearchQuery(searchQuery);
    // get questions from backend based on search query
    if (searchQuery == "") {
      fetchData(apiService.FILTER_QUESTION_API + apiService.defaultFilter);
    }
    else {
      fetchData(apiService.SEARCH_QUESTIONS_API + searchQuery + "/" + filter);
    }
  }

  const handleLogOut = () => {
    // delete token
    setUserToken("");
    setUserData("");
    setCurrentTid("");

    // update user type
    const updatedValues = { guest: false, registered: false }
    setUserType(prevState => ({ ...prevState, ...updatedValues }));

    // delete session 
    localStorage.clear();

    // redirect to main page
    loginPage(setShowPageDictionary);
  }

  // ----------------------------------------------------------------
  return (
    <div id="header" className="header">
      <div className="navbar">
        <div id="" className="title-navbar"> FAKE STACK OVERFLOW</div>
        &nbsp;
        {userData.data ? (
          <div id="" className="search">
            <input id="searchBar" type="text" placeholder="Search "
              onEnter={(event) => searchQuestions(event.target.value)}
              onKeyDown={handleKeyPress}>
            </input>
            &nbsp;
            <div className="user-section">
              <div className="user-info">
                <p>
                  <span className="name-title">{userData.data.username}</span>
                  &nbsp;
                  &nbsp;
                  <button className="logout-button" onClick={handleLogOut}>Log Out</button>
                  {userType.registered && <button className="profile-button" onClick={async () => {

                    profilePage(setShowPageDictionary); // Action 1

                  }}>User Profile</button>}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default NavBarComponent;
