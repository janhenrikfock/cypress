/// <reference types="cypress" />

describe('Our first suite', () => {
  it('first test', () => {
    //tell cypress which page to open and run the test | extends the baseUrl provided in cypress.json
    cy.visit('/')
    // Tell cypress how to navigate to the element we want to test:
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // These selectors will find ALL elements on the Page with the fitting criteria
    //by Tag name
    cy.get('input')

    //by id with id-selector #
    cy.get('#inputEmail1')

    //by className with classSelector .
    cy.get('.input-full-width')

    //by Attribute-name
    cy.get('[placeholder]')

    //by Attribute name and value
    cy.get('[placeholder="Email"]')

    //by class value | here you have to provide the entire string as value as opposed to just one class with className selector
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by tagname attribute with value
    cy.get('input[placeholder="Email"]')

    //by two different attributes FAILS
    cy.get('[placeholder="Email"][type="email"]')

    //find element by tagname attribute with value, ID and className
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

    //the most recommended way by cypress
    cy.get('[data-cy="imputEmail1"]')
  })

  it('every selector', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')
    // .contains will only find the first element of the page with the fitting criteria, and then will stop looking.
    cy.contains('Sign in')
    //To make sure we find the correct element, .contais can take two parameters:
    cy.contains('[status="warning"]', 'Sign in')
    // identifying the correct button by selecting a unique element, selecting the parent und then find() the only button in the parentform
    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()
    // Find "nb-card" which contains "Horizontal form" and within the nb-card find the child with "type="email""
    // The nb-card is the first common parent of the headline "Horizontal form" and the element with ""type="email"
    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
  })

  it('then and wrap methods', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // cy.contains('nb-card', 'Using the Grid')
    //   .find('[for="inputEmail1"]')
    //   .should('contain', 'Email')

    // cy.contains('nb-card', 'Using the Grid')
    //   .find('[for="inputPassword2"]')
    //   .should('contain', 'Password')

    // cy.contains('nb-card', 'Basic form')
    //   .find('[for="exampleInputEmail1"]')
    //   .should('contain', 'Email address')

    // cy.contains('nb-card', 'Basic form')
    //   .find('[for="exampleInputPassword1"]')
    //   .should('contain', 'Password')

    cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then((secondForm) => {
        // In this arrowfunction the object is a jQuery object (Hover over the find method It shows jQuery object). That is why we can use const and .expect() instead of .should(), which is cypress context
        const passwordSecondtext = secondForm
          .find('[for="exampleInputPassword1"]')
          .text()
        expect(passwordLabelFirst).to.equal(passwordSecondtext)
        // To use secondForm as a cypress object we can use cy.wrap() (Hover over the find method. It shows cypress object). That way cypress-syntax like .should() is available again. Saving smth. in a const however is not possible anymore.
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should('contain', 'Password')
      })
    })
  })
  it.only('invoke command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    // option 1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
    // option 2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal('Email address')
      // option 3 with invoke
      cy.get('[for="exampleInputEmail1"]').invoke()
    })
  })
})
