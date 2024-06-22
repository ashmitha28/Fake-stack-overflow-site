import axios from 'axios';

const QUESTIONS_API = `http://localhost:8000/questions/`;
const TAGS_API = `http://localhost:8000/tags/`;
const ANSWERS_API = `http://localhost:8000/answers/`;
const COMMENTS_API = `http://localhost:8000/comments/`


// ***************Questions API************************

export const getAllQuestions = async () => {
    const response = await axios.get(QUESTIONS_API);
    return response.data;

}

export const getFilteredQuestions = async (filter) => {
    const response = await axios.get(`${QUESTIONS_API}filtered/${filter}`)
    return response.data;
}

export const searchQuestion = async (param) => {
    const response = await axios.get(`${QUESTIONS_API}search/${param}`)
    return response.data;
}

export const updateQuestionViewCount = async (qid) => {
    const response = await axios.put(`${QUESTIONS_API}updateviewcount/${qid}`)
    return response.data;
}

export const updateQuestionVoteCount = async (qid, value) => {
    //value can be -1 or +1
    const response = await axios.put(`${QUESTIONS_API}updatevotecount/${qid}`, value)
    return response.data;

}

export const createNewQuestion = async (question) => {
    try {
        const response = await axios.post(QUESTIONS_API, question);
        return response.data;

    } catch (error) {
        console.log('Not able to add question', error);
    }

};

export const updateQuestion = async (qid, question) => {
    const response = await axios.put(`${QUESTIONS_API}${qid}`, question);
    return response.data;
}



// ***************Answers API************************
export const getAllAnswers = async () => {
    const response = await axios.get(ANSWERS_API);
    return response.data;

}

export const updateAnswerVoteCount = async (aid, value) => {
    //value can be -1 or +1
    const response = await axios.put(`${ANSWERS_API}updatevotecount/${aid}`, value)
    return response.data;

}
export const createNewAnswer = async (answer) => {
    try {
        const response = await axios.post(ANSWERS_API, answer);
        return response.data;

    } catch (error) {
        console.log('Not able to add answer', error);
    }

};
export const updateAnswer = async (aid, answer) => {
    const response = await axios.put(`${ANSWERS_API}${aid}`, answer);
    return response.data;
}



// ***************Tags API************************

export const getAlllTags = async () => {
    const response = await axios.get(TAGS_API);
    return response.data;
}

export const createNewTag = async (tag) => {
    try {
        const response = await axios.post(TAGS_API, tag);
        return response.data;

    } catch (error) {
        console.log('Not able to add tag', error);
    }

};


// ***************Comments API************************

export const getAllComments = async () => {
    const response = await axios.get(COMMENTS_API);
    return response.data;
}

export const getCommentById = async (id) => {
    const response = await axios.get(`${COMMENTS_API}${id}`)
    return response.data
}

export const createNewComment = async (comment) => {
    try {
        const response = await axios.post(COMMENTS_API, comment);
        return response.data;

    } catch (error) {
        console.log('Not able to add comment', error);
    }

};
