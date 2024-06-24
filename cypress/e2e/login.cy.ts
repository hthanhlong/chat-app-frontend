describe('Should login successfully', async () => {
  it('passes', () => {
    cy.viewport(1920, 1240)
    cy.visit('http://localhost:5173/')
    cy.get('input[name="username"]').type('guest_1')
    cy.get('input[name="password"]').type('Password123')
    cy.get('button').contains('Sign in').click()
  })
})
