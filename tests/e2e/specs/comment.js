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
        cy.get('#name').eq(0).type('testBoardComments');
        cy.get('#description').eq(0).type('Board made for testing');
        cy.get('.btn').click();
        cy.visit('/');
        cy.get('tbody > tr > [aria-colindex="3"]').click();
        cy.get('.btn').click();
        cy.get('#title').eq(0).type('testThreadComments');
        cy.get('#text').eq(0).type('testThread for Comments');
        cy.get('#create').click();
        cy.get(':nth-child(1) > .container > .card > :nth-child(2)');


        cy.contains('a', 'Log out').click();
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

    it('create Comment', () => {
        cy.visit('/');
        cy.get('tbody > tr > [aria-colindex="3"]').click();
        cy.get('#threadDetail').click();
        cy.get('.btn').click();
        cy.get('#text').eq(0).type('comment text');
        cy.get('.btn').click();
        cy.get('.col-md-4 > .container > .card > .card-body');
    });

    it('update Comment', () => {
        cy.visit('/');
        cy.get('tbody > tr > [aria-colindex="3"]').click();
        cy.get('#threadDetail').click();
        cy.get('#commentUpdate').click();
        cy.get('#text').eq(0).type('comment text update');
        cy.get('.btn').click();
        cy.get('.col-md-4 > .container > .card > .card-body');
    });

    it('delete Comment', () => {
        cy.visit('/');
        cy.get('tbody > tr > [aria-colindex="3"]').click();
        cy.get('#commentView').click();
        cy.get('.bi-trash').click();
        cy.get('.bi-trash').click();
        cy.get('.btn-danger > .bi-trash').click()
    });
});
