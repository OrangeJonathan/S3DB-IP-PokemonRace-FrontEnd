describe('Practice', () => {
  beforeEach(() => {
    cy.login(Cypress.env('login_email'), Cypress.env('login_password'))
  })
  it('has Practice Selected', () => {
    cy.visit('http://localhost:3000/practice')
    cy.get("a", { timeout: 7000 }).contains("Practice").click().should("have.class", "router-link-active router-link-exact-active nav-link active")
  })
  it('time left is 1 minute', () => {
    cy.visit('http://localhost:3000/practice')
    cy.get("a", { timeout: 7000 }).contains("Practice").click()
    cy.get("p", { timeout: 7000 }).contains("1:00").should("have.class", "text-white text-xl text-center")
  })
  it('change time to 2 minutes', () => {
    cy.visit('http://localhost:3000/practice')
    cy.get("a", { timeout: 7000 }).contains("Practice").click()
    cy.get('.rounded-l-lg > .inline-block > :nth-child(4) > #option-3').check();
    cy.get("p", { timeout: 7000 }).contains("2:00").should("have.class", "text-white text-xl text-center")
  })
  it('change time to 15 seconds', () => {
    cy.visit('http://localhost:3000/practice')
    cy.get("a", { timeout: 7000 }).contains("Practice").click()
    cy.get('.rounded-l-lg > .inline-block > :nth-child(1) > #option-0').check();
    cy.get("p", { timeout: 7000 }).contains("00:15").should("have.class", "text-white text-xl text-center")
  })
  it('change generation to 1', () => {
    cy.visit('http://localhost:3000/practice')
    cy.get("a", { timeout: 7000 }).contains("Practice").click()
    cy.get('.rounded-r-lg > .inline-block > :nth-child(2) > #option-1').check().should("have.value", "1");
    cy.get('.rounded-r-lg > .inline-block > :nth-child(2) > #option-1').check().should("be.checked");
  })
})