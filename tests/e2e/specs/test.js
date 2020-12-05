// https://docs.cypress.io/api/introduction/api.html

describe('Rendering', () => {
  it('Renders the Sidebar and MapDisplay', () => {
    cy.visit('/')
    cy.get('[data-cy="sidebar"]').should('exist')
    cy.get('[data-cy="map-display"]').should('exist')
  })
})

describe('Filter form', () => {
  it('Allows the user to fill out the filter form and filters the displayed map markers', () => {
    cy.visit('/')
    cy.get('[data-cy="sidebar__input--stage"]')
      .type('Other')
    cy.get('[data-cy="sidebar__input--status"]')
      .type('Possible')
      .type('{enter}')
    cy.get('[data-cy="map-display__marker"]')
      .should('have.length', 4)
  })
})
