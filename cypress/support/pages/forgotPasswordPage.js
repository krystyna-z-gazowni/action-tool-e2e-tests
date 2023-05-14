import getButton from '../helpers/getButon';
import getLinkButton from '../helpers/getLinkButton';
import getInputFieldById from '../helpers/getInputFieldById';
import getAlert from '../helpers/getAlert';

const getEmail = () => {
  return getInputFieldById('password-reset-form-password');
};

const getSendLinkButton = () => {
  return getButton('password-reset-submit-button');
};

const getBackToLoginButton = () => {
  return getLinkButton('Back to login');
};

export default {
  getEmail,
  getSendLinkButton,
  getBackToLoginButton,
  getAlert,
};
