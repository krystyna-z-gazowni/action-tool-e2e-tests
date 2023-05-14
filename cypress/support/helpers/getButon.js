const getButton = (buttonId) => {
  return cy.get(`button[data-testid="${buttonId}"]`);
};

export default getButton;
