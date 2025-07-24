/* global cy */
describe('Membership page', () => {
  it('upgrades a plan and calls the API', () => {
    cy.intercept('POST', '**/payments/create-checkout-session/', {
      statusCode: 200,
      body: { checkout_url: 'http://example.com' }
    }).as('checkout');

    cy.visit('/account/membership');
    cy.contains('Basic').parent().contains('Upgrade').click();
    cy.wait('@checkout');
  });
});
