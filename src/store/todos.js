export default class TodosHandler {
  constructor(database) {
    this.database = database;
  }


  getAndSetTodos = async (uid) => {
    return await this.makeTodosObjectToArray();
  } 
  
  setCurrentTodo = (todos, currentDate) => {
    const filteredTodos = todos.filter((todo) => todo.date === currentDate);
    let currentTodo = { date: currentDate, task: '', reflect: '' };

    if (this.checkForTodo(currentDate)) {
      currentTodo = filteredTodos[0];
    }
    
    return currentTodo;
  }
  
  checkForTodo = (todos, currentDate) => {
    let found = false;
    todos.forEach((todo) => {
      if (todo.date === currentDate) {
        found = true;
      }
    });
    
    return found;
  }
  
  makeTodosObjectToArray = async (uid) => {
    const todosObject = await this.database.getTodos(uid);
    let todos = [];
    const todosObjectKeys = Object.keys(todosObject);
  
    todosObjectKeys.forEach((key) => {
      todos.push({ ...todosObject[key], key: key });
    })
  
    return todos;
  }
  
  saveTodo = async (todoData, key) => {
    this.database.saveTodo(todoData, key);
  }
}