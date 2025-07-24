/* global cy */

describe("Home page", () => {
  it("loads successfully", () => {
    cy.visit("/");
    cy.contains("Kitchen");
  });
});
