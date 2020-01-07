import { decorate, computed, observable } from 'mobx';
import { createContext } from 'react';
import { 
  saveTodoMock, 
  setCurrentDateMock,
  loginAndSetUserMock,
  createAndSetUserMock,
  setNotificationMock 
} from './testHelper';

class TodoStore {
  currentTodo = {
    task: 'test',
    reflect: 'test',
    date: '2019-11-13',
    time: [ 12, 0 ],
    key: '1'
  };
  currentDate = '2019-11-13';

  setCurrentDate = (date) => {
    setCurrentDateMock();
    this.currentDate = date;
  }

  saveTodo = (newTodo, key) => {
    saveTodoMock();
    this.currentTodo = { ...newTodo, key: '1' };
  }

  setNextDayDate = () => this.currentDate = '2019-11-14';
  setPreviousDayDate = () => this.currentDate = '2019-11-12';
  setCurrentDayDate = () => this.currentDate = '2019-11-13';
  
  seeIfTodoTimeIsPassed = () => {}
  setNotification = () => setNotificationMock();

  loginAndSetUser = () => loginAndSetUserMock();
  createAndSetUser = () => createAndSetUserMock();

  get user() {
    return {};
  }
  
  get todo() {
    return this.currentTodo;
  }

  get date() {
    return this.currentDate;
  }

  get allTodos() {
    return [ this.currentTodo, this.currentTodo, this.currentTodos ];
  }

  get todoTimePassed() {
    return true;
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