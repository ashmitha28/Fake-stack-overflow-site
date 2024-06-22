#Features implemented

1. ask questions

2. provide answers

3. search for posts

4. tag posts

5. comment on questions and answers

6. vote on questions, answers, and comments

7. create their individual user profiles

8. authenticate registered users

# Instructions to run

- For first time run install docker and execute the command: "docker-compose up"
- If re-running via docker drop fake_so as the db is initialized every run 


## List of features

1. ask questions: Allows users to post questions to the question feed. 
2. provide answers: Users can ask or receive answers to questions on the feed. 
3. search for posts: Anyone can search for posts by word or tag, for tags use ['tagname']. 
4. tag posts: Anyone who asks a question may tag their question so that it is easily searchable. 
5. comment on questions and answers: Users may leave comments on both questions and answers. 
6. vote on questions, answers, and comments: This feature allows a user to vote up or vote down on content they agree with or disagree with. 
7. create their individual user profiles: Users have a profile with all their information e.g. questions asked, vote score etc. 
8. authenticate registered users: New users may register for an account and current users can login to their personal account that is unique to them.

## For each feature indicate the test

- Feature 1: /path/to/cypress/test

- Ask questions: /server/testing/cypress/newQuestionPage.js
- Provide answers: to answer a question /server/testing/cypress/e2e/newAnswerPage.js    
                to check existing answers of a question   /server/testing/cypress/e2e/answerPage.js
- search for posts: /server/testing/cypress/e2e/searchBar.js
- tag posts: /server/testing/cypress/e2e/tagsPage.js
- comment on questions and answers: /server/testing/cypress/e2e/answerPage.js
- vote on questions, answers, and comments: /server/testing/cypress/e2e/answerPage.js
- create their individual user profiles:  create user profile - /server/testing/cypress/e2e/signupPage.js
                                          signIn already existing user - /server/testing/cypress/e2e/loginPage.js
                                          Check their user profile - /server/testing/cypress/e2e/userProfile.js
                                          logout of the site - /server/testing/cypress/e2e/logoutPage.js
- authenticate registered users: /server/testing/cypress/e2e/homePage.js



## For each server endpoint indicate the test

- Endpoint 1: /path/to/server/tests/test-file

## Instructions to generate and view coverage report 

This counts for extra credit. Ignore if you haven't implemented it.
