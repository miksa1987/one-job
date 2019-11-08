import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { createContext } from 'react';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

export class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.database = firebase.database();
  }

  createNewUser = async (email, password) => {
    await this.auth.createUserWithEmailAndPassword(email, password);
    const user = this.auth.currentUser;

    this.database.ref(`/users/${user.uid}`).set({
      email: user.email,
      todos: []
    });

    return user;
  }

  loginUser = async (email, password) => {
    await this.auth.signInWithEmailAndPassword(email, password);
    return this.auth.currentUser;
  }

  logoutUser = async () => {
    this.auth.signOut();
  }

  sendPasswordToEmail = async (email) => {
    this.auth.sendPasswordResetEmail(email);
  }

  saveTodo = async (todoData, key) => {
    const currentUser = this.auth.currentUser;
    const newTodoKey = key ? key : await this.database.ref('/todos').push().key;
    
    const update = {
      [`/todos/${newTodoKey}`]: { ...todoData, user: currentUser.uid }
    };

    return this.database.ref().update(update);
  }

  getTodos = async (userId) => {
    const todosSnapshot = await this.database.ref('todos')
      .orderByChild('user')
      .equalTo(userId)
      .once('value');

    return todosSnapshot.val();
  }
}

export default createContext(new Firebase());