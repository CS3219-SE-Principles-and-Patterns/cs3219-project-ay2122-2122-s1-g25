describe('UI Tests for Login Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders login form', () => {
    cy.get('div.makeStyles-cardWrapper-1').should('exist')
    cy.get('form.makeStyles-form-2').should('exist')
    cy.get('span').contains('Email')
    cy.get('span').contains('Password')
    cy.get('span.MuiButton-label').contains('Login')
    cy.get('p.makeStyles-link-5').contains('Register')
    cy.get('p.makeStyles-link-5').contains('Forgot Password?')
  })
})
