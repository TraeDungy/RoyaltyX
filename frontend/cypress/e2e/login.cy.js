/* global cy */

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders the login form', () => {
    cy.contains('Sign in to your account');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.contains('Log In');
  });

  it('shows error on invalid credentials', () => {
    cy.intercept('POST', '**/authentication/token/', {
      statusCode: 401,
      body: { detail: 'Invalid credentials' }
    }).as('loginRequest');

    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('badpass');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.contains('Invalid credentials');
  });
});
