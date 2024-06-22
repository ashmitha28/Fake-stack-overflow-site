export const logoutPage = (initPath, destroyPath) => {

    // LOGOUT
    describe('Logout page 1- Sign up, login and logout', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully log out', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Register').click();
            cy.contains('Username');
            cy.contains('Email');
            cy.contains('Password');
            cy.contains('Confirm Password');
            
            cy.get('#signUpUsername').type('Ash');
            cy.get('#signUpEmail').type('ashkash@gmail.com');
            cy.get('#signUpPassword').type('123');
            cy.get('#signUpConfirmPassword').type('123');
            cy.get('#signUp').click();
            
            cy.contains('Login Page');
            cy.get('#loginUsername').type('Ash');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.contains("6 questions");
            cy.contains("Ash");
    
            cy.wait(1000);
            cy.contains("Log Out").click();
    
            cy.contains("FAKE STACK OVERFLOW").click();
        });
    })
    
    // --------------------------------------------------------------------
    // LOGOUT AS GUEST TEST
    describe('Logout page 2- Guest logout', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully log out as guest', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            
            cy.contains("6 questions");
            cy.contains("Guest");
    
            cy.wait(1000);
            cy.contains("Log Out").click();
    
            cy.contains("FAKE STACK OVERFLOW").click();
        });
    })

}