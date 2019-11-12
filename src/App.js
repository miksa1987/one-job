import React from 'react';
import TopBar from './components/main/TopBar';
import CenteredDiv from './components/common/CenteredDiv';
import BottomBar from './components/main/BottomBar';
import DayCard from './components/day-card/DayCard';
import Intro from './components/intro/Intro';
import TodoStore from './store';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const store = React.useContext(TodoStore);

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
  
  if (!store.user.uid) {
    return (
      <Intro />
    );
  }

  return (
    <CenteredDiv>
      <TopBar />
      <DayCard />
      <BottomBar />
    </CenteredDiv>
  );
});

export default App;
