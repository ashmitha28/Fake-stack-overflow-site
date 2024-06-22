// Template test file. Change the file to add more tests.
const dbName = 'mongodb://127.0.0.1:27017/fake_so';
const initPath = 'node "../server/init.js" ' + dbName;
const destroyPath = 'node "../server/delete_db.js"';

import { welcomePage } from './welcomePage';
import { loginPage } from './loginPage';
import { signupPage } from './signupPage';
import { logoutPage } from './logoutPage';
import { homePage } from './homePage';
import { searchBar } from './searchBar';
import { newAnswerPage } from './newAnswerPage';
import { newQuestionPage } from './newQuestionPage';
import { tagsPage } from './tagsPage';
import { answerPage } from './answerPage';
import { userProfile } from './userProfile';

describe("Tests", () => {
    //WELCOME PAGE
    welcomePage(initPath, destroyPath);

    // LOGIN PAGE TESTS
    loginPage(initPath, destroyPath);
  
    // SIGNUP PAGE
    signupPage(initPath, destroyPath);
  
    // LOGOUT PAGE
    logoutPage(initPath, destroyPath);
  
    // HOMEPAGE
    homePage(initPath, destroyPath)
  
    // SEARCH BAR 
    searchBar(initPath, destroyPath)
  
    // NEW QUESTION PAGE
    newQuestionPage(initPath, destroyPath)
  
    // NEW ANSWER PAGE
    newAnswerPage(initPath, destroyPath)
  
    // TAGS PAGE
    tagsPage(initPath, destroyPath)
  
    // ANSWER PAGE
    answerPage(initPath, destroyPath)
  
    // USER PROFILE
    userProfile(initPath, destroyPath)
  // add test cases
});
