export const searchBar = (initPath, destroyPath) => {

    // --------------------------------------------------------------------
    // SEARCH BAR - REGISITERED
    describe('Search bar Registered 1', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Search string in question text', () => {
            const qTitles = ['android studio save string shared preference, start activity and load the saved string'];
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();

            cy.get('#searchBar').type('navigation{enter}');
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
            })
        });

        it('Search string matches tag and text', () => {
            const qTitles = ['React: How to handle state in functional components?', 'android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();

            cy.get('#searchBar').type('navigation [React]{enter}');
            cy.wait(1000);
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
            })
        });

        it('Search no matching', () => {
            const qTitles = ['No Questions Found'];
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();

            cy.get('#searchBar').type('django [typescript]{enter}');
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
            })
        });

        it('Search and apply filter', () => {
            const qTitlesNew = ['React: How to handle state in functional components?', 'android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
            const qTitlesActive = ['React: How to handle state in functional components?', "Programmatically navigate using React router", 'android studio save string shared preference, start activity and load the saved string'];
            cy.visit('http://localhost:3000');
            cy.contains('Log In').click();
            cy.contains('Username');
            cy.contains('Password');
            cy.get('#loginUsername').type('Joji John');
            cy.get('#loginPassword').type('123');
            cy.get('#loginButton').click();

            cy.get('#searchBar').type('[javascript]{enter}');
            cy.wait(1000);
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitlesNew[index]);
            })

            cy.wait(1000);
            cy.contains('Active').click();

            cy.wait(1000);
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitlesActive[index]);
            })
        });
    })

    // --------------------------------------------------------------------
    // SEARCH BAR - UNREGISTERED
    describe('Search bar Guest 1', () => {
        beforeEach(() => {
            // Seed the database before each test
            cy.exec(initPath);
        });

        afterEach(() => {
            // Clear the database after each test
            cy.exec(destroyPath);
        });

        it('Search string in question text', () => {
            const qTitles = ['android studio save string shared preference, start activity and load the saved string'];
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();

            cy.get('#searchBar').type('navigation{enter}');
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
            })
        });

        it('Search string matches tag and text', () => {
            const qTitles = ['React: How to handle state in functional components?', 'android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();

            cy.get('#searchBar').type('navigation [React]{enter}');
            cy.wait(1000);
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
            })
        });

        it('Search no matching', () => {
            const qTitles = ['No Questions Found'];
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();

            cy.get('#searchBar').type('django [typescript]{enter}');
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitles[index]);
            })
        });

        it('Search and apply filter', () => {
            const qTitlesNew = ['React: How to handle state in functional components?', 'android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
            const qTitlesActive = ['React: How to handle state in functional components?', "Programmatically navigate using React router", 'android studio save string shared preference, start activity and load the saved string'];
            cy.visit('http://localhost:3000');
            cy.contains('Continue as Guest').click();

            cy.get('#searchBar').type('[javascript]{enter}');
            cy.wait(1000);
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitlesNew[index]);
            })

            cy.wait(1000);
            cy.contains('Active').click();

            cy.wait(1000);
            cy.get('.postTitle').each(($el, index, $list) => {
                cy.wrap($el).should('contain', qTitlesActive[index]);
            })
        });
    })
}