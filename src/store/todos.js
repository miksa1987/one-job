export default class TodosHandler {
  todos = [];
  
  constructor(database) {
    this.database = database;
  }

  getAndSetTodos = async () => {
    return await this.makeTodosObjectToArray();
  }

  setCurrentTodo = () => {
    this.isLoading = true;
    const filteredTodos = this.todos.filter((todo) => todo.date === this.currentDate);
    
    if (this.checkForTodo(this.currentDate)) {
      this.currentTodo = filteredTodos[0];
    }
    else {
      this.currentTodo = {date: this.currentDate, task: '', reflect: ''};
    }
    this.isLoading = false;
    return this.currentTodo;
  }

  checkForTodo = () => {
    let found = false;
    this.todos.forEach((todo) => {
      if (todo.date === this.currentDate) {
        found = true;
      }
    });
    
    return found;
  }

  makeTodosObjectToArray = async () => {
    const todosObject = await this.database.getTodos(this.currentUser.uid);
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