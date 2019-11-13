import { decorate, computed, observable } from 'mobx';
import { createContext } from 'react';
import { saveTodoMock } from './testHelper';

class TodoStore {
  currentTodo = {
    task: 'test',
    reflect: 'test',
    date: '2019-11-13',
    time: [ 12, 0 ],
    key: '1'
  };

  saveTodo = (newTodo, key) => {
    saveTodoMock();
    this.currentTodo = { ...newTodo, key };
  }

  get user() {
    return {};
  }
  
  get todo() {
    return this.currentTodo;
  }

  get date() {
    return '2019-11-13';
  }

  get allTodos() {
    return [ this.currentTodo, this.currentTodo, this.currentTodos ];
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