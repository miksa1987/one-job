import { decorate, computed, observable } from 'mobx';
import { createContext } from 'react';
import Database from '../database/database';
import UserHandler from './user';
import TodosHandler from './todos';

class TodoStore {
  currentUser = { username: '' };
  currentTodo = {};
  currentDate = new Date();
  todos = [];
  currentNotification = '';
  
  database = new Database();
  userHandler = new UserHandler(this.database);
  todosHandler = new TodosHandler(this.database);

  createAndSetUser = async (email, password, repeatPassword) => {
    try {
      this.currentUser = await this.userHandler.createAndSetUser(email, password, repeatPassword);
    }
    catch (error) {
      this.setNotification(error.message);
    }
  } 

  loginAndSetUser = async (email, password) => {
    try {
      this.currentUser = await this.userHandler.loginAndSetUser(email, password);
    }
    catch (error) {
      this.setNotification(error.message);
    }
  }

  logoutUser = async () => {
    this.currentUser = await this.userHandler.logoutUser();
  }

  getAndSetTodos = async () => {
    this.todos = await this.makeTodosObjectToArray();
  } 

  setCurrentTodo = () => {
    const filteredTodos = this.todos.filter((todo) => todo.date === this.currentDate);
    
    if (this.checkForTodo(this.currentDate)) {
      this.currentTodo = filteredTodos[0];
    }
    else {
      this.currentTodo = {date: this.currentDate, task: '', reflect: ''};
    }
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

  setUser = (user) => {
    this.currentUser = user;
  }

  setCurrentDate = (date) => {
    this.currentDate = date;
  }

  setNotification = (message) => {
    this.currentNotification = message;
    
    setTimeout(() => {
      this.setNotification('');
    }, 3000);
  }

  get user() {
    return this.currentUser;
  }
  
  get todo() {
    return this.currentTodo;
  }

  get date() {
    return this.currentDate;
  }

  get allTodos() {
    return this.todos;
  }

  get notificationIsVisible() {
    return this.notificationVisible;
  }

  get notification() {
    return this.currentNotification;
  }
}

decorate(TodoStore, {
  currentUser: observable,
  currentTodo: observable,
  currentDate: observable,
  currentNotification: observable,
  notificationIsVisible: observable,
  todos: observable,
  user: computed,
  todo: computed,
  date: computed,
  allTodos: computed,
  notification: computed,
  notificationIsVisible: computed
});

export default createContext(new TodoStore());