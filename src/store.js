import { decorate, computed, observable } from 'mobx';
import { createContext } from 'react';
import Database from './database/database';

class TodoStore {
  currentUser = { username: '' };
  currentTodo = {};
  currentDate = new Date();
  allTodos = [];
  errorFlag = '';
  currentNotification = '';
  
  firebase = new Database();

  createAndSetUser = async (email, password, repeatPassword) => {
    try {
      if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await this.firebase.loginUser(email, password);
      this.currentUser = {
        uid: response.uid, 
        email: response.email,
        refreshtoken: response.refreshtoken
      };
      window.localStorage.setItem('onejob-user', JSON.stringify(this.currentUser));
    }
    catch (error) {
      this.error = error.message;
    }
  } 

  loginAndSetUser = async (email, password) => {
    try {
      const response = await this.firebase.loginUser(email, password);
      this.currentUser = {
        uid: response.uid, 
        email: response.email,
        refreshtoken: response.refreshtoken
      };
      window.localStorage.setItem('onejob-user', JSON.stringify(this.currentUser));
    }
    catch (error) {
      this.setNotification(error.message);
      this.errorFlag = true;
    }
  }

  logoutUser = async () => {
    await this.firebase.logoutUser();
    this.currentUser = {};
    window.localStorage.clear();
  }

  getAndSetTodos = async () => {
    this.allTodos = await this.makeTodosObjectToArray();
  } 

  setCurrentTodo = () => {
    const filteredTodos = this.allTodos.filter((todo) => todo.date === this.currentDate);
    
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
    this.allTodos.forEach((todo) => {
      if (todo.date === this.currentDate) {
        found = true;
      }
    });
    
    return found;
  }

  makeTodosObjectToArray = async () => {
    const todosObject = await this.firebase.getTodos(this.currentUser.uid);
    let todos = [];
    const todosObjectKeys = Object.keys(todosObject);

    todosObjectKeys.forEach((key) => {
      todos.push({ ...todosObject[key], key: key });
    })

    return todos;
  }

  saveTodo = async (todoData, key) => {
    this.firebase.saveTodo(todoData, key);
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

  get todos() {
    return this.allTodos;
  }

  get notificationIsVisible() {
    return this.notificationVisible;
  }

  get notification() {
    return this.currentNotification;
  }

  get error() {
    return this.errorFlag;
  }
}

decorate(TodoStore, {
  currentUser: observable,
  currentTodo: observable,
  currentDate: observable,
  currentNotification: observable,
  notificationIsVisible: observable,
  allTodos: observable,
  user: computed,
  todo: computed,
  date: computed,
  todos: computed,
  notification: computed,
  notificationIsVisible: computed,
  error: computed
});

export default createContext(new TodoStore());