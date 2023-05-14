const getInputFieldById = (id) => {
  return cy.get(`input#${id}`);
};

export default getInputFieldById;
