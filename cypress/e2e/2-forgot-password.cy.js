import loginPage from '../support/pages/loginPage';
import forgotPasswordPage from '../support/pages/forgotPasswordPage';
import emailSentPage from '../support/pages/emailSentPage';

describe('Forgot password page', () => {
  beforeEach('Load login page.', function () {
    cy.visit('/');
  });

  it('Should render appropriate elements on forgot password page load', function () {
    //Enter username and continue
    loginPage
      .getUsername()
      .type(Cypress.env().testData.username)
      .should('have.value', Cypress.env().testData.username);
    loginPage.getContinueButton().click();

    //Click forgot password button
    loginPage.getForgotPasswordtButton().click();

    //Check url contains /reset-password
    cy.location('pathname').should('eq', '/reset-password');

    //Check E-mail input field should be empty
    forgotPasswordPage.getEmail().should('be.empty');

    //Check Sent link to email button is disabled
    forgotPasswordPage.getSendLinkButton().should('be.disabled');

    //Check back to login button exist and redirects to login page
    forgotPasswordPage.getBackToLoginButton().should('be.visible').click();
    cy.url().should('eq', Cypress.config('baseUrl'));
  });
  it('Should receive allert snackbar when wrong email format entered', function () {
    //intercept call to reset_password endpoint
    cy.intercept('POST', '**/v1/auth/reset_password').as('resetPassword');

    //Go to Forgot password page
    loginPage.getUsername().type(`${Cypress.env().testData.username}{enter}`);
    loginPage.getForgotPasswordtButton().click();

    //Enter wrong format e-mail and submit
    forgotPasswordPage
      .getEmail()
      .type(Cypress.env().testData.username)
      .should('have.value', Cypress.env().testData.username);
    forgotPasswordPage.getSendLinkButton().should('not.be.disabled').click();

    //Check that invalid data sent to BE and snackbar alert returned
    cy.wait('@resetPassword').its('response.statusCode').should('eq', 400);
    loginPage.getAlert().invoke('text').should('not.be.empty');
  });
  it('Should be able to send reset password link', function () {
    //intercept call to reset_password endpoint
    cy.intercept('POST', '**/v1/auth/reset_password').as('resetPassword');

    //Go to Forgot password page
    loginPage.getUsername().type(`${Cypress.env().testData.username}{enter}`);
    loginPage.getForgotPasswordtButton().click();

    //Empty e-mail should not be allowed
    forgotPasswordPage
      .getEmail()
      .type(Cypress.env().testData.email)
      .clear()
      .should('be.empty');
    forgotPasswordPage.getSendLinkButton().should('be.disabled');

    //Enter e-mail and submit
    forgotPasswordPage
      .getEmail()
      .type(Cypress.env().testData.email)
      .should('have.value', Cypress.env().testData.email);
    forgotPasswordPage.getSendLinkButton().should('not.be.disabled').click();

    //Check that forgot password request has been sent to BE
    cy.wait('@resetPassword').its('response.statusCode').should('eq', 200);

    //Check that Email sent page is present and button that redirects to login page exists
    emailSentPage.getHeader().should('be.visible');
    emailSentPage.getCloseButton().should('not.be.disabled').click();
    cy.url().should('eq', Cypress.config('baseUrl'));
  });
});
