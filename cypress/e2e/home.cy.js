describe('Homepage', () => {
  beforeEach(() => {
    cy.login(Cypress.env('login_email'), Cypress.env('login_password'))
  })
  it('has Home Selected', () => {
    cy.visit('http://localhost:3000')
    cy.get("a").contains("Home").should("have.class", "router-link-active router-link-exact-active nav-link active")
  })

  it('is Logged In as EndToEnd', () => {
  cy.visit('http://localhost:3000')
  cy.get("button", { timeout: 20000 }).contains("end@to.end")
  })

  it('has Logout', () => {
    cy.visit('http://localhost:3000')
    cy.get("button", { timeout: 20000 }).contains("Logout")
  })

  it('Logging Out', () => {
    cy.visit('http://localhost:3000')
    cy.get("button", { timeout: 20000 }).contains("Logout").click()
    cy.get("button").contains("Login / Sign Up")
  })
})