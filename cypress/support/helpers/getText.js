const getText = ({ text, name = 'h6' }) => {
  return cy.contains(name, text);
};

export default getText;
