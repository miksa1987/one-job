import React from 'react';
import TopBar from './components/main/TopBar';
import Main from './components/main/Main';
import Intro from './components/intro/Intro';
import Notification from './components/notification/Notification';
import { connect } from 'react-redux';
import { getAndSetTodos, setCurrentTodo } from './actions/todos';
import { setUser } from './actions/user';

const App = (props) => {
  React.useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('onejob-user'));

    if (storedUser) {
      props.setUser(storedUser);
      checkTodos(storedUser);
    }
  }, [props.date]);
  console.log(props.date)
  console.log(props.notification)

  const checkTodos = (user) => {
    props.getAndSetTodos(user);
    props.setCurrentTodo(props.todos.all);
  }

  return (
    <div>
      <TopBar />
      {props.user.uid ?
        <Main /> 
        : <Intro />}
      <Notification message={props.notification.message} visible={props.notification.visible} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    todos: state.todos,
    date: state.date,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  getAndSetTodos,
  setCurrentTodo,
  setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
