describe('Todo functionality', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('#new-user').click();

    cy.get('#email').type('tester@test.com');
    cy.get('#password').type('sekret');
    cy.get('#repeat-password').type('sekret');
    
    cy.get('#create-user').click();
  });
  
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('#login').click();

    cy.get('#email').type('tester@test.com');
    cy.get('#password').type('sekret');
    cy.get('#log-in').click();
  });

  it('Can log out', () => {
    cy.get('#log-out').click();
    cy.contains('Log in');
  });

  it('Todo is saved', () => {
    cy.get('#todo-text').type('test');
    cy.get('#next-day').click();
    cy.wait(1000);

    cy.get('#previous-day').click();
    cy.get('#todo-text').contains('test');
  });

  it('Next day todo is saved', () => {
    cy.wait(1000);
    cy.get('#next-day').click();
    cy.get('#todo-text').type('another test');
    cy.get('#previous-day').click();
    cy.wait(1000);

    cy.get('#next-day').click();
    cy.get('#todo-text').contains('other test');
  });
}); 