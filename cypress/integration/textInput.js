describe('New Todo', function(){
  beforeEach(function(){
  cy.visit('http://localhost:8888')
})

    it('should allow me to add todo items', function(){
      cy.get('.new-todo').type('Kupi sira jebem li ti seme').type('{enter}')
      cy.get('.todo-list li').eq(0).find('label').should('contain', 'Kupi sira jebem li ti seme')

 })

})
