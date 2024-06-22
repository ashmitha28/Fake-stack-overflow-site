/* eslint-disable no-dupe-class-members */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { handleServerDown } from "./utils";
const URL = "http://localhost:8000/"

class ApiService {
  constructor(setShowPageDictionary) {
    this.defaultFilter = "newest";
    this.setShowPageDictionary = setShowPageDictionary;

    // questions
    this.QUESTIONS_API = `http://localhost:8000/questions/`;
    this.SEARCH_QUESTIONS_API = `http://localhost:8000/questions/search/`;
    this.INCREASE_VIEW_COUNT_API = `http://localhost:8000/questions/increaseviewcount/`;
    this.POST_NEW_QUESTION_API = `http://localhost:8000/questions/`;
    this.FILTER_QUESTION_API = `http://localhost:8000/questions/filtered/`;
    this.QUESTIONS_BASED_ON_TAG_API = `http://localhost:8000/questions/tag/`;
    this.INCREASE_VOTE_COUNT_QUESTION_API = `http://localhost:8000/questions/increasevote/`;
    this.DECREASE_VOTE_COUNT_QUESTION_API = `http://localhost:8000/questions/decreasevote/`;
    this.ADD_NEW_COMMENT_QUESTION_API = `http://localhost:8000/questions/newcomment/`;
    this.DELETE_QUESTION_API = `http://localhost:8000/questions/delete/`;
    this.UPDATE_ACTIVITY_QUESTION_API = `http://localhost:8000/questions/activity/`;

    // tags
    this.TAGS_API = `http://localhost:8000/tags/`;
    this.DELETE_TAG_API = `http://localhost:8000/tags/delete/`

    // answers
    this.ANSWERS_API = `http://localhost:8000/answers/`;
    this.INCREASE_VOTE_COUNT_ANSWER_API = `http://localhost:8000/answers/increasevote/`;
    this.DECREASE_VOTE_COUNT_ANSWER_API = `http://localhost:8000/answers/decreasevote/`;
    this.ADD_NEW_COMMENT_ANSWER_API = `http://localhost:8000/answers/newcomment/`;
    this.DELETE_ANSWER_API = `http://localhost:8000/answers/delete/`;
    this.UPDATE_ACTIVITY_ANSWER_API = `http://localhost:8000/answers/activity/`;
    this.ACCEPT_ANSWER_API = `http://localhost:8000/answers/acceptanswer/`;
    this.UNACCEPT_ANSWER_API = `http://localhost:8000/answers/unacceptanswer/`;

    // comments
    this.COMMENTS_API = `http://localhost:8000/comments/`;
    this.INCREASE_VOTE_COUNT_COMMENT_API = `http://localhost:8000/comments/increasevote/`;
    this.DECREASE_VOTE_COUNT_COMMENT_API = `http://localhost:8000/comments/decreasevote/`;
    this.UPDATE_ACTIVITY_COMMENT_API = `http://localhost:8000/comments/activity/`;

    // users
    this.NEW_USER_SIGNUP_API = `http://localhost:8000/user/signup/`;
    this.EXISTING_USER_LOGIN_API = `http://localhost:8000/user/login/`;
    this.USER_DATA_API = `http://localhost:8000/user/userdata/`;
    this.TOKEN_EXPIRY_API = `http://localhost:8000/user/tokenexpiry/`;
    this.GUEST_USER_LOGIN_API = `http://localhost:8000/user/guestlogin/`;

    this.IS_EMAIL_EXISTS_API = `http://localhost:8000/user/checkemail/`;
    this.IS_USERNAME_EXISTS_API = `http://localhost:8000/user/checkusername/`;
    this.UPDATE_USER_DETAILS_API = `http://localhost:8000/user/update/`;
    this.INCREASE_REP_SCORE_API = `http://localhost:8000/user/increasescore/`;
    this.DECREASE_REP_SCORE_API = `http://localhost:8000/user/decreasescore/`;
    this.GET_USER_DETAILS_API = 'http://localhost:8000/user/userdetails/';

    // Include the token in the headers for every request
    this.axiosInstance = "";

    this.config = {
      headers: {
        'Authorization': '123456789',
      },
    }
  }

  async getDefaulfFilter() {
    return this.defaultFilter;
  }

  async getAllTags() {
    try {
      const response = await axios.get(this.TAGS_API);
      return response.data;
    } catch (err) {
      console.error('Error in getting all tags api', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async getAllQuestions() {
    try {
      const response = await axios.get(this.QUESTIONS_API);
      return response.data;
    } catch (err) {
      console.error('Error in getting all questions api', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async getAllAnswers() {
    try {
      const response = await axios.get(this.ANSWERS_API);
      return response.data;
    } catch (err) {
      console.error('Error in getting all answers api', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async getAllComments() {
    try {
      const response = await axios.get(this.COMMENTS_API);
      return response.data;
    } catch (err) {
      console.error('Error in  api', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async getFilteredQuestions(filter) {
    try {
      console.log(this.axiosInstance);
      const response = await axios.get(this.FILTER_QUESTION_API + filter);
      return response.data;
    } catch (err) {
      console.error('Error in api call', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async searchQuestions(param) {
    try {
      const response = await axios.get(this.SEARCH_QUESTIONS_API + param);
      return response.data;
    } catch (err) {
      console.error('Error in api call', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async searchQuestionsWithFilter(param, filter) {
    try {
      const response = await axios.get(this.SEARCH_QUESTIONS_API + param + "/" + filter);
      return response.data;
    } catch (err) {
      console.error('Error in api call', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async increaseViewCount(qid) {
    try {
      const response = await axios.put(this.INCREASE_VIEW_COUNT_API + qid);
      return response.data;
    } catch (err) {
      console.error('Error in api call', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async createNewAnswer(answer) {
    try {

      const response = await axios.post(this.ANSWERS_API, answer);
      return response.data;
    } catch (err) {
      console.error('Error in api call', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async addQuestionAnswer(qid, question) {
    try {
      const response = await axios.put(`${this.QUESTIONS_API}updateQuestionAnswers/${qid}`, question);
      return response.data;
    } catch (err) {
      console.error('Error in api call', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async postNewQuestion(newQuestion) {
    try {
      const response = await axios.post(this.POST_NEW_QUESTION_API, newQuestion);
      return response.data;
    } catch (error) {
      console.error('Error posting question:', error);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async updateAnswer(aid, newAnswer) {
    const response = await axios.put(`${this.ANSWERS_API}${aid}`, newAnswer);
    return response.data
  }

  async deleteAnswer(aid) {
    const response = await axios.delete(`${this.DELETE_ANSWER_API}${aid}`);
    return response.data
  }

  async updateQuestion(qid, newQuestion) {
    const response = await axios.put(`${this.QUESTIONS_API}${qid}`, newQuestion)
    return response.data
  }

  async deleteQuestion(qid) {
    const response = await axios.delete(`${this.DELETE_QUESTION_API}${qid}`)
    return response.data
  }

  async deleteTag(tid) {
    const response = await axios.delete(`${this.DELETE_TAG_API}${tid}`)
    return response.data
  }

  async updateTag(tid, newTag) {
    const response = await axios.put(`${this.TAGS_API}updatetag/${tid}`, newTag);
    return response.data
  }

  // user ----------------
  async postNewUserSignup(newUserData) {
    try {
      const response = await axios.post(this.NEW_USER_SIGNUP_API, newUserData);
      return response;
    } catch (error) {
      console.error('Error creating new user:', error);
      handleServerDown(this.setShowPageDictionary);
      return error.response;
    }
  }

  async postUserLogIn(userData) {
    try {
      const response = await axios.post(this.EXISTING_USER_LOGIN_API, userData);
      return response;
    } catch (error) {
      console.error('Error creating new user:', error);
      handleServerDown(this.setShowPageDictionary);
      return error.response;
    }
  }

  async postGuestLogIn() {
    try {
      const response = await axios.post(this.GUEST_USER_LOGIN_API);
      return response;
    } catch (error) {
      console.error('Error creating new user:', error);
      handleServerDown(this.setShowPageDictionary);
      return error.response;
    }
  }

  async getUserDataFromToken(userToken) {
    try {
      const response = await axios.get(this.USER_DATA_API + userToken);
      return response;
    } catch (error) {
      console.error('Error getting user data:', error);
      handleServerDown(this.setShowPageDictionary);
      return error.response;
    }
  }

  async checkUserTokenExpired(userToken) {
    try {
      const response = await axios.get(this.TOKEN_EXPIRY_API + userToken);
      return response;
    } catch (error) {
      console.error('Error getting user data:', error);
      handleServerDown(this.setShowPageDictionary);
      return error.response;
    }
  }

  async getCommentById(id) {
    try {
      const response = await axios.get(this.COMMENTS_API + id);
      return response.data
    } catch (error) {
      console.error('Error getting data:', error);
      handleServerDown(this.setShowPageDictionary);
      return error.response;
    }
  }

  async createAxiosInstance(token) {
    this.axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }


  async checkEmailExists(email) {

    try {
      const response = await axios.get(this.IS_EMAIL_EXISTS_API + email);
      return response;
    } catch (error) {
      console.error('Error getting user data:', error);
      handleServerDown(this.setShowPageDictionary);
      return error.response;
    }
  }

  async checkUsernameExists(username) {

    try {
      const response = await axios.get(this.IS_USERNAME_EXISTS_API + username);
      return response;
    } catch (error) {
      console.error('Error getting user data:', error);
      handleServerDown(this.setShowPageDictionary);
      return error.response;
    }
  }

  async increaseVote(type, id) {

    try {
      if (type == "question") {
        const response = await axios.put(this.INCREASE_VOTE_COUNT_QUESTION_API + id);
        return response.data;
      }
      else if (type == "answer") {
        const response = await axios.put(this.INCREASE_VOTE_COUNT_ANSWER_API + id);
        return response.data;
      }
      else {
        const response = await axios.put(this.INCREASE_VOTE_COUNT_COMMENT_API + id);
        return response.data;
      }
    } catch (error) {
      console.error('Error in api call:', error);
      handleServerDown(this.setShowPageDictionary);
      return error.response;
    }
  }

  async decreaseVote(type, id) {
    try {

      if (type == "question") {
        const response = await axios.put(this.DECREASE_VOTE_COUNT_QUESTION_API + id);
        return response.data;
      }
      else if (type == "answer") {
        const response = await axios.put(this.DECREASE_VOTE_COUNT_ANSWER_API + id);
        return response.data;
      }
      else {
        const response = await axios.put(this.DECREASE_VOTE_COUNT_COMMENT_API + id);
        return response.data;
      }
    } catch (error) {
      console.error('Error in api call:', error);
      handleServerDown(this.setShowPageDictionary);
      return error.response;
    }
  }

  async getUserDetailsByUsername(username) {
    try {
      const response = await axios.get(this.GET_USER_DETAILS_API + username);
      return response.data
    } catch (error) {
      console.error('Error in api call:', error);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async increaseRepScore(id) {
    try {

      const response = await axios.put(this.INCREASE_REP_SCORE_API + id)
      return response.data
    } catch (error) {
      console.error('Error in api call:', error);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async decreaseRepScore(id) {
    try {

      const response = await axios.put(this.DECREASE_REP_SCORE_API + id)
      return response.data
    } catch (error) {
      console.error('Error in api call:', error);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async addNewComment(type, id, comment, username) {
    try {
      if (type == "question") {
        const response = await axios.put(this.ADD_NEW_COMMENT_QUESTION_API + id, { comment: comment, username: username });
        return response.data;
      }
      else {
        const response = await axios.put(this.ADD_NEW_COMMENT_ANSWER_API + id, { comment: comment, username: username });
        return response.data;
      }
    } catch (error) {
      console.error('Error in api call:', error);
      handleServerDown(this.setShowPageDictionary);
    }
  }


  async updateActivity(type, id) {

    try {
      if (type == "question") {
        console.log('here called')
        const response = await axios.put(this.UPDATE_ACTIVITY_QUESTION_API + id);
        return response.data
      }
      else if (type == "answer") {
        const response = await axios.put(this.UPDATE_ACTIVITY_ANSWER_API + id);
        return response.data
      }
      else {
        const response = await axios.put(this.UPDATE_ACTIVITY_COMMENT_API + id);
        return response.data
      }
    } catch (err) {
      console.error('Error in api call:', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async acceptAnswer(id) {

    try {
      const response = await axios.put(this.ACCEPT_ANSWER_API + id);
      return response.data
    }
    catch (err) {
      console.error('Error in api call:', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }

  async unacceptAnswer(id) {

    try {
      const response = await axios.put(this.UNACCEPT_ANSWER_API + id);
      return response.data
    }
    catch (err) {
      console.error('Error in api call:', err);
      handleServerDown(this.setShowPageDictionary);
    }
  }


}


export default ApiService;
