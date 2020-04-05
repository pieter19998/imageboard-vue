xit('Create Board', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Login').click();
    cy.get('#text-username').eq(0).type('admin');
    cy.get('#text-password').eq(0).type('password');
    cy.get('.btn-primary').click();
    cy.visit('/board');
    cy.get('.bi-trash b-icon bi').eq(0)
    // cy.contains('a', 'BoardsCreate').click();
    // cy.visit('/');
    // cy.contains('h1', 'Home');
    // cy.contains('a', 'Log out').click();

});

it('see Board', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Login').click();
    cy.get('#text-username').eq(0).type('admin');
    cy.get('#text-password').eq(0).type('password');
    cy.get('.btn-primary').click();
    cy.visit('/board');
    cy.get('td').eq(0)
    // cy.contains('a', 'BoardsCreate').click();
    // cy.visit('/');
    // cy.contains('h1', 'Home');
    // cy.contains('a', 'Log out').click();

});

