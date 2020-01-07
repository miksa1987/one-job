import { decorate, computed, observable } from 'mobx';
import { createContext } from 'react';
import Database from '../database/database';
import UserHandler from './user';
import TodosHandler from './todos';
import DateHandler from './date';

export class TodoStore {
  currentNotification = '';
  notificationVisible = false;
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
      this.setNotification('You have logged in.');
    })
  } 

  loginAndSetUser = async (email, password) => {
    await this.handleOperation(async () => {
      await this.userHandler.loginAndSetUser(email, password);
      this.setNotification('You have logged in.');
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
  seeIfTodoTimeIsPassed = () => this.todosHandler.seeIfTodoTimeIsPassed(this.dateHandler.getCurrentDate());
  
  setCurrentDate = (date) => this.dateHandler.setDate(date);
  setNextDayDate = () => this.dateHandler.nextDay();
  setPreviousDayDate = () => this.dateHandler.previousDay();
  setCurrentDayDate = () => this.dateHandler.currentDay();

  setNotification = (message) => {
    this.currentNotification = message;
    
    setTimeout(() => {
      this.currentNotification = '';
    }, 3000);
  }

  setLoading = (loading) => this.isLoading = loading;

  get user() {
    return this.userHandler.getCurrentUser();
  }

  get date() {
    return this.dateHandler.getCurrentDate();
  }
  
  get todo() {
    return this.todosHandler.getCurrentTodo();
  }

  get todoTimePassed() {
    return this.todosHandler.getTodoTimePassed();
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
  notificationVisible: observable,
  isLoading: observable,
  todos: observable,
  user: computed,
  date: computed,
  todo: computed,
  todoTimePassed: computed,
  allTodos: computed,
  notification: computed,
  notificationIsVisible: computed,
  loading: computed
});

export default createContext(new TodoStore());