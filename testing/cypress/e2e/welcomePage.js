export const welcomePage = (initPath, destroyPath) => {
    describe('Welcome Page', () => {
        beforeEach(() => {
          // Seed the database before each test
          cy.exec(initPath);
        });
    
        afterEach(() => {
          // Clear the database after each test
          cy.exec(destroyPath);
        });
    
        it('successfully shows log in, sign up and guest buttons', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In');
            cy.contains('Register');
            cy.contains('Guest');
            cy.contains('FAKE STACK OVERFLOW');
        });
    })
    
  };