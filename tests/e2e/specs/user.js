// https://docs.cypress.io/api/introduction/api.html

xit('Register', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Register').click();
    // cy.get('.').eq(0).type('u').should('have.value', 'u');
    cy.get('#username').eq(0).type('testUser');
    cy.get('#email').eq(0).type('email@testuseremail.com');
    cy.get('#radio-group-1').click();
    cy.get('#date').eq(0).type('1999-10-10');
    cy.get('#password').eq(0).type('password');
    cy.get('#passwordRepeat').eq(0).type('password');
    cy.get('.btn-primary').click();
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Log out').click();
});

xit('User Login', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Login').click();
    // cy.get('.').eq(0).type('u').should('have.value', 'u');
    cy.get('#text-username').eq(0).type('Admin');
    cy.get('#text-password').eq(0).type('password');
    cy.get('.btn-primary').click();
    cy.contains('h1', 'Home');
    cy.contains('a', 'Log out').click();
});

xit('User edit', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Login').click();
    // cy.get('.').eq(0).type('u').should('have.value', 'u');
    cy.get('#text-username').eq(0).type('Admin');
    cy.get('#text-password').eq(0).type('password');
    cy.get('.btn-primary').click();
    cy.contains('a', 'Profile').click();
    cy.get('#email').eq(0).clear();
    cy.get('#email').eq(0).type('newemail@testuseremail.com');
    cy.get('.btn-primary').click();
    cy.contains('a', 'Profile').click();
    cy.get('.btn-primary').click();
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Log out').click();
});

it('User delete', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Login').click();
    // cy.get('.').eq(0).type('u').should('have.value', 'u');
    cy.get('#text-username').eq(0).type('Admin');
    cy.get('#text-password').eq(0).type('password');
    cy.get('.btn-primary').click();
    cy.contains('a', 'Profile').click();
    cy.get('.btn-primary').click();
    cy.contains('a', 'Profile').click();
    cy.get('.btn-danger').click();
    cy.get('.bi-trash b-icon bi').click();

    // cy.visit('/');
    // cy.contains('h1', 'Home');
    // cy.contains('a', 'Log out').click();
});
