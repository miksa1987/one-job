import React from 'react';
import Layout from './components/main/Layout';
import TopBar from './components/main/TopBar';
import CardContainer from './components/main/CardContainer';
import BottomBar from './components/main/BottomBar';
import DayCard from './components/day-card/DayCard';
import Intro from './components/intro/Intro';
import TodoStore from './store';
import Firebase from './firebase/firebase';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const store = React.useContext(TodoStore);
  const firebase = React.useContext(Firebase);

  React.useEffect(() => {
    const storedUser = window.localStorage.getItem('onejob-user');

    if (storedUser) {
      store.setUser(JSON.parse(storedUser));
      getAllTodosByUser();
    }
  }, [store.date]);

  const getAllTodosByUser = async () => {
    const todosObject = await firebase.getTodos(store.user.uid) || {};
    let todos = [];
    
    const todosObjectKeys = Object.keys(todosObject);
    todosObjectKeys.forEach((key) => {
      const todoObjectWithKey = { ...todosObject[key], key: key }
      todos.push(todoObjectWithKey);
    });
    store.setAllTodos(todos);

    setCurrentTodo(todos);
  } 

  const setCurrentTodo = (todos) => {
    const filteredTodos = todos.filter((todo) => todo.date === store.date);
    
    if (checkForTodo(store.date)) {
      store.setCurrentTodo(filteredTodos[0]);
    }
    else {
      store.setCurrentTodo({date: store.date, task: '', reflect: ''});
    }
  }

  const checkForTodo = (date) => {
    let found = false;
    store.allTodos.forEach((todo) => {
      if (todo.date === date) {
        found = true;
      }
    });
    return found;
  }
  
  if (!store.user.uid) {
    return (
      <Intro />
    );
  }

  return (
    <Layout>
      <TopBar />
      <CardContainer>
        <DayCard />
      </CardContainer>
      <BottomBar />
    </Layout>
  );
});

export default App;
