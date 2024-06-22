export const newAnswerPage = (initPath, destroyPath) => {
    // --------------------------------------------------------------------
    // NEW ANSWER PAGE
    describe('New Answer Form 1', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('Create new answer should be displayed at the top of the answers page', () => {
        const answers = ['Test Answer 1', 'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.']
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
    
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        cy.wait(1000);

        cy.contains('Quick question about storage on android').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type(answers[0]);
        cy.contains('Post Answer').click();
        cy.contains('Test Answer 1')
        cy.get('.answer-info').each(($el, index) => {
            cy.wrap($el).should('contain', answers[index]);
        });
        cy.contains('Joji John');
        cy.contains('0 seconds ago');
        });
    })
    
    describe('New Answer Form with metadata', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('Create new answer should be displayed at the top of the answers page with the metadata', () => {
        const answers = ['Test Answer 1', 'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.']
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
    
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        cy.wait(1000);

        cy.contains('Quick question about storage on android').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type(answers[0]);
        cy.contains('Post Answer').click();
        cy.wait(1000);
        
        cy.contains('Test Answer 1')
        cy.contains('Joji John')
        cy.contains('answered 0 seconds ago')
        cy.contains('0 votes')
        });
    })
    
    
    describe('New Answer Form already populated with correct username', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('Create new answer form should already be populated with correct username', () => {
        const answers = ['Test Answer 1', 'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.']
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
    
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        cy.wait(1000);

        cy.contains('Quick question about storage on android').click();
        cy.contains('Answer Question').click();
        cy.contains('Joji John')
        });
    })
    
    describe('New Answer Form throws error if text is left empty', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('Create new answer without answer text should throw an error', () => {
        const answers = ['Test Answer 1', 'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.']
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
    
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        cy.wait(1000);

        cy.contains('Quick question about storage on android').click();
        cy.contains('Answer Question').click();
    
        cy.contains('Post Answer').click();
        cy.contains('Answer text cannot be empty')
    
        });
    })
}