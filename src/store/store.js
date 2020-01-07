import { decorate, computed, observable } from 'mobx';
import { createContext } from 'react';
import Database from '../database/database';
import UserHandler from './user';
import TodosHandler from './todos';
import DateHandler from './date';

class TodoStore {
  currentUser = { username: '' };
  currentTodo = {};
  currentDate = new Date();
  todos = [];
  currentNotification = '';
  isLoading = false;
  
  database = new Database();
  userHandler = new UserHandler(this.database);
  todosHandler = new TodosHandler(this.database);
  dateHandler = new DateHandler();

  handleOperation = async (operation) => {
    try {
      this.isLoading = true;
      await operation();
      setTimeout(() => {
        this.isLoading = false;
      }, 50);
    }
    catch (error) {
      this.setNotification(error.message);
    }
  }

  createAndSetUser = async (email, password, repeatPassword) => {
    await this.handleOperation(async () => {
      this.currentUser = await this.userHandler.createAndSetUser(email, password, repeatPassword);
    })
  } 

  loginAndSetUser = async (email, password) => {
    await this.handleOperation(async () => {
      this.currentUser = await this.userHandler.loginAndSetUser(email, password);
    });
  }

  logoutUser = async () => {
    this.currentUser = await this.userHandler.logoutUser();
    this.setNotification('You have logged out.');
  }

  setUser = (user) => {
    this.currentUser = user;
  }

  getAndSetTodos = async () => {
    await this.handleOperation(async () => {
      this.todos = await this.makeTodosObjectToArray();
    });
  } 

  setCurrentTodo = () => {
    this.isLoading = true;
    const date = this.dateHandler.getCurrentDate();
    const filteredTodos = this.todos.filter((todo) => todo.date === date);
    console.log(date)
    if (this.checkForTodo(date)) {
      this.currentTodo = filteredTodos[0];
    }
    else {
      this.currentTodo = {date: date, task: '', reflect: ''};
    }
    this.isLoading = false;
  }

  checkForTodo = () => {
    let found = false;
    this.todos.forEach((todo) => {
      if (todo.date === this.dateHandler.getCurrentDate()) {
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

  setCurrentDate = (date) => this.dateHandler.setDate(date);
  setNextDayDate = () => this.dateHandler.nextDay();
  setPreviousDayDate = () => this.dateHandler.previousDay();
  setCurrentDayDate = () => this.dateHandler.currentDay();

  setNotification = (message) => {
    this.currentNotification = message;
    
    setTimeout(() => {
      this.setNotification('');
    }, 3000);
  }

  setLoading = (loading) => this.isLoading = loading;

  get user() {
    return this.currentUser;
  }
  
  get todo() {
    return this.currentTodo;
  }

  get date() {
    return this.dateHandler.getCurrentDate();
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

  get loading() {
    return this.isLoading;
  }
}

decorate(TodoStore, {
  currentUser: observable,
  currentTodo: observable,
  currentDate: observable,
  currentNotification: observable,
  notificationIsVisible: observable,
  isLoading: observable,
  todos: observable,
  user: computed,
  todo: computed,
  date: computed,
  allTodos: computed,
  notification: computed,
  notificationIsVisible: computed,
  loading: computed
});

export default createContext(new TodoStore());