import loginPage from '../support/pages/loginPage';

describe('Login Page', () => {
  beforeEach('Load login page.', function () {
    cy.visit('/');
  });

  it('Should render appropriate elements on login page load', function () {
    //Check that there should be 2SVG logos on the page
    loginPage.getSvgElements().should('have.length', 2);

    //Check Username input field should be empty
    loginPage.getUsername().should('be.empty');

    //Check Continue button is disabled
    loginPage.getContinueButton().should('be.disabled');

    //Check Remember me checkbox is unchecked
    loginPage.getCheckBox().should('not.be.checked');

    //Check that link to US patent exist on the page
    loginPage
      .getPatentLink()
      .should('be.visible')
      .and(
        'have.attr',
        'href',
        'https://patentscope.wipo.int/search/en/detail.jsf?docId=US279853724&docAn=16024519'
      );
  });
  it('Should be able to enter username, password and submit.', function () {
    //intercept call to login endpoint
    cy.intercept('POST', '**/v1/auth/login').as('login');

    //Empty username should not be allowed
    loginPage
      .getUsername()
      .type(Cypress.env().testData.username)
      .clear()
      .should('be.empty');
    loginPage.getContinueButton().should('be.disabled');

    //Enter username
    loginPage
      .getUsername()
      .type(Cypress.env().testData.username)
      .should('have.value', Cypress.env().testData.username);

    //Check Continue button is enabled and click it
    loginPage.getContinueButton().should('not.be.disabled').click();

    //Entered Username should persist
    loginPage
      .getUsername()
      .should('have.value', Cypress.env().testData.username);

    //Check Submit button is disabled
    loginPage.getSubmitButton().should('be.disabled');

    //Check Forgot Password button is present
    loginPage.getForgotPasswordtButton().should('be.visible');

    //Check Change Username button is present
    loginPage.getChangeUsernameButton().should('be.visible');

    //Empty password should not be allowed
    loginPage
      .getPassword()
      .type(Cypress.env().testData.password)
      .clear()
      .should('be.empty');
    loginPage.getSubmitButton().should('be.disabled');

    //Enter password and submit
    loginPage
      .getPassword()
      .type(Cypress.env().testData.password)
      .should('have.value', Cypress.env().testData.password);
    loginPage.getSubmitButton().should('not.be.disabled').click();

    //Check that for invalid credendials Forbidden and snackbar alert returned
    cy.wait('@login').its('response.statusCode').should('eq', 403);
    loginPage.getAlert().invoke('text').should('not.be.empty');
  });
  it('Should be able change username.', function () {
    //Enter username and continue
    loginPage.getUsername().type(`${Cypress.env().testData.username}{enter}`);

    //Click Change Username button
    loginPage.getChangeUsernameButton().click();

    //Login screen should be loaded:
    //1. Username input field should be present and cleaned
    loginPage.getUsername().should('be.visible').and('be.empty');
    //2. Check Continue button is disabled
    loginPage.getContinueButton().should('be.disabled');
    //3. Password input field should not exist
    loginPage.getPassword().should('not.exist');
    //4. Submit button should not exist
    loginPage.getSubmitButton().should('not.exist');
    //5. Forgot Password button should not exist
    loginPage.getForgotPasswordtButton().should('not.exist');
    //6. Change Username button should not exist
    loginPage.getChangeUsernameButton().should('not.exist');
    //7. Should be able to enter new username
    loginPage
      .getUsername()
      .type(Cypress.env().testData.changedUsername)
      .should('have.value', Cypress.env().testData.changedUsername);
    loginPage.getContinueButton().should('not.be.disabled').click();
    loginPage
      .getUsername()
      .should('have.value', Cypress.env().testData.changedUsername);
  });
  it('Should persist username when Remember me checkbox checked.', function () {
    //Enter username and check Remember me checkbox
    loginPage.getUsername().type(Cypress.env().testData.username);
    loginPage.getCheckBox().check().should('be.checked');
    //Check that FOCAL_AT_USERNAME is set to entered username
    cy.getCookie('FOCAL_AT_USERNAME').should(
      'have.property',
      'value',
      Cypress.env().testData.username
    );
    //Reload page and check that entered username persists
    cy.reload();
    loginPage
      .getUsername()
      .should('have.value', Cypress.env().testData.username);
    //Uncheck Remember me checkbox
    loginPage.getCheckBox().click().should('not.be.checked');
    //Check that FOCAL_AT_USERNAME is empty
    cy.getCookie('FOCAL_AT_USERNAME').should('have.property', 'value', '');
    //Reload page and check that Username input field is empty
    cy.reload();
    loginPage.getUsername().should('be.empty');
  });
});
