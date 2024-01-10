const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    env: {
      login_email: 'end@to.end',
      login_password: 'end2Endtest!'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
