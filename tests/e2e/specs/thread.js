describe('Thread', function () {

    before(function () {
        cy.visit('/');
        cy.contains('h1', 'Home');
        cy.contains('a', 'Login').click();
        cy.get('#text-username').eq(0).type('admin');
        cy.get('#text-password').eq(0).type('password');
        cy.get('.btn-primary').click();
        cy.get('#board__BV_button_').click();
        cy.get('#createBoard').click();
        cy.get('#name').eq(0).type('testBoard1');
        cy.get('#description').eq(0).type('Board made for testing');
        cy.get('.btn').click();
        cy.contains('a', 'Log out').click();
    });

    after(function () {
        // runs once after all tests in the block
    });

    beforeEach(function () {
        cy.visit('/');
        cy.contains('h1', 'Home');
        cy.contains('a', 'Login').click();
        cy.get('#text-username').eq(0).type('admin');
        cy.get('#text-password').eq(0).type('password');
        cy.get('.btn-primary').click();
    });

    afterEach(function () {
        cy.contains('a', 'Log out').click();
    });

   it('create Thread', () => {
        cy.visit('/');
        cy.get('tbody > tr > [aria-colindex="3"]').click()
        cy.get('.btn').click()
        cy.get('#title').eq(0).type('testThread');
        cy.get('#text').eq(0).type('testThread Description');
        cy.get('#create').click()
        cy.get(':nth-child(1) > .container > .card > :nth-child(2)')
    });

    it('update Thread', () => {
        cy.visit('/');
        cy.get('tbody > tr > [aria-colindex="3"]').click()
        cy.get('.bi-pencil').click()
        cy.get('#title').eq(0).type('testThread2');
        cy.get('#text').eq(0).type('testThread Description2');
        cy.get('#update').click()
        cy.get(':nth-child(1) > .container > .card > :nth-child(2)')
    });

    it('delete Thread', () => {
        cy.visit('/');
        cy.get('tbody > tr > [aria-colindex="3"]').click()
        cy.get('.bi-trash').click()
        cy.get('.bi-trash').click()
        cy.get('.btn-danger').click()
        cy.get(':nth-child(1) > .container > .card > :nth-child(2)')
    });
});
