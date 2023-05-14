import getButton from '../helpers/getButon';
import getLinkButton from '../helpers/getLinkButton';
import getInputFieldById from '../helpers/getInputFieldById';
import getAlert from '../helpers/getAlert';

const getSvgElements = () => {
  return cy.get('svg#Layer_1');
};

const getUsername = () => {
  return getInputFieldById('realm-form-username');
};

const getPassword = () => {
  return getInputFieldById('login-form-password');
};

const getContinueButton = () => {
  return getButton('realm-submit-button');
};

const getSubmitButton = () => {
  return getButton('login-submit-button');
};

const getForgotPasswordtButton = () => {
  return getLinkButton('Forgot your password?');
};

const getChangeUsernameButton = () => {
  return getLinkButton('Change username');
};

const getCheckBox = () => {
  return cy.get('[data-testid="CheckBoxOutlineBlankIcon"]').siblings('input');
};

const getPatentLink = () => {
  return cy.get('div').find('[href]');
};

export default {
  getSvgElements,
  getContinueButton,
  getSubmitButton,
  getForgotPasswordtButton,
  getChangeUsernameButton,
  getUsername,
  getPassword,
  getCheckBox,
  getPatentLink,
  getAlert,
};
