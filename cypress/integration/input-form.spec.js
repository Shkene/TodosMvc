describe('TOodoMvc-Test', () => {
 const todo_one = 'Buy some cheese'
 const todo_two = 'Feed the cat'
 const todo_three = 'Go to the gym'
 const new_todo = 'new todo'
 beforeEach(() => {
   cy
   .visit('http://localhost:8888')
  })

  context('Opening page', () => {
    it('Focus on input', () =>{
      cy
      .focused()
      .should('have.class', 'new-todo')
    })
  })
  context('No Todos', () =>{
    it('should hide #main and #footer', () =>{
      cy
      .get('.todo-list li').should('not.exist')
      .get('.main').should('not.exist')
      .get('.footer').should('not.exist')
    })
  })
  context('New todo', () => {
     it('Allow new items', () => {
       cy
       .get('.new-todo').type(todo_one).type('{enter}')
       .get('.todo-list li')
       .eq(0)
       .find('label').should('contain', todo_one)
       .get('.new-todo').type(todo_two).type('{enter}')
       .get('.todo-list li')
       .eq(1)
       .find('label').should('contain', todo_two)
     })
     it('Should clear input after add', () => {
        cy
        .get('.new-todo').type(todo_one).type('{enter}')
        .get('.new-todo').should('have.text','')
     })
     it('should append new items to the bottom of the list', () =>{

       cy
       .createDefaultTodos().as('todos')
       .get('.todo-count').contains('3 items left')
       .get('@todos')
       .eq(0)
       .find('label').should('contain', todo_one)
       .get('@todos')
       .eq(1)
       .find('label').should('contain', todo_two)
       .get('@todos')
       .eq(2)
       .find('label')
       .should('contain', todo_three)
     })
     it('should trim text input', () =>{

      cy
      .createTodo('    ' + todo_one + '    ')
      .get('.todo-list li')
      .eq(0).should('have.text', todo_one)
  })

  it('should show #main and #footer when items added', () =>{
     cy
     .createTodo(todo_one)
     .get('.main').should('be.visible')
     .get('.footer').should('be.visible')
  })
  it('add new todos', () =>{
     cy
     .get('.new-todo')
     .type(todo_one).type('{enter}')
     .type(todo_two).type('{enter}')
     .type(todo_three).type('{enter}')
     .get('.todo-count').contains('3 items left')

  })
  })
  context('complete todo', () =>{
    it('Should complete added item', () => {
      cy
      .get('.new-todo').type(todo_one).type('{enter}')
      .get('.toggle').click()
      .get('.todo-list li').should('have.class', 'completed')
      .get('.todo-count').contains('0 items left')
      })

    it('Should clear one completed item', () => {
      cy
      .get('.new-todo').type(todo_one).type('{enter}')
      .get('.toggle').click()
      .get('.todo-list li').should('have.class', 'completed')
      .get('.destroy').click({force:true})
        })

    it('Should clear all completed items', () => {
      cy
      .get('.new-todo').type(todo_one).type('{enter}')
      .get('.new-todo').type(todo_two).type('{enter}')
      .get('.toggle').click({multiple:true})
      .get('.todo-list li').should('have.class', 'completed')
      .get('.clear-completed').click()
        })

     it('Should not be active if is completed', () => {
       cy
       .get('.new-todo')
       .type(todo_one).type('{enter}')
       .get('.toggle').click()
       .get('.todo-list li').should('have.class', 'completed').and('not.have.class','selected')
     })
     it('Should toglle all items', () => {
       cy
       .get('.new-todo').type(todo_one).type('{enter}')
       .get('.new-todo').type(todo_two).type('{enter}')
       .get('.new-todo').type(todo_two).type('{enter}')
       .get('.toggle-all').click()
       .get('.todo-count').contains('0 items left')
     })

  })
   context('Edit todo', () =>{
      it('edit one todo', () => {
         cy
         .get('.new-todo').type(todo_three).type('{enter}')
         .get('.view')
         .as('firstTodo')
         .find('label').dblclick()
         .get('.edit')
         .clear()
         .type(new_todo).type('{enter}')
         .get('.todo-list li')
         .find('label').contains(new_todo)

      })

   })


 })
