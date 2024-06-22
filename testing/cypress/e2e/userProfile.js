export const userProfile = (initPath, destroyPath) => {
    describe('User profile metadata loads correctly', () => {
      beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
      });
  
      afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
      });
  
      it('Check if user profile displays the correct data related to the user', () => {
  
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
  
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
  
        cy.contains('User Profile').click();
  
        cy.contains('Username: Joji John');
        cy.contains('User score: 100');
  
      });
    })
  
  
    describe('User profile shows user asked question and tags', () => {
      beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
      });
  
      afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
      });
  
      it('Check if user profile displays the question and tags asked by the user', () => {
  
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
  
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
  
  
        cy.contains('Ask a Question').click();
        cy.wait(1000)
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript react');
        cy.contains('Post Question').click();
        cy.wait(1000)
  
  
        cy.contains('User Profile').click();
        cy.wait(1000)
  
        cy.contains('Test Question 1');
        cy.contains('Test Question 1 Text');
  
        cy.contains('javascript')
        cy.contains('react')
  
      });
    })
  
    describe('Tags used by other users questions must not be editable or deletable', () => {
      beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
      });
  
      afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
      });
  
      it('Check if user profile displays the answer', () => {
  
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
  
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        cy.wait(500);
  
  
        cy.contains('Ask a Question').click();
        cy.wait(500);
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript react');
        cy.contains('Post Question').click();
        cy.wait(1000)
  
  
        cy.contains('User Profile').click();
        cy.wait(1000);
  
        cy.contains('Edit').should('have.attr', 'disabled', 'disabled');
        cy.contains('Delete').should('have.attr', 'disabled', 'disabled');
      });
    })
  
  
    describe('Question should be editable and new updated content displayed', () => {
      beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
      });
  
      afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
      });
  
      it('Check if clicking the question on the user profile page opens new question page with populated content and on submitting it should be edited', () => {
  
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
  
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        cy.wait(500);
  
  
        cy.contains('Ask a Question').click();
        cy.wait(500);
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript react');
        cy.contains('Post Question').click();
        cy.wait(1000);
  
  
        cy.contains('User Profile').click();
        cy.wait(1000);
  
        cy.contains('Title: Test Question 1').click()
        cy.wait(500);
        //Checking if correct values are being populated
        cy.get('#formTitleInput').should('include.value', 'Test Question 1');
        cy.get('#formTextInput').should('include.value', 'Test Question 1 Text');
        cy.get('#formTitleInput').type(' Updated');
        cy.get('#formTextInput').type(' has been updated');
  
        cy.contains('Post Question').click();
        cy.wait(1000);
        cy.contains('User Profile').click();
        cy.wait(1000);
        //Checking if update has been reflected
        cy.contains('Title: Test Question 1 Updated')
        cy.contains('Text: Test Question 1 Text has been updated')
      });
    })
  
    describe('Answer should be editable and new updated content displayed', () => {
      beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
      });
  
      afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
      });
  
      it('Check if clicking the answer on the user profile page opens new answer page with populated content and on submitting it should be edited', () => {
  
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
  
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        cy.wait(500);
  
  
  
        cy.contains('User Profile').click();
        cy.wait(1000);
        //Checking if answer data is populated correctly
        cy.contains('Store data in a SQLLite database.').click();
        cy.wait(500);
        cy.get('#answerTextInput').should('include.value', 'Store data in a SQLLite database.');
        cy.get('#answerTextInput').type(' Or MySQL')
  
  
        cy.contains('Post Answer').click();
        cy.wait(1000);
        cy.contains('User Profile').click();
        cy.wait(1000);
        //Verifying update has been reflected
        cy.contains('Store data in a SQLLite database. Or MySQL')
  
      });
    })
  
    //Deleting a question should make it go away delete answer as well in user profile page
    describe('Deleting question from user profile page', () => {
      beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
      });
  
      afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
      });
  
      it('Deleting a question should make it go away in user profile page', () => {
  
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
  
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        cy.wait(500);
  
  
        cy.contains('Ask a Question').click();
        cy.wait(500);
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript react');
        cy.contains('Post Question').click();
        cy.wait(1000);
  
  
        cy.contains('User Profile').click();
        cy.wait(1000);
  
        cy.contains('Title: Test Question 1').click()
        cy.wait(500);
  
  
        cy.contains('Delete Question').click();
        cy.wait(1000);
        cy.contains('User Profile').click();
        cy.wait(1000);
        //Should not contain the question after deleting
        cy.get('body').should('not.contain', 'Title: Test Question 1');
        cy.get('body').should('not.contain', 'Test: Test Question 1 Text');
      });
    })
  
    //Deleting an answer must make it go away
    describe('Deleting answer from user profile page', () => {
      beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
      });
  
      afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
      });
  
      it('Deleting an answer should make it go away in user profile page', () => {
  
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
  
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        cy.wait(500);
  
  
  
  
        cy.contains('User Profile').click();
        cy.wait(1000);
  
        cy.contains('Store data in a SQLLite database.').click()
        cy.wait(500);
  
  
        cy.contains('Delete Answer').click();
        cy.wait(1000);
        cy.contains('User Profile').click();
        cy.wait(1000);
        //Should not contain the question after deleting
        cy.get('body').should('not.contain', 'Store data in a SQLLite database.');
  
      });
    })
  
    //Deleting a question with an answer should make the answer go away
    describe('Deleting question and answer from user profile page', () => {
      beforeEach(() => {
        // Seed the database before each test
        cy.exec(initPath);
      });
  
      afterEach(() => {
        // Clear the database after each test
        cy.exec(destroyPath);
      });
  
      it('Deleting a question should make it go away along with its answer in user profile page', () => {
  
        cy.visit('http://localhost:3000');
        cy.contains('Log In').click();
        cy.contains('Username');
        cy.contains('Password');
  
        cy.get('#loginUsername').type('Joji John');
        cy.get('#loginPassword').type('123');
        cy.get('#loginButton').click();
        cy.wait(500);
  
  
        cy.contains('Ask a Question').click();
        cy.wait(500);
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript react');
        cy.contains('Post Question').click();
        cy.wait(1000);
  
  
        cy.contains('Test Question 1').click()
        cy.wait(1000)
        cy.contains('Answer Question').click()
        cy.wait(1000);
        cy.get('#answerTextInput').type('Sample Answer');
        cy.contains('Post Answer').click();
        cy.wait(1000)
  
  
        cy.contains('User Profile').click();
        cy.wait(1000);
  
        cy.contains('Title: Test Question 1').click()
        cy.wait(500);
  
  
        cy.contains('Delete Question').click();
        cy.wait(1000);
        cy.contains('User Profile').click();
        cy.wait(1000);
        //Should not contain the question after deleting
        cy.get('body').should('not.contain', 'Title: Test Question 1');
        cy.get('body').should('not.contain', 'Test: Test Question 1 Text');
        cy.get('body').should('not.contain', 'Sample Answer');
      });
    })
  }