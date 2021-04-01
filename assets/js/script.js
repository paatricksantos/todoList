const vm = new Vue({
  el: "#app",
  data:{
    textTodo: '',
    todos: [],
    selected: ''
  },
  watch:{
    selected(){
      const todos = document.querySelector('.todo-list').childNodes;

      todos.forEach(todo => {
        switch(this.selected){
          case 'all':
            todo.style.display = 'flex'
            break
          case 'completed':
            if(todo.classList.contains('completed')){
              todo.style.display = 'flex'
            }else{
              todo.style.display = 'none'
            }
            break
          case 'uncompleted':
            if(todo.classList.contains('completed')){
              todo.style.display = 'none'
            }else{
              todo.style.display = 'flex'
            }
            break
        }
      })
    }
  },
  methods:{
    addTodo(){
      if(this.textTodo !== ''){
        this.todos.push(this.textTodo)
        this.addTodoStorage(this.textTodo)
        this.textTodo = '' 
      }
    },
    completed({ target }){
      const todo = target.parentNode
      todo.classList.toggle('completed')
    },
    removeTodo({ target }){
      const todo = target.parentNode
      todo.classList.add('fall')
      setTimeout(() => {
        todo.remove()
      }, 500)
      this.removeTodoStorage(target.parentNode.innerText)
    },
    addTodoStorage(todo){
      let todos;
      
      if(localStorage.getItem('todos') === null){
        todos = []
      }else{
        todos = JSON.parse(localStorage.getItem('todos'))
      }
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos))
    },
    getTodoStorage(){
      let todos = localStorage.getItem('todos');
      todos = JSON.parse(todos);
      if(todos !== null){
        todos.forEach(todo => {
          this.todos.push(todo)
        })
      }
    },
    removeTodoStorage(index){
      let todos = localStorage.getItem('todos');
      todos = JSON.parse(todos)

      index = todos.indexOf(index);
      todos.splice(index, 1);

      localStorage.setItem('todos', JSON.stringify(todos))
    }
  },
  created(){
    window.addEventListener('DOMContentLoaded', this.getTodoStorage)
  }
  
})
