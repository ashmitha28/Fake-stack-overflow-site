export const tagsPage = (initPath, destroyPath) => {
    

    // --------------------------------------------------------------------
    // TAGS PAGE - RESGISTERED USER
    describe('Tags Page 1 Registered', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
            });
        
        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
            });
        
        it('successfully render tags page and check all tags are present', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            
            cy.contains("Tags").click();
            cy.contains("8 Tags");
            cy.contains("All Tags");

            const tagNames = ["react", "javascript", "android-studio", "shared-preferences", "storage", "website", "Flutter", "Flask"]
            const tagQuestions = ["2 questions", "3 questions", "4 questions", "4 questions", "2 questions", "1 question", "0 question", "0 question"]
            cy.get('.tagNode').each(($el, index, $list) => {
                cy.wrap($el).should('contain', tagNames[index]);
                cy.wrap($el).should('contain', tagQuestions[index] );
            });
        });
    })

    describe('Tags Page 2 Registered', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
            });
        
        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
            });
        
        it('successfully click on a tag to render questions under that tag', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();
            
            cy.contains("Tags").click();
            cy.contains("javascript").click();

            const qTitles = ['React: How to handle state in functional components?', 'android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
            });
        });
    })

    // TAGS PAGE - GUEST USER
    describe('Tags Page 1 Guest', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
            });
        
        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
            });
        
        it('successfully render tags page and check all tags are present', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            
            cy.contains("Tags").click();
            cy.contains("Guest");
            cy.contains("8 Tags");
            cy.contains("All Tags");

            const tagNames = ["react", "javascript", "android-studio", "shared-preferences", "storage", "website", "Flutter", "Flask"]
            const tagQuestions = ["2 questions", "3 questions", "4 questions", "4 questions", "2 questions", "1 question", "0 question", "0 question"]
            cy.get('.tagNode').each(($el, index, $list) => {
                cy.wrap($el).should('contain', tagNames[index]);
                cy.wrap($el).should('contain', tagQuestions[index] );
            });
        });
    })

    describe('Tags Page 2 Guest', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
            });
        
        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
            });
        
        it('successfully click on a tag to render questions under that tag', () => {
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();
            
            cy.contains("Tags").click();
            cy.contains("javascript").click();

            const qTitles = ['React: How to handle state in functional components?', 'android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
            });
        });
    })
}
