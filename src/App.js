import React from 'react';
import TopBar from './components/main/TopBar';
import CenteredDiv from './components/common/CenteredDiv';
import BottomBar from './components/main/BottomBar';
import DayCard from './components/day-card/DayCard';
import Intro from './components/intro/Intro';
import Notification from './components/notification/Notification';
import TodoStore from './store/store';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const store = React.useContext(TodoStore);

  React.useEffect(() => {
    const storedUser = window.localStorage.getItem('onejob-user');

    if (storedUser) {
      store.setUser(JSON.parse(storedUser));
      checkTodos();
    }
  }, []);

  const checkTodos = async () => {
    await store.getAndSetTodos();
    await store.setCurrentTodo();
  }
  
  if (!store.user.uid) {
    return (
      <div>
        <Intro />
        <Notification message={store.notification} visible={store.notificationVisible} />
      </div>
    );
  }

  return (
    <CenteredDiv>
      <TopBar />
      <DayCard />
      <BottomBar />
      <Notification message={store.notification} visible={store.notificationIsVisible} />
    </CenteredDiv>
  );
});

export default App;
