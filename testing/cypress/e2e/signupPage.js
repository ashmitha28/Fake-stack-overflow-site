export const signupPage = (initPath, destroyPath) => {
    // SIGNUP PAGE TESTS + LOGIN TESTS
    describe('Sign up page 1 - Successful sign up and login', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully sign up and login', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Register').click();
            cy.contains('Username');
            cy.contains('Email');
            cy.contains('Password');
            cy.contains('Confirm Password');
    
            cy.get('#signUpUsername').type('Ashmi');
            cy.get('#signUpEmail').type('ashmi@gmail.com');
            cy.get('#signUpPassword').type('123');
            cy.get('#signUpConfirmPassword').type('123');
            cy.get('#signUp').click();
            
            cy.contains('Login Page');
            cy.get('#loginUsername').type('Ashmi');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            cy.contains("6 questions");
            cy.contains("Ashmi");
        });
    })
    
    describe('Sign up page 2 - form validation', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully password mismatch', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Register').click();
            cy.contains('Username');
            cy.contains('Email');
            cy.contains('Password');
            cy.contains('Confirm Password');
    
            cy.get('#signUpUsername').type('Ashmi');
            cy.get('#signUpEmail').type('ashmi@gmail.com');
            cy.get('#signUpPassword').type('123');
            cy.get('#signUpConfirmPassword').type('1234');
            cy.get('#signUp').click();
            
            cy.contains('Passwords do not match');
        });
    
        it('successfully empty username', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.contains('Username');
        cy.contains('Email');
        cy.contains('Password');
        cy.contains('Confirm Password');
    
        cy.get('#signUpEmail').type('ashmi@gmail.com');
        cy.get('#signUpPassword').type('123');
        cy.get('#signUpConfirmPassword').type('1234');
        cy.get('#signUp').click();
        
        cy.contains('Empty fields are not allowed');
        });
    
        it('successfully empty email', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.contains('Username');
        cy.contains('Email');
        cy.contains('Password');
        cy.contains('Confirm Password');
    
        cy.get('#signUpUsername').type('Ashmitha');
        cy.get('#signUpPassword').type('123');
        cy.get('#signUpConfirmPassword').type('1234');
        cy.get('#signUp').click();
        
        cy.contains('Empty fields are not allowed');
        });
    
        it('successfully empty password', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.contains('Username');
        cy.contains('Email');
        cy.contains('Password');
        cy.contains('Confirm Password');
    
        cy.get('#signUpUsername').type('ashmitha');
        cy.get('#signUpEmail').type('ashkash@gmail.com');
        cy.get('#signUpConfirmPassword').type('1234');
        cy.get('#signUp').click();
        
        cy.contains('Empty fields are not allowed');
        });
    
        it('successfully invalid email', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.contains('Username');
        cy.contains('Email');
        cy.contains('Password');
        cy.contains('Confirm Password');
    
        cy.get('#signUpUsername').type('ashmitha');
        cy.get('#signUpEmail').type('ashkashgmail.com');
        cy.get('#signUpPassword').type('123');
        cy.get('#signUpConfirmPassword').type('123');
        cy.get('#signUp').click();
        
        cy.contains('Invalid Email');
        });
    
        it('successfully email exists', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.contains('Username');
        cy.contains('Email');
        cy.contains('Password');
        cy.contains('Confirm Password');
    
        cy.get('#signUpUsername').type('Ashu');
        cy.get('#signUpEmail').type('lionABC@gmail.com');
        cy.get('#signUpPassword').type('123');
        cy.get('#signUpConfirmPassword').type('123');
        cy.get('#signUp').click();
        
        cy.contains('Email Exists');
        });
    
        it('successfully username exists', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.contains('Username');
        cy.contains('Email');
        cy.contains('Password');
        cy.contains('Confirm Password');
    
        cy.get('#signUpUsername').type('lionABC');
        cy.get('#signUpEmail').type('lionABCD@gmail.com');
        cy.get('#signUpPassword').type('123');
        cy.get('#signUpConfirmPassword').type('123');
        cy.get('#signUp').click();
        
        cy.contains('Username Exists');
        });
    
        it('successfully password contains username', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.contains('Username');
        cy.contains('Email');
        cy.contains('Password');
        cy.contains('Confirm Password');
    
        cy.get('#signUpUsername').type('lionABC');
        cy.get('#signUpEmail').type('lionABCD@gmail.com');
        cy.get('#signUpPassword').type('lionABC');
        cy.get('#signUpConfirmPassword').type('lionABC');
        cy.get('#signUp').click();
        
        cy.contains('Password cannot contain username');
        });
    
        it('successfully password contains email', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.contains('Username');
        cy.contains('Email');
        cy.contains('Password');
        cy.contains('Confirm Password');
    
        cy.get('#signUpUsername').type('lionABC');
        cy.get('#signUpEmail').type('lionABCD@gmail.com');
        cy.get('#signUpPassword').type('lionABCD@gmail.com');
        cy.get('#signUpConfirmPassword').type('lionABCD@gmail.com');
        cy.get('#signUp').click();
        
        cy.contains('Password cannot contain email');
        });
    })
    
    describe('Sign up page 3 - Successful back home', () => {
        beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
        });
    
        afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
        });
    
        it('successfully back home', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Register').click();
            cy.contains('Username');
            cy.contains('Email');
            cy.contains('Password');
            cy.contains('Confirm Password');
    
            cy.get('#signUpUsername').type('Ashmitha');
            cy.get('#signUpEmail').type('ashkash@gmail.com');
            cy.get('#signUpPassword').type('123');
            cy.get('#signUpConfirmPassword').type('123');
            
            cy.wait(1000);
            cy.contains('Back to Home').click();
            cy.contains("Fake Stack Overflow");
        });
    })

}