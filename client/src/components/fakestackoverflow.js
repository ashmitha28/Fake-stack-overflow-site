/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import NavBarComponent from './main/sideBarNav/index.js';
import SideBarComponent from './main/sideBarNav/bar/index.js';
import LoginPageComponent from './main/login page/index.js';
import HomePageComponent from './main/Home/index.js';
import AnswersPageComponent from './main/answerPage/pageComp/index.js';
import TagsPageComponent from './main/tagPage/index.js';
import NewQuestionComponent from './main/newQuestion/index.js';
import NewAnswerComponent from './main/newAnswer/index.js';
import { homePage, loginPage } from './main/utils/stateUpdateHelpers';
import ApiService from './main/utils/endpoint_base.js';
import './fakestackoverflow.css'
import UserProfileComponent from './main/profilePage/UserProfileComponent';
import { handleServerDown } from './main/utils/utils';

export default function fakeStackOverflow() {
  // use states ------------------------------------------------------------------------------------------
  const [showPageDictionary, setShowPageDictionary] = useState({
    loginPage: true,
    homePage: false,
    tagsPage: false,
    newQuestionPage: false,
    newAnswerPage: false,
    answerPage: false,
    questionsOfTagPage: false,
    profilePage: false
  });

  // class init
  const apiService = new ApiService(setShowPageDictionary);

  const [userType, setUserType] = useState({ guest: false, registered: false });
  const [userToken, setUserToken] = useState("");

  const [activeTab, setActiveTab] = useState('home');

  const [modelData, setModelData] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [userData, setUserData] = useState([]);
  const [dbUpdated, setDbUpdated] = useState(0);
  const [filter, setFilter] = useState(apiService.defaultFilter);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentTid, setCurrentTid] = useState('');
  const [currentQid, setCurrentQid] = useState('q1');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [editingTag, setEditingTag] = useState(null);

  const [tokenStatus, setTokenStatus] = useState("");

  // objects and functions ------------------------------------------------------------------------------------------

  const fetchData = (url) => {

    try {

      axios.get(url)
        .then(res => {

          setModelData(res.data);
        })
    } catch (error) {
      console.error('Error fetching data: in fetch data function', error);
      handleServerDown(setShowPageDictionary);
    }
  }

  const getData = async () => {
    fetchData(apiService.FILTER_QUESTION_API + apiService.defaultFilter);

    try {
      await apiService.getAllQuestions().then((res) => {
        setAllQuestions(res);
      });

      await apiService.getAllAnswers().then((res) => {
        setAllAnswers(res);
      });

      await apiService.getAllTags().then((res) => {
        setAllTags(res);
      });

      await apiService.getAllComments().then((res) => {
        setAllComments(res);
      });

      await getUserData(userToken);

    }
    catch (err) {
      console.error('Error fetching data in getData function:', err);
      handleServerDown(setShowPageDictionary);
    }


  }

  const initData = async () => {
    setModelData([])
    setAllQuestions([]);
    setAllAnswers([]);
    setAllTags([]);
    setAllComments([]);
    setDbUpdated([]);
    setCurrentTid("");
  }

  const checkToken = async (token) => {
    try {
      const msg = await apiService.checkUserTokenExpired(token);
      setTokenStatus(msg.data.message);

      if (msg.data.message === 'false' && (userType.guest == true || userType.registered == true)) {
        // not expired

        // get user data
        getUserData(token);

        // redirect to home page
        homePage(setShowPageDictionary);
      }
      else if (msg.data.message === 'false' && (userType.guest == false || userType.registered == false)) {
        if (userData.username == "Guest") {
          // set user type 
          const updatedValuesUser = {
            guest: true, registered: false
          }
          setUserType(prevState => ({ ...prevState, ...updatedValuesUser }));

        }
        else {
          // set user type 
          const updatedValuesUser = {
            guest: false, registered: true
          }
          setUserType(prevState => ({ ...prevState, ...updatedValuesUser }));

        }
        // get user data
        getUserData(token);

        // redirect to home page
        homePage(setShowPageDictionary);
      }
      else {
        // expired 
        loginPage(setShowPageDictionary);
      }
    }
    catch (err) {
      console.error('Error checking token data', err);
      handleServerDown(setShowPageDictionary);
    }
  }

  const getUserData = async (userToken) => {
    try {
      const data = await apiService.getUserDataFromToken(userToken);
      setUserData(data);
    } catch (err) {
      console.error('Error getting user data', err);
      handleServerDown(setShowPageDictionary);
    }

  }

  // use effects ------------------------------------------------------------------------------------------
  useEffect(() => {
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      checkToken(storedToken);
    }
  }, [])

  useEffect(() => {
    if (Object.keys(userToken).length > 0) {
      try {
       
        getUserData(userToken);

        homePage(setShowPageDictionary);


      } catch (error) {
        console.error('Error verifying token:', error);
        loginPage(setShowPageDictionary);
      }
    } else {
      loginPage(setShowPageDictionary);
    }
  }, [userToken]);

  // fetch based on user type
  useEffect(() => {
    if (userType.guest == true || userType.registered == true) {
      // populate data in state
      getData();
    }
    else if (userType.guest == false && userType.registered == false) {
      // delete all state data
      initData();
    }
  }, [userType.guest, userType.registered])

  // use effect fetch data based on tag id or if no tag id, fetch all data
  useEffect(() => {
    if (currentTid == "") {
      fetchData(apiService.FILTER_QUESTION_API + apiService.defaultFilter);

    }
    else {
      fetchData(apiService.QUESTIONS_BASED_ON_TAG_API + currentTid);

    }

  }, [currentTid]);

  // use effect to check if database is update and fetch new values if it is
  useEffect(() => {
    if (userType.guest == true || userType.registered == true) {
      getData()
      setDbUpdated(0);
    }
  }, [dbUpdated])

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchData(apiService.SEARCH_QUESTIONS_API + searchQuery + "/" + filter);
    }
    else {
      fetchData(apiService.FILTER_QUESTION_API + filter);
    }
  }, [filter]);
  // -----------------------------------------------------------------------------



  return (
    <>
      <div className="main" id="main">
        <NavBarComponent setShowPageDictionary={setShowPageDictionary}
          userType={userType}
          setUserType={setUserType}
          setUserToken={setUserToken}
          fetchData={fetchData}
          apiService={apiService}
          userData={userData}
          setUserData={setUserData}
          setFilter={setFilter}
          filter={filter}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          setCurrentTid={setCurrentTid} />
        {showPageDictionary.loginPage && <LoginPageComponent setShowPageDictionary={setShowPageDictionary} setUserToken={setUserToken} setUserType={setUserType} apiService={apiService} getData={getData} />}
        <div className='container'>
          {!showPageDictionary.loginPage && <SideBarComponent setShowPageDictionary={setShowPageDictionary} activeTab={activeTab} setActiveTab={setActiveTab} setCurrentTid={setCurrentTid} setEditingAnswer={setEditingAnswer} setEditingQuestion={setEditingQuestion} />}
          {(showPageDictionary.homePage || showPageDictionary.questionsOfTagPage) && <HomePageComponent showPageDictionary={showPageDictionary}
            setShowPageDictionary={setShowPageDictionary}
            userToken={userToken}
            userType={userType}
            setUserType={setUserType}
            setActiveTab={setActiveTab}
            fetchData={fetchData}
            modelData={modelData}
            setCurrentQid={setCurrentQid}
            currentTid={currentTid}
            setCurrentTid={setCurrentTid}
            setAllQuestions={setAllQuestions}
            setAllAnswers={setAllAnswers}
            setAllTags={setAllTags}
            setAllComments={setAllComments}
            apiService={apiService}
            setFilter={setFilter}
            filter={filter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} />}
          {showPageDictionary.answerPage && <AnswersPageComponent setShowPageDictionary={setShowPageDictionary}
            qid={currentQid}
            allQuestions={allQuestions}
            allAnswers={allAnswers}
            apiService={apiService}
            setCurrentTid={setCurrentTid}
            currentTid={currentTid}
            modelData={modelData}
            userType={userType}
            getData={getData}
            userData={userData}
            setDbUpdated={setDbUpdated} />}
          {showPageDictionary.tagsPage && <TagsPageComponent showPageDictionary={showPageDictionary}
            setShowPageDictionary={setShowPageDictionary}
            setActiveTab={setActiveTab}
            setCurrentTid={setCurrentTid}
            allTags={allTags}
            allQuestions={allQuestions}
            currentTid={currentTid}
            fetchData={fetchData}
            modelData={modelData}
            apiService={apiService}
            userType={userType} />}
          {showPageDictionary.newQuestionPage && <NewQuestionComponent setShowPageDictionary={setShowPageDictionary}
            modelData={modelData}
            setDbUpdated={setDbUpdated}
            apiService={apiService}
            userData={userData}
            editingQuestion={editingQuestion}
            setEditingQuestion={setEditingQuestion}
          />}
          {showPageDictionary.newAnswerPage && <NewAnswerComponent setShowPageDictionary={setShowPageDictionary}
            qid={currentQid}
            allAnswers={allAnswers}
            allQuestions={allQuestions}
            setDbUpdated={setDbUpdated}
            apiService={apiService}
            userData={userData}
            editingAnswer={editingAnswer}
            setEditingAnswer={setEditingAnswer}
            modelData={modelData} />}
          {showPageDictionary.profilePage && <UserProfileComponent setShowPageDictionary={setShowPageDictionary}
            userData={userData}
            allQuestions={allQuestions}
            allAnswers={allAnswers}
            setEditingQuestion={setEditingQuestion}
            setEditingAnswer={setEditingAnswer}
            setDbUpdated={setDbUpdated}
            apiService={apiService} />}
        </div>
      </div>
    </>
  );
}
