export const newQuestionPage = (initPath, destroyPath) => {
    // NEW QUESTION PAGE
    describe('New Question Form', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Ask a Question creates and displays in All Questions', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');

            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(1000);
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1');
            cy.get('#formTextInput').type('Test Question 1 Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
            cy.contains('Test Question 1')
            const qTitles = ['Test Question 1', 'Quick question about storage on android', 'Object storage for a web application', 'React: How to handle state in functional components?', 'android studio save string shared preference, start activity and load the saved string'];
            cy.get('.question-title').each(($el, index) => {
                cy.wrap($el).should('contain', qTitles[index]);
            });
        });
    })

    describe('New Question Form Metadata', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Ask a Question creates and displays expected metadata', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');

            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(1000);
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1');
            cy.get('#formTextInput').type('Test Question 1 Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
            cy.contains('Test Question 1')
            cy.contains('Joji John asked 0 seconds ago');
            const qTitles = ['Test Question 1', 'Quick question about storage on android', 'Object storage for a web application', 'React: How to handle state in functional components?', 'android studio save string shared preference, start activity and load the saved string'];
            const answers = ['0 answers', '1 answers', '1 answers', '3 answers', '1 answers'];
            const views = ['0 views', '103 views', '200 views', '101 views', '121 views'];

            cy.get('.postStats').each(($el, index, $list) => {
                cy.wrap($el).should('contain', answers[index]);
                cy.wrap($el).should('contain', views[index]);
                cy.wrap($el).should('contain', '0 votes');
            });
            cy.contains('Unanswered').click();
            cy.get('.postTitle').should('have.length', 1);
            cy.contains('1 question');
        });
    })

    describe('New Question Form with more than 5 tags', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Ask a Question creates with more than 5 tags should throw an error', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');

            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(1000);
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1');
            cy.get('#formTextInput').type('Test Question 1 Text');
            cy.get('#formTagInput').type('javascript t1 t2 t3 t4 t5');
            cy.contains('Post Question').click();
            cy.contains('Cannot have more than 5 tags')
            // cy.contains('Test Question 1');
            // cy.contains('javascript');
            // cy.contains('t1');
            // cy.contains('t2');
            // cy.contains('t3');
            // cy.contains('t4');
            // cy.contains('t5');
        });
    })

    describe('New Question Form with new tags when reputation score is below 50', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Ask a Question creates and create new tags when reputation score is less tham 50 will throw error', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');

            cy.get('#loginUsername').type('elephantCDE');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(1000);
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1');
            cy.get('#formTextInput').type('Test Question 1 Text');
            cy.get('#formTagInput').type('javascript t1 t2 t3 t4');
            cy.contains('Post Question').click();
            cy.contains('Reputation score is less than 50, new tags (the following) cannot be added t1, t2, t3, t4')
        });
    })


    describe('New Question Form with new tags', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Ask a Question creates and displays question with necessary tags', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');

            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(1000);

            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1');
            cy.get('#formTextInput').type('Test Question 1 Text');
            cy.get('#formTagInput').type('javascript react');
            cy.contains('Post Question').click();
            cy.contains('Test Question 1');
            cy.contains('javascript');
            cy.contains('react')
        });
    })


    describe('New Question Form error empty title', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Ask a Question with empty title should throw error', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');

            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(1000);
            cy.contains('Ask a Question').click();
            cy.get('#formTextInput').type('Test Question 1 Text');
            cy.get('#formTagInput').type('javascript react');
            cy.contains('Post Question').click();
            cy.contains('Title cannot be empty');
        });
    })

    describe('New Question Form error long title', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Ask a Question with long title should throw error', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');

            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(1000);
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
            cy.get('#formTextInput').type('Test Question 1 Text');
            cy.get('#formTagInput').type('javascript react');
            cy.contains('Post Question').click();
            cy.contains('Title cannot be more than 100 characters');
        });
    })

    describe('New Question Form error empty text', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Ask a Question with empty text should throw error', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');

            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(1000);
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1 Text');
            cy.get('#formTagInput').type('javascript react');
            cy.contains('Post Question').click();
            cy.contains('Question text cannot be empty');
        });
    })


    describe('New Question Form must already have username populated', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Ask a Question form should already have username populated', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');

            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.wait(1000);
            cy.contains('Ask a Question').click();
            cy.contains('Joji John')
        });
    })
}