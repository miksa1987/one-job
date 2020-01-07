import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const createNewUser = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser;

    this.database.ref(`/users/${user.uid}`).set({
      email: user.email,
      todos: []
    });

    return user;
  }

const loginUser = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);

    if (auth.currentUser === null) {
      throw new Error('Wrong email or password!')
    }
    return auth.currentUser;
  }

const logoutUser = async () => {
    auth.signOut();
  }

const sendPasswordToEmail = async (email) => {
    auth.sendPasswordResetEmail(email);
  }
const saveTodo = async (todoData, key) => {
    const currentUser = auth.currentUser;
    const newTodoKey = key ? key : await database.ref('/todos').push().key;
    
    const update = {
      [`/todos/${newTodoKey}`]: { ...todoData, user: currentUser.uid }
    };

    return database.ref().update(update);
  }

 const getTodos = async (userId) => {
    const todosSnapshot = await database.ref('todos')
      .orderByChild('user')
      .equalTo(userId)
      .once('value');

    return todosSnapshot.val();
  }

export default {
  createNewUser,
  loginUser,
  logoutUser,
  sendPasswordToEmail,
  saveTodo,
  getTodos
}