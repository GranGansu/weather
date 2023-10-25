describe('Navigation', () => {
  it('should render barcelona weather', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/barcelona');
    cy.get('#loading');
    // The new url should include "/about"
    cy.url().should('include', '/barcelona');
    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('Barcelona');
    cy.get('#now', { timeout: 4000 })
      .contains(/[0-9]+/g)
      .get('#loading')
      .should('not.exist');
  });
});
