describe('Practice Form Automation', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });
  it('Fills and submits the form', () => {
    cy.visit('https://demoqa.com/automation-practice-form');

    // Remove ads/footers that might block clicks
    cy.get('footer').invoke('remove');
    cy.get('#fixedban').invoke('remove');

    // Name and email
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#userEmail').type('john.doe@example.com');

    // Gender
    cy.contains('label', 'Male').click();

    // Mobile number
    cy.get('#userNumber').type('1234567890');

    // Date of Birth
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select('2025');
    cy.get('.react-datepicker__month-select').select('April');
    cy.contains('.react-datepicker__day', '8').click();

    // Subject
    cy.get('.subjects-auto-complete__value-container').type('Math{enter}');

    // Hobbies
    cy.contains('label', 'Sports').click();
    cy.contains('label', 'Reading').click();

    // Upload file
    cy.get('#uploadPicture').attachFile('test-picture.jpeg');

    // Address
    cy.get('#currentAddress').type('123 Cypress Lane');

  });
});