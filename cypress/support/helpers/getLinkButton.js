const getLinkButton = (buttonName) => {
  return cy.contains('button', buttonName);
};

export default getLinkButton;
