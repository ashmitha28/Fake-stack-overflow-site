
/**
 * Function to set the show page dictionary for the home page.
 * @param {function} setShowPageDictionary - A function to set the show page dictionary.
 */
export const homePage = (setShowPageDictionary) => {

    const updatedValues = {
        homePage: true,
        tagsPage: false,
        newQuestionPage: false,
        newAnswerPage: false,
        answerPage: false,
        questionsOfTagPage: false,
        loginPage: false,
        profilePage: false
    }

    setShowPageDictionary(prevState => ({
        ...prevState,
        ...updatedValues
    }));
}


/**
 * Function to set the show page dictionary for the new question page.
 * @param {function} setShowPageDictionary - A function to set the show page dictionary.
 */
export const newQuestionPage = (setShowPageDictionary) => {

    const updatedValues = {
        homePage: false,
        tagsPage: false,
        newQuestionPage: true,
        newAnswerPage: false,
        answerPage: false,
        questionsOfTagPage: false,
        loginPage: false,
        profilePage: false
    }

    setShowPageDictionary(prevState => ({
        ...prevState,
        ...updatedValues
    }));
}

/**
 * Function to set the show page dictionary for the answers page.
 * @param {function} setShowPageDictionary - A function to set the show page dictionary.
 */
export const answersPage = (setShowPageDictionary) => {

    const updatedValues = {
        homePage: false,
        tagsPage: false,
        newQuestionPage: false,
        newAnswerPage: false,
        answerPage: true,
        questionsOfTagPage: false,
        loginPage: false,
        profilePage: false
    }

    setShowPageDictionary(prevState => ({
        ...prevState,
        ...updatedValues
    }));
}


/**
 * Function to set the show page dictionary for the questions of tag page.
 * @param {function} setShowPageDictionary - A function to set the show page dictionary.
 */
export const questionsForTagPage = (setShowPageDictionary) => {

    const updatedValues = {
        homePage: false,
        tagsPage: false,
        newQuestionPage: false,
        newAnswerPage: false,
        answerPage: false,
        questionsOfTagPage: true,
        loginPage: false,
        profilePage: false
    }

    setShowPageDictionary(prevState => ({
        ...prevState,
        ...updatedValues
    }));
}


/**
 * Function to set the show page dictionary for the tags page.
 * @param {function} setShowPageDictionary - A function to set the show page dictionary.
 */
export const tagsPage = (setShowPageDictionary) => {

    const updatedValues = {
        homePage: false,
        tagsPage: true,
        newQuestionPage: false,
        newAnswerPage: false,
        answerPage: false,
        questionsOfTagPage: false,
        loginPage: false,
        profilePage: false
    };

    setShowPageDictionary(prevState => ({
        ...prevState,
        ...updatedValues
    }));
}

/**
 * Function to set the show page dictionary for the new answers page.
 * @param {function} setShowPageDictionary - A function to set the show page dictionary.
 */
export const newAnswersPage = (setShowPageDictionary) => {

    const updatedValues = {
        homePage: false,
        tagsPage: false,
        newQuestionPage: false,
        newAnswerPage: true,
        answerPage: false,
        questionsOfTagPage: false,
        loginPage: false,
        profilePage: false
    }

    setShowPageDictionary(prevState => ({
        ...prevState,
        ...updatedValues
    }));
}


export const loginPage = (setShowPageDictionary) => {

    const updatedValues = {
        homePage: false,
        tagsPage: false,
        newQuestionPage: false,
        newAnswerPage: false,
        answerPage: false,
        questionsOfTagPage: false,
        loginPage: true,
        profilePage: false
    }

    setShowPageDictionary(prevState => ({
        ...prevState,
        ...updatedValues
    }));
}

export const profilePage = (setShowPageDictionary) => {

    const updatedValues = {
        homePage: false,
        tagsPage: false,
        newQuestionPage: false,
        newAnswerPage: false,
        answerPage: false,
        questionsOfTagPage: false,
        loginPage: false,
        profilePage: true
    }

    setShowPageDictionary(prevState => ({
        ...prevState,
        ...updatedValues
    }));
}
