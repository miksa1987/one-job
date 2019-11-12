import { decorate, computed, observable } from 'mobx';
import { createContext } from 'react';
import Firebase from './firebase/firebase';

class TodoStore {
  currentUser = { username: 'nulluu' };
  currentTodo = {};
  currentDate = new Date();
  todos = [];
  error = '';

  firebase = new Firebase();

  createAndSetUser = async (e_mail, password, repeatPassword) => {
    try {
      if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await this.firebase.loginUser(e_mail, password);
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
      console.log(this.currentUser)
    }
    catch (error) {
      console.log(error.message)
      this.error = error.message;
    }
  }

  logoutUser = async () => {
    await this.firebase.logoutUser();
    this.user = {};
  }

  getAndSetTodos = async () => {
    const allTodos = await this.makeTodosObjectToArray();
    this.todos = allTodos;
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
}

decorate(TodoStore, {
  currentUser: observable,
  currentTodo: observable,
  currentDate: observable,
  todos: observable,
  user: computed,
  todo: computed,
  date: computed,
  allTodos: computed
});

export default createContext(new TodoStore());