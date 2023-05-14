const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'https://action.staging.focal.dev/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
