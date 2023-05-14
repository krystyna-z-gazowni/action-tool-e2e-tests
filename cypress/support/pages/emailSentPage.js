import getText from '../helpers/getText';
import getLinkButton from '../helpers/getLinkButton';

const getHeader = () => {
  return getText({ text: 'Email Sent' });
};

const getCloseButton = () => {
  return getLinkButton('Close');
};

export default {
  getHeader,
  getCloseButton,
};
