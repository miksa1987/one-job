import { decorate, computed, observable } from 'mobx';
import { createContext } from 'react';
import Database from '../database/database';
import UserHandler from './user';
import TodosHandler from './todos';
import DateHandler from './date';

class TodoStore {
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
      this.isLoading = false;
    }
    catch (error) {
      this.setNotification(error.message);
    }
  }

  createAndSetUser = async (email, password, repeatPassword) => {
    await this.handleOperation(async () => {
      await this.userHandler.createAndSetUser(email, password, repeatPassword);
    })
  } 

  loginAndSetUser = async (email, password) => {
    await this.handleOperation(async () => {
      await this.userHandler.loginAndSetUser(email, password);
    });
  }

  logoutUser = async () => {
    await this.userHandler.logoutUser();
    this.setNotification('You have logged out.');
  }

  setUser = (user) => {
    this.userHandler.setUser(user);
  }

  getAndSetTodos = async () => {
    await this.handleOperation(async () => {
      await this.todosHandler.getAndSetTodos(this.userHandler.getCurrentUser().uid);
    });
  } 

  setCurrentTodo = () => {
    this.handleOperation(() => {
      this.todosHandler.setCurrentTodo(this.dateHandler.getCurrentDate());
    });
  }

  checkForTodo = () => {
    return this.todosHandler(this.dateHandler.getCurrentDate());
  }

  saveTodo = async (todoData, key) => this.todosHandler.saveTodo(todoData, key);

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
    return this.userHandler.getCurrentUser();
  }
  
  get todo() {
    return this.todosHandler.getCurrentTodo();
  }

  get date() {
    return this.dateHandler.getCurrentDate();
  }

  get allTodos() {
    return this.todosHandler.getAllTodos();
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