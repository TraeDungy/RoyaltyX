/* global cy */
describe('Login flow', () => {
  it('allows a user to log in', () => {
    cy.intercept('POST', '**/authentication/token/', {
      statusCode: 200,
      body: { access: 'fake-token', refresh: 'refresh-token' }
    }).as('loginRequest');

    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password');
    cy.contains(/log in/i).click();
    cy.wait('@loginRequest');
  });
});
