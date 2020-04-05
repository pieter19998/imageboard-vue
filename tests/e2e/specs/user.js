// https://docs.cypress.io/api/introduction/api.html

it('Register', () => {
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

it('User Login', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Login').click();
    // cy.get('.').eq(0).type('u').should('have.value', 'u');
    cy.get('#text-username').eq(0).type('testUser');
    cy.get('#text-password').eq(0).type('password');
    cy.get('.btn-primary').click();
    cy.contains('h1', 'Home');
    cy.contains('a', 'Log out').click();
});

it('User edit', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Login').click();
    // cy.get('.').eq(0).type('u').should('have.value', 'u');
    cy.get('#text-username').eq(0).type('testUser');
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
    cy.get('#text-username').eq(0).type('testUser');
    cy.get('#text-password').eq(0).type('password');
    cy.get('.btn-primary').click();
    cy.contains('a', 'Profile').click();
    cy.get('.btn-primary').click();
    cy.contains('a', 'Profile').click();
    cy.get('.action').click()
    cy.get('#info-modal___BV_modal_footer_ > .btn-danger > .bi-trash').click()
});

it('Unique username', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Register').click();
    cy.get('#username').eq(0).type('testUser222');
    cy.get('#email').eq(0).type('email@testuseremail.com');
    cy.get('#radio-group-1').click();
    cy.get('#date').eq(0).type('1999-10-10');
    cy.get('#password').eq(0).type('password');
    cy.get('#passwordRepeat').eq(0).type('password');
    cy.get('.btn-primary').click();
    cy.get('.alert');
    cy.visit('/');
    cy.contains('h1', 'Home');
});

it('Unique email', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
    cy.contains('a', 'Register').click();
    cy.get('#username').eq(0).type('testUser');
    cy.get('#email').eq(0).type('email@testuseremail.com');
    cy.get('#radio-group-1').click();
    cy.get('#date').eq(0).type('1999-10-10');
    cy.get('#password').eq(0).type('password');
    cy.get('#passwordRepeat').eq(0).type('password');
    cy.get('.btn-primary').click();
    cy.get('.alert');
    cy.visit('/');
    cy.contains('h1', 'Home');
});
