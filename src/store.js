import { decorate, computed, observable } from 'mobx';
import { createContext } from 'react';

class TodoStore {
  currentUser = { username: 'nulluu' }
  currentTodo = {}
  currentDate = new Date()
  todos = []

  setUser = (user) => {
    this.currentUser = user;
  }

  setCurrentTodo = (todo) => {
    this.currentTodo = todo;
  }

  setCurrentDate = (date) => {
    this.currentDate = date;
  }

  addTodo = (todo) => {
    this.todos = [ ...this.todos, todo ]; 
  }

  setAllTodos = (allTodos) => {
    this.todos = allTodos;
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

  get todaysTodo() {
    console.log(this.allTodos)
    const result = this.todos.filter((todo) => todo.date === this.date);
    console.log(result);

    return result[0] || null;
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