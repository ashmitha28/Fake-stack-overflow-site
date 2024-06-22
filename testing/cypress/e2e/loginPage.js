export const loginPage = (initPath, destroyPath) => {
    describe('Log In Page 1 - Successful login', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully show log in page', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
    
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.contains("6 questions");
            cy.contains("Joji John");
        });
    })
    
    
    describe('Log In Page 2 - Incorrect login password', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully show incorrect password', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
    
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('1234');
            cy.get('#loginButton').click();
            cy.contains("Invalid Password");
        });
    })
    
    describe('Log In Page 3 - Incorrect login username', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully show incorrect username', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
    
            cy.get('#loginUsername').type('Joji Johnny');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.contains("User With Username Doesnt Exist");
        });
    })
}