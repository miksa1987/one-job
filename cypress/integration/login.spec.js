describe('Login and new user functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Login and new user buttons are seen', () => {
    cy.contains('Log in');
    cy.contains('New user');
    cy.contains('One job');
  });

  it('Create new user', () => {
    cy.get('#new-user').click();

    cy.get('#email').type('tester@test.com');
    cy.get('#password').type('sekret');
    cy.get('#repeat-password').type('sekret');
    
    cy.get('#create-user').click();
    cy.contains('What is your one job');
  });

  it('Log in', () => {
    cy.get('#login').click();

    cy.get('#email').type('tester@test.com');
    cy.get('#password').type('sekret');
    cy.get('#log-in').click();

    cy.contains('What is your one job');
  });

  it('Cannot log in with wrong password', () => {
    cy.get('#login').click();

    cy.get('#email').type('tester@test.com');
    cy.get('#password').type('notcorrectpassword');
    cy.get('#log-in').click();
  });
});
