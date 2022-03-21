describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Simple CRM')

  })
})

describe('should navigate to user', () => {
  it('navigates to route /user', () => {
    cy.visit('http://localhost:4200')
    cy.server()
    cy.route('/user/')

  })
})

describe('click Button', () => {
  it('clicks Button add user', () => {
    cy.visit('http://localhost:4200/user')

    cy.get('#btn').click()

  })
})
