/* global cy */

describe('My Projects', () => {
  it('lists projects and switches project', () => {
    cy.intercept('GET', '**/projects/my-projects/', {
      statusCode: 200,
      body: [
        { id: 1, name: 'First Project', description: '', users: [] },
        { id: 2, name: 'Second Project', description: '', users: [] }
      ]
    }).as('getProjects');

    cy.intercept('POST', '**/projects/switch-project/', {
      statusCode: 200,
      body: {}
    }).as('switchProject');

    cy.visit('/my-projects');
    cy.wait('@getProjects');

    cy.contains('First Project');
    cy.contains('Second Project');

    cy.contains('First Project').click();
    cy.wait('@switchProject').its('request.body').should('deep.equal', { project_id: 1 });
  });
});
