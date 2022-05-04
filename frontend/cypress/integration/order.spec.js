describe('render first page on app', () => {
    //the beforeEach said taht everytime a test is run first it has to execute what is in the beforeEach
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('frontpage can be opened on app can be open', () => {
        cy.contains('MENU RIKUNA')
    })

    // integration test or end to end because the user is completing a form an sending
    // TODO try to get the input element with id or placeholder
    it('Clients can create an order', () => {
        cy.get('input:first').type('empresa de prueba')
    })
});