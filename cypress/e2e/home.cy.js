describe('Homepage', () => {
  beforeEach(() => {
    cy.login(Cypress.env('login_email'), Cypress.env('login_password'))
  })

  it('has Home Selected', () => {
    cy.visit('http://localhost:3000')
    cy.get("a", { timeout: 7000 }).contains("Home").should("have.class", "router-link-active router-link-exact-active nav-link active")
  })

  it('Is Logged In', () => {
    cy.visit('http://localhost:3000')
    cy.get("h1", { timeout: 7000 }).contains("Hello end@to.end").should("have.class", "text-5xl font-bold animate-fadeIn z-10")
  })

  it('has practice button', () => {
    cy.visit('http://localhost:3000')
    cy.get("a", { timeout: 7000 }).contains("Practice").should("have.class", "nav-link")
  })

  it('has logout button', () => { 
    cy.visit('http://localhost:3000') 
    cy.get("button", { timeout: 7000 }).contains("Logout").should("have.class", "nav-link").click()
    })

  it('is logged out', () => {
    cy.visit('http://localhost:3000')
    cy.get('h2').contains('Welcome to').should('have.class', 'text-sm font-medium z-10')
    cy.get('h1').contains('PokeRacer').should('have.class', 'text-5xl font-bold z-10')
    cy.get('button').contains('Log In to Play').should('have.class', 'bg-green-600 px-8 text-sm font-medium text-gray-50 shadow hover:bg-green-700').click()
  })

})