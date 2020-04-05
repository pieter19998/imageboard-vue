describe('Hooks', function () {
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

    it('Create Board And Delete it', () => {
        cy.get('#board__BV_button_').click();
        cy.get('#createBoard').click();
        cy.get('#name').eq(0).type('testBoard1');
        cy.get('#description').eq(0).type('Board made for testing');
        cy.get('.btn').click();
        cy.get('tbody > :nth-child(1) > [aria-colindex="1"]');
        cy.get('#board__BV_button_').click();
        cy.get('#listBoard').click();
        cy.get(':nth-child(1) > [aria-colindex="3"] > [variant="link"] > .bi-trash').click();
        cy.get('.btn-danger').click();
    });

    it('Create Board duplicate name gives error', () => {
        cy.get('#board__BV_button_').click();
        cy.get('#createBoard').click();
        cy.get('#name').eq(0).type('testBoard2');
        cy.get('#description').eq(0).type('Board made for testing');
        cy.get('.btn').click();
        cy.get('tbody > :nth-child(1) > [aria-colindex="1"]');
        cy.get('#board__BV_button_').click();
        cy.get('#createBoard').click();
        cy.get('#name').eq(0).type('testBoard2');
        cy.get('#description').eq(0).type('Board made for testing');
        cy.get('.btn-primary').click();
        cy.get('.alert');
    });

    it('Edit Board ', () => {
        cy.get('#board__BV_button_').click();
        cy.get('#createBoard').click();
        cy.get('#name').eq(0).type('testBoard3');
        cy.get('#description').eq(0).type('text');
        cy.get('.btn').click();
        cy.get('#board__BV_button_').click();
        cy.get('#listBoard').click();
        cy.get('[href="#/board/update/testBoard3"] > .bi-pencil').click();
        cy.get('#name').eq(0).type(' updated');
        cy.get('#description').eq(0).type(' updated text');
        cy.get('.btn').click();
        cy.get('tbody > :nth-child(1) > [aria-colindex="1"]');
        cy.get('tbody > :nth-child(1) > [aria-colindex="2"]');
    });

    it('Delete Board ', () => {
        cy.visit('/');
        cy.contains('h1', 'Home');
        cy.contains('a', 'Login').click();
        cy.get('#text-username').eq(0).type('admin');
        cy.get('#text-password').eq(0).type('password');
        cy.get('.btn-primary').click();
        cy.get('#__BVID__52__BV_button_').click();
        cy.get(':nth-child(1) > .dropdown-item').click();
        cy.get(':nth-child(1) > [aria-colindex="3"] > [variant="link"] > .bi-trash').click();
        cy.get('.btn-danger').click();
    });

    it('see Board', () => {
        cy.visit('/');
        cy.contains('h1', 'Home');
        cy.contains('a', 'Login').click();
        cy.get('#text-username').eq(0).type('admin');
        cy.get('#text-password').eq(0).type('password');
        cy.get('.btn-primary').click();
        cy.get('tbody > :nth-child(1) > [aria-colindex="3"]').click()
    });

});
