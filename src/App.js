import React from 'react';
import TopBar from './components/main/TopBar';
import Main from './components/main/Main';
import Intro from './components/intro/Intro';
import Notification from './components/notification/Notification';
import TodoStore from './store/store';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const store = React.useContext(TodoStore);
  console.log(store.user)

  React.useEffect(() => {
    const storedUser = window.localStorage.getItem('onejob-user');

    if (storedUser) {
      store.setUser(JSON.parse(storedUser));
      checkTodos();
    }
  }, [store.date]);

  const checkTodos = async () => {
    await store.getAndSetTodos();
    await store.setCurrentTodo();
  }

  // Little hack to get loading indicator to function properly. 
  const loading = store.loading;

  return (
    <div>
      <TopBar />
      {store.user.uid ?
        <Main /> 
        : <Intro />}
      <Notification message={store.notification} visible={store.notificationIsVisible} />
    </div>
  );
});

export default App;
