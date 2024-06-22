export const answerPage = (initPath, destroyPath) => {

    const checkRepScore = (score) => {
        cy.contains("User Profile").click();
        cy.contains(score);
    }

    // guest
    describe('Answer Page 1 Guest', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully render answer page and check question details', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            cy.wait(2000);
            cy.contains('React: How to handle state in functional components?').click();
            cy.wait(2000);

            // question details
            cy.contains("React: How to handle state in functional components?");
            cy.contains("3 answers");
            cy.contains("102 views");
            cy.contains("saltyPeter");
            cy.contains("asked Feb 18, 2023 at 01:02");

            cy.contains("0 Votes");
            const tags = ["react", "javascript", "android-studio", "shared-preferences"]
            cy.get('.tagNode').each(($el, index, $list) => {
                cy.wrap($el).should('contain', tags[index]);
            });
        });

        it('successfully render answer page and check question comments', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            cy.wait(2000);
            cy.contains('React: How to handle state in functional components?').click();
            cy.wait(2000);

            // question comment 1
            cy.contains("very nice");
            cy.contains("saltyPeter");
            cy.contains("0 votes");

            // question comment 2
            cy.contains("nice question");
            cy.contains("tigerABC");
            cy.contains("0 votes");

            // question comment 3
            cy.contains("Bad question");
            cy.contains("monkeyABC");
            cy.contains("0 votes");

            // question comment buttons
            cy.contains("Prev").should('be.disabled');
            cy.contains("Next").click();

            // question comment 4
            cy.contains("Bad question");
            cy.contains("monkeyABC");
            cy.contains("0 votes");

            // question comment buttons
            cy.contains("Next").should('be.disabled');
            cy.contains("Prev").click();
        });
    })

    describe('Answer Page 2 Guest', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully render answer page and check answers details', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            cy.wait(2000);
            cy.contains('React: How to handle state in functional components?').click();
            cy.wait(2000);

            cy.contains("YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);");
            cy.contains("monkeyABC");
            cy.contains("answered Nov 12 at 03:30");
            cy.contains("0 votes");

            cy.contains("I just found all the above examples just too confusing, so I wrote my own.");
            cy.contains("tigerABC");
            cy.contains("answered Nov 01 at 15:24");
            cy.contains("0 votes");

        });

        it('successfully render and check answer comments', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            cy.wait(2000);
            cy.contains('React: How to handle state in functional components?').click();
            cy.wait(2000);

            cy.contains("Answer Comments");
            cy.contains("No Comments");

            cy.get('input[type="Add a comment..."]').should('not.exist');
        });

        it('successfully render and check answer comments pagination', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            cy.wait(2000);
            cy.contains('Active').click();
            cy.wait(1000);
            cy.contains('Programmatically navigate using React router').click();
            cy.wait(2000);

            cy.contains("React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.")
        });

        it('successfully render and check answer pagination', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            cy.wait(2000);
            cy.contains('Next').click();
            cy.contains('Programmatically navigate using React router').click();
            cy.wait(2000);

            cy.get("#previousAnswerComment").should('be.disabled');
            cy.get("#nextAnswerComment").click();

            cy.contains("this answer is good");
        });
    })

    describe('Answer Page Registed User upvoting and downvoting a question', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully increase the number of votes after upvoting and increase reputation score', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            //User is predefined with > 50 rep score
            cy.get('#loginUsername').type('armand');
            cy.get('#loginPassword').type('333');
            cy.get('#loginButton').click();
            cy.wait(2000)
            cy.contains('User Profile').click()
            cy.wait(1000);

            //Initial rep score check
            cy.contains('User score: 60')
            //Question has been asked by the same user
            cy.get('#questions-link').click();
            cy.wait(1000);
            cy.contains('Java: How to read a file line by line?').click();
            cy.wait(1000)
            cy.contains('0 Votes')
            cy.get('#question-upvote').click()
            cy.wait(1000);
            cy.get('#question-upvote').click()
            cy.wait(1000);
            //Check if votes have been incremented
            cy.contains('2 Votes')

            cy.contains('User Profile').click()
            cy.wait(1000);
            //Updated rep score after two upvotes
            cy.contains('User score: 70')



        });
        it('successfully decrease the number of votes after downvoting and decrease reputation score', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            //User is predefined with > 50 rep score
            cy.get('#loginUsername').type('armand');
            cy.get('#loginPassword').type('333');
            cy.get('#loginButton').click();
            cy.wait(2000)
            cy.contains('User Profile').click()
            cy.wait(1000);

            //Initial rep score check
            cy.contains('User score: 60')
            //Question has been asked by the same user
            cy.get('#questions-link').click();
            cy.wait(1000);
            cy.contains('Java: How to read a file line by line?').click();
            cy.wait(1000)
            cy.contains('0 Votes')
            cy.get('#question-downvote').click()
            cy.wait(1000);

            //Check if votes have been incremented
            cy.contains('-1 Votes')

            cy.contains('User Profile').click()
            cy.wait(1000);
            //Updated rep score after two upvotes
            cy.contains('User score: 50')



        });

    })

    describe('Answer Page Registed User needs reputation score > 50 to vote for question', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully throw error message if reputation score of user trying to upvote is less than 50', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            //User is predefined with > 50 rep score
            cy.get('#loginUsername').type('elephantCDE');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000)
            cy.contains('User Profile').click()
            cy.wait(1000);

            //Initial rep score check
            cy.contains('User score: 0')
            //Question has been asked by the same user
            cy.get('#questions-link').click();
            cy.wait(1000);
            cy.contains('Java: How to read a file line by line?').click();
            cy.wait(1000)
            cy.contains('0 Votes')
            cy.get('#question-upvote').click()
            cy.wait(1000);
            //Error message
            cy.contains('Reputation Score should be greater than 50 to vote')




        });
        it('successfully throw error message if reputation score of user trying to upvote is less than 50', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            //User is predefined with > 50 rep score
            cy.get('#loginUsername').type('elephantCDE');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000)
            cy.contains('User Profile').click()
            cy.wait(1000);

            //Initial rep score check
            cy.contains('User score: 0')
            //Question has been asked by the same user
            cy.get('#questions-link').click();
            cy.wait(1000);
            cy.contains('Java: How to read a file line by line?').click();
            cy.wait(1000)
            cy.contains('0 Votes')
            cy.get('#question-downvote').click()
            cy.wait(1000);

            //Error message
            cy.contains('Reputation Score should be greater than 50 to vote')



        });
    });

    describe('Answer Page Registed User upvoting and downvoting an answer', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully increase the number of votes after upvoting and increase reputation score', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            //User is predefined with > 50 rep score
            cy.get('#loginUsername').type('armand');
            cy.get('#loginPassword').type('333');
            cy.get('#loginButton').click();
            cy.wait(2000)
            cy.contains('User Profile').click()
            cy.wait(1000);

            //Initial rep score check
            cy.contains('User score: 60')
            //Question has been asked by the same user
            cy.get('#questions-link').click();
            cy.wait(1000);
            cy.contains('android studio save string shared preference, start activity and load the saved string').click();
            cy.wait(1000)
            cy.contains('0 Votes')
            cy.contains('React Router is mostly a wrapper')
            cy.get('#answer-upvote').click()
            cy.wait(1000);
            cy.get('#answer-upvote').click()
            cy.wait(1000);
            //Check if votes have been incremented
            cy.contains('2 votes')

            cy.contains('User Profile').click()
            cy.wait(1000);
            //Updated rep score after two upvotes
            cy.contains('User score: 70')



        });
        it('successfully decrease the number of votes after downvoting and decrease reputation score', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            //User is predefined with > 50 rep score
            cy.get('#loginUsername').type('armand');
            cy.get('#loginPassword').type('333');
            cy.get('#loginButton').click();
            cy.wait(2000)
            cy.contains('User Profile').click()
            cy.wait(1000);

            //Initial rep score check
            cy.contains('User score: 60')
            //Question has been asked by the same user
            cy.get('#questions-link').click();
            cy.wait(1000);
            cy.contains('android studio save string shared preference, start activity and load the saved string').click();
            cy.wait(1000)
            cy.contains('0 Votes')
            cy.contains('React Router is mostly a wrapper')
            cy.get('#answer-downvote').click()
            cy.wait(1000);

            //Check if votes have been incremented
            cy.contains('1 votes')

            cy.contains('User Profile').click()
            cy.wait(1000);
            //Updated rep score after two upvotes
            cy.contains('User score: 50')



        });

    })

    describe('Answer Page Registed User needs reputation score > 50 to vote for answer', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully throw error message if reputation score of user trying to upvote is less than 50', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            //User is predefined with > 50 rep score
            cy.get('#loginUsername').type('elephantCDE');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000)
            cy.contains('User Profile').click()
            cy.wait(1000);

            //Initial rep score check
            cy.contains('User score: 0')
            //Question has been asked by the same user
            cy.get('#questions-link').click();
            cy.wait(1000);
            cy.contains('Java: How to read a file line by line?').click();
            cy.wait(1000)
            cy.contains('0 Votes')
            cy.get('#answer-upvote').click()
            cy.wait(1000);
            //Error message
            cy.contains('Reputation Score should be greater than 50 to vote')




        });
        it('successfully throw error message if reputation score of user trying to upvote is less than 50', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            //User is predefined with > 50 rep score
            cy.get('#loginUsername').type('elephantCDE');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000)
            cy.contains('User Profile').click()
            cy.wait(1000);

            //Initial rep score check
            cy.contains('User score: 0')
            //Question has been asked by the same user
            cy.get('#questions-link').click();
            cy.wait(1000);
            cy.contains('Java: How to read a file line by line?').click();
            cy.wait(1000)
            cy.contains('0 Votes')
            cy.get('#answer-downvote').click()
            cy.wait(1000);

            //Error message
            cy.contains('Reputation Score should be greater than 50 to vote')



        });
    });





    // registered
    describe('Answer Page 1 Registered', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully render answer page and check question details', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('React: How to handle state in functional components?').click();
            cy.wait(2000);

            // question details
            cy.contains("React: How to handle state in functional components?");
            cy.contains("3 answers");
            cy.contains("102 views");
            cy.contains("saltyPeter");
            cy.contains("asked Feb 18, 2023 at 01:02");

            cy.contains("0 Votes");
            const tags = ["react", "javascript", "android-studio", "shared-preferences"]
            cy.get('.tagNode').each(($el, index, $list) => {
                cy.wrap($el).should('contain', tags[index]);
            });
        });

        it('successfully render answer page and check question comments', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('React: How to handle state in functional components?').click();
            cy.wait(2000);

            // question comment 1
            cy.contains("very nice");
            cy.contains("saltyPeter");
            cy.contains("0 votes");

            // question comment 2
            cy.contains("nice question");
            cy.contains("tigerABC");
            cy.contains("0 votes");

            // question comment 3
            cy.contains("Bad question");
            cy.contains("monkeyABC");
            cy.contains("0 votes");

            // question comment buttons
            cy.contains("Prev").should('be.disabled');
            cy.contains("Next").click();

            // question comment 4
            cy.contains("Bad question");
            cy.contains("monkeyABC");
            cy.contains("0 votes");

            // question comment buttons
            cy.contains("Next").should('be.disabled');
            cy.contains("Prev").click();
        });
    })

    describe('Answer Page 2 Registered', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully render answer page and check answers details', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('React: How to handle state in functional components?').click();
            cy.wait(2000);

            cy.contains("YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);");
            cy.contains("monkeyABC");
            cy.contains("answered Nov 12 at 03:30");
            cy.contains("0 votes");

            cy.contains("I just found all the above examples just too confusing, so I wrote my own.");
            cy.contains("tigerABC");
            cy.contains("answered Nov 01 at 15:24");
            cy.contains("0 votes");

        });

        it('successfully render and check answer comments', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('React: How to handle state in functional components?').click();
            cy.wait(2000);

            cy.contains("Answer Comments");
            cy.contains("No Comments");

            cy.get('input[type="Add a comment..."]').should('not.exist');
        });

        it('successfully render and check answer comments pagination', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('Active').click();
            cy.wait(1000);
            cy.contains('Programmatically navigate using React router').click();
            cy.wait(2000);

            cy.contains("React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.")
        });

        it('successfully render and check answer pagination', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('Next').click();
            cy.contains('Programmatically navigate using React router').click();
            cy.wait(2000);

            cy.get("#previousAnswerComment").should('be.disabled');
            cy.get("#nextAnswerComment").click();

            cy.contains("this answer is good");
        });
    })


    describe('Answer Page 3 Registered', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully check new answer', () => {

            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            cy.contains("Answer Question").click();
            cy.wait(1000);
            cy.get('#answerTextInput').type("Test Answer 1");
            cy.contains('Post Answer').click();
            cy.contains('Test Answer 1')
        });

        it('successfully check new question comment not added due to less repuation points', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('monkeyABC');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            cy.get("#addQuestionComment").type("Hello new comment{enter}");
            cy.wait(1000);
            cy.contains("You need at least 50 reputation points to add a comment.");
        });

        it('successfully check new question comment not added due to greater than 140 characters', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            cy.get("#addQuestionComment").type("Exploring the vast realm of programming languages is both challenging and rewarding. It's like solving puzzles that unlock the potential for endless creativity. Embrace the journey, fellow coders! 💻✨{enter}");
            cy.wait(1000);
            cy.contains("Comment should be 140 characters or less.");
        });

        it('successfully check new question comment added', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            cy.get("#addQuestionComment").type("Hello new comment{enter}");
            cy.wait(1000);
            cy.contains("Hello new comment");
        });

        it('successfully check new answer comment not added due to less repuation points', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('monkeyABC');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            cy.get("#addAnswerComment").type("Hello new comment{enter}");
            cy.wait(1000);
            cy.contains("You need at least 50 reputation points to add a comment.");
        });

        it('successfully check new answer comment not added due to greater than 140 characters', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            cy.get("#addAnswerComment").type("Exploring the vast realm of programming languages is both challenging and rewarding. It's like solving puzzles that unlock the potential for endless creativity. Embrace the journey, fellow coders! 💻✨{enter}");
            cy.wait(1000);
            cy.contains("Comment should be 140 characters or less.");
        });

        it('successfully check new answer comment', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);

            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            cy.get("#addAnswerComment").type("Hello new comment{enter}");
            cy.wait(1000);
            cy.contains("Hello new comment");
        });

    })


    describe('Answer Page 4 Registered', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully check answer page upvote and downvote question and question activity', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('tigerABC');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);

            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            // upvote 
            cy.get("#question-upvote").click();
            cy.contains("1 Votes")

            // check user reputation
            checkRepScore("60");

            // check activity
            cy.contains("Questions").click();
            cy.contains("Active").click();
            cy.wait(1000);
            var qTitles1 = ['Quick question about storage on android'];
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles1[index]);
                return false; //checking only for first question name
            })

            // downvote
            cy.contains("Object storage for a web application").click();
            cy.get("#question-downvote").click();
            cy.contains("-1 Votes")

            // logout login
            cy.contains('Log Out').click();
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('monkeyABC');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);

            // check user reputation
            checkRepScore("20");

            // check activity
            cy.contains("Questions").click();
            cy.contains("Newest").click();
            cy.wait(1000);
            cy.contains("Active").click();
            cy.wait(1000);
            var qTitles2 = ["Object storage for a web application"];
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles2[index]);
                return false; //checking only for first question name
            })
        });

        it('successfully check upvote question comment and question activity', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('tigerABC');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);

            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            // upvote 
            cy.get("#addQuestionComment").type("Hello new comment{enter}");
            cy.wait(1000);
            cy.get("#comment-upvote").click();
            cy.contains("1 votes")

            // check user reputation
            checkRepScore("55");

            // check activity
            cy.contains("Questions").click();
            cy.contains("Active").click();
            var qTitles = ['Quick question about storage on android', 'Object storage for a web application', "React: How to handle state in functional components?", "android studio save string shared preference, start activity and load the saved string", "Java: How to read a file line by line?"];
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
                return false; //checking only for first question name
            })
        });

        it('successfully check upvote and downvote answer and question acitivity', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('tigerABC');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            // upvote 
            cy.get("#answer-upvote").click();
            cy.wait(1000);
            cy.contains("1 votes")

            // logout login
            cy.contains('Log Out').click();
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('monkeyABC');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);

            // check user reputation
            checkRepScore("35");

            // check activity
            cy.contains("Questions").click();
            cy.contains("Active").click();
            var qTitles1 = ['Quick question about storage on android', 'Object storage for a web application', "React: How to handle state in functional components?", "android studio save string shared preference, start activity and load the saved string", "Java: How to read a file line by line?"];
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles1[index]);
                return false; //checking only for first question name
            })

            // downvote
            cy.contains("Object storage for a web application").click();
            cy.get("#answer-downvote").click();
            cy.wait(1000);
            cy.contains("0 votes")

            // logout login
            cy.contains('Log Out').click();
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('elephantCDE');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);

            // check user reputation
            checkRepScore("0");

            // check activity
            cy.contains("Questions").click();
            cy.contains("Newest").click();
            cy.contains("Active").click();
            var qTitles2 = ["Quick question about storage on android", "Object storage for a web application", "React: How to handle state in functional components?", "android studio save string shared preference, start activity and load the saved string", "Java: How to read a file line by line?"];
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles2[index]);
                return false; // checking only for first question name
            })
        });
    })


    describe('Answer Page 5 Registered', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('successfully check answer page upvote and downvote question should not work with low reputation', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('elephantCDE');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);

            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            // upvote 
            cy.get("#question-upvote").click();
            cy.contains("Reputation Score should be greater than 50 to vote");

            // downvote
            cy.get("#question-downvote").click();
            cy.contains("Reputation Score should be greater than 50 to vote")
        });

        it('successfully check upvote question comment and question activity', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('elephantCDE');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);

            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            // upvote 
            cy.get("#addQuestionComment").type("Hello new comment{enter}");
            cy.wait(1000);
            cy.contains("You need at least 50 reputation points to add a comment.");
        });

        it('successfully check upvote and downvote answer and question acitivity', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('elephantCDE');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            // upvote 
            cy.get("#answer-upvote").click();
            cy.contains("Reputation Score should be greater than 50 to vote");

            // downvote
            cy.get("#answer-downvote").click();
            cy.contains("Reputation Score should be greater than 50 to vote")
        });

        it('successfully check accept answer', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('elephantCDE');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(2000);

            cy.contains('Quick question about storage on android').click();
            cy.wait(2000);

            cy.get("#acceptAnswer").should('not.exist');
        });

    })


}