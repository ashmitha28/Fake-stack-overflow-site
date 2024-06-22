export const homePage = (initPath, destroyPath) => {

    // --------------------------------------------------------------------
    // HOMEPAGE - RESGISTERED USER
    describe('Home Page - Registered User 1', () => {
        beforeEach(() => {
        cy.exec(initPath);
        });
    
        afterEach(() => {
        cy.exec(destroyPath);
        });
    
        it('successfully home page', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            
            cy.contains('Joji John');
            cy.contains('User Profile');
    
            cy.contains('All Questions');
            cy.contains('Ask a Question');
            cy.contains('6 questions');
    
            cy.contains('Newest');
            cy.contains('Active');
            cy.contains('Unanswered');
        });
    
        it('successfully shows menu items', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
    
        cy.contains('Questions');
        cy.contains('Tags');
        })
    
        it('successfully shows search bar', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
    
        cy.get('#searchBar');
        })
    
        it('successfully shows all questions in model', () => {
        const qTitles = ['Quick question about storage on android', 'Object storage for a web application', "React: How to handle state in functional components?", "android studio save string shared preference, start activity and load the saved string", "Java: How to read a file line by line?"];
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
        })
    
        it('successfully shows all question stats', () => {
        const answers = ['1 answers','1 answers', '3 answers', '1 answers', '6 answers'];
        const views = ['103 views','200 views', '101 views', '121 views', '121 views'];
        
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
    
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers[index]);
            cy.wrap($el).should('contain', views[index]);
            cy.wrap($el).should('contain', "0 votes");
        })
        })
    
        it('successfully shows all question authors and date time', () => {
        const authors = ['tigerABC', 'monkeyABC', 'saltyPeter', 'elephantCDE', 'armand'];
        const date = ['Mar 10', 'Feb 18', 'Feb 18', 'Jan 10', 'Jan 10'];
        const times = ['14:28', '01:02', '01:02', '11:24', "11:24"];
        
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
    
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
            })
        })
    
        it('successfully shows all questions in model in active order', () => {
        const qTitles = ['React: How to handle state in functional components?', 'Object storage for a web application', 'Programmatically navigate using React router', "android studio save string shared preference, start activity and load the saved string", "Quick question about storage on android"];
        
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
    
        cy.contains('Active').click();
        cy.wait(1000);
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
        })
    
        it('successfully shows all unanswered questions in model', () => {
        const qTitles = ['Object storage for a web application', 'Programmatically navigate using React router', "android studio save string shared preference, start activity and load the saved string", "Quick question about storage on android", "React: How to handle state in functional components?"];
        
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
    
        cy.contains('Unanswered').click();
        cy.contains('0 questions');
        })
    
        it('successfully check if prev button is disabled initially', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
    
        cy.get('#prevButton').should('be.disabled');
        })
    
        it('successfully check if next button is disabled', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
    
        cy.wait(1000);
        cy.get('#nextButton').click();
        
        cy.wait(1000);
        cy.get('#nextButton').should('be.disabled');
        })
    
        it('successfully shows search bar', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
    
        cy.get('#searchBar');
        })
    })
    
    
    describe('Home Page - Resgistered User 2', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully go next page to view questions', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            
            cy.wait(1000);
            cy.contains('Next').click();
            
            // question
            cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', "Programmatically navigate using React router");
            })
    
            // tags
            cy.contains('react');
            cy.contains('javascript');
            
            // last activity
            cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', "elephantCDE");
            })
    
            // check stats
            cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', '1 answers');
            cy.wrap($el).should('contain', '10 views');
            cy.wrap($el).should('contain', '0 votes');
            })
    
            // go back
            cy.wait(1000);
            cy.contains("Prev").click();
    
            const qTitles = ['Quick question about storage on android', 'Object storage for a web application', "React: How to handle state in functional components?", "android studio save string shared preference, start activity and load the saved string", "Java: How to read a file line by line?"];
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
            })
        });
    })
    
    // --------------------------------------------------------------------
    // HOMEPAGE UNREGISTERED USER 
    describe('Home Page - Guest User 1', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully home page', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            
            cy.contains('All Questions');
            cy.contains('6 questions');
            cy.contains('Newest');
            cy.contains('Active');
            cy.contains('Unanswered');
            cy.contains('Questions');
            cy.contains('Tags');
            cy.get('#ask-question-button').should('not.exist');
        });
    
        it('successfully shows menu items', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Continue as Guest').click();
        cy.contains('Questions');
        cy.contains('Tags');
        })
    
        it('successfully shows search bar', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Continue as Guest').click();
        cy.get('#searchBar');
        })
    
        it('successfully shows all questions in model', () => {
        const qTitles = ['Quick question about storage on android', 'Object storage for a web application', "React: How to handle state in functional components?", "android studio save string shared preference, start activity and load the saved string", "Java: How to read a file line by line?"];
        cy.visit('http://localhost:3000');
        cy.contains('Continue as Guest').click();
        
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
        })
    
        it('successfully shows all question stats', () => {
        const answers = ['1 answers','1 answers', '3 answers', '1 answers', '6 answers'];
        const views = ['103 views','200 views', '101 views', '121 views', '121 views'];
        
        cy.visit('http://localhost:3000');
        cy.contains('Continue as Guest').click();
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers[index]);
            cy.wrap($el).should('contain', views[index]);
            cy.wrap($el).should('contain', "0 votes");
        })
        })
    
        it('successfully shows all question authors and date time', () => {
        const authors = ['tigerABC', 'monkeyABC', 'saltyPeter', 'elephantCDE', 'armand'];
        const date = ['Mar 10', 'Feb 18', 'Feb 18', 'Jan 10', 'Jan 10'];
        const times = ['14:28', '01:02', '01:02', '11:24', "11:24"];
        
        cy.visit('http://localhost:3000');
        cy.contains('Continue as Guest').click();
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
        })
        })
    
        it('successfully shows all questions in model in active order', () => {
            const qTitles = ['React: How to handle state in functional components?', 'Object storage for a web application', 'Programmatically navigate using React router', "android studio save string shared preference, start activity and load the saved string", "Quick question about storage on android"];
        
        cy.visit('http://localhost:3000');
        cy.contains('Continue as Guest').click();
        cy.contains('New').click();
        cy.contains('Active').click();
        cy.wait(1000);
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
        })
    
        it('successfully shows all unanswered questions in model', () => {
        const qTitles = ['Object storage for a web application', 'Programmatically navigate using React router', "android studio save string shared preference, start activity and load the saved string", "Quick question about storage on android", "React: How to handle state in functional components?"];
        
        cy.visit('http://localhost:3000');
        cy.contains('Continue as Guest').click();
        cy.contains('Unanswered').click();
        cy.contains('0 questions');
        })
    })
    
    
    describe('Home Page - Guest User 2', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully go next page to view questions', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            
            cy.wait(1000);
            cy.contains('Next').click();
            
            // question
            cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', "Programmatically navigate using React router");
            })
    
            // tags
            cy.contains('react');
            cy.contains('javascript');
            
            // last activity
            cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', "elephantCDE");
            })
    
            // check stats
            cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', '1 answers');
            cy.wrap($el).should('contain', '10 views');
            cy.wrap($el).should('contain', '0 votes');
            })
    
            // go back
            cy.wait(1000);
            cy.contains("Prev").click();
    
            const qTitles = ['Quick question about storage on android', 'Object storage for a web application', "React: How to handle state in functional components?", "android studio save string shared preference, start activity and load the saved string", "Java: How to read a file line by line?"];
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
            })
        });
    })

}