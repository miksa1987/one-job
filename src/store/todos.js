import { observable, decorate } from 'mobx';
import { getHoursAndMinutesFromTodo } from '../util/todoHelper';
import moment from 'moment';

class TodosHandler {
  todos = [];
  currentTodo = {};
  todoTimePassed = false;
  
  constructor(database) {
    this.database = database;
  }

  getAndSetTodos = async (userId) => {
    this.todos = await this.makeTodosObjectToArray(userId);
  } 

  setCurrentTodo = (date) => {
    this.isLoading = true;
    const filteredTodos = this.todos.filter((todo) => todo.date === date);
    if (this.checkForTodo(date)) {
      this.currentTodo = filteredTodos[0];
    }
    else {
      this.currentTodo = {date: date, task: '', reflect: ''};
    }
    this.isLoading = false;
  }

  checkForTodo = (date) => {
    let found = false;
    this.todos.forEach((todo) => {
      if (todo.date === date) {
        found = true;
      }
    });
    
    return found;
  }

  makeTodosObjectToArray = async (userId) => {
    const todosObject = await this.database.getTodos(userId);
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

  seeIfTodoTimeIsPassed = (date) => {
    const [ hours, minutes ] = getHoursAndMinutesFromTodo(this.currentTodo);
    const currentTime = moment();
    const todoTimeString = `${date}-${hours}-${minutes}`;
    const todoTime = moment(todoTimeString, 'YYYY-MM-DD-H-m');

    if (todoTime.isAfter(currentTime)) {
      this.todoTimePassed = false;
    }
    else {
      this.todoTimePassed = true;
    }
  }

  getCurrentTodo = () => this.currentTodo;
  getAllTodos = () => this.todos;
  getTodoTimePassed = () => this.todoTimePassed;
}

decorate(TodosHandler, {
  currentTodo: observable,
  todos: observable,
  todoTimePassed: observable
});

export default TodosHandler;