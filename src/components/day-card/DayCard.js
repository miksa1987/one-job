import React from 'react';
import styled from 'styled-components';
import SetTodoTime from './SetTodoTime';
import TodoStore from '../../store';
import Firebase from '../../firebase/firebase';
import useField from '../../hooks/useField';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { H2 } from '../common/Headers';

const CardBase = styled.div`
  display: grid;
  grid-template: 3rem 6rem 6rem 4rem / 80vh;
  justify-content: center;
  background-color: #eceff4;
  border-bottom: 1px solid #c8cee9;
  padding: 10px;
`;

const DayCard = observer(() => {
  const [ todoText, setTodoText ] = useField('text');
  const [ reflectText, setReflectText ] = useField('text');
  const [ timeHours, setTimeHours ] = useField('hours');
  const [ timeMinutes, setTimeMinutes ] = useField('minutes');

  const store = React.useContext(TodoStore);
  const firebase = React.useContext(Firebase);
  const currentTodo = store.todo;

  const [todoTimeNotPassed, setTodoTimePassed] = React.useState(true);

  React.useEffect(() => {
    if (currentTodo) {
      const hours = currentTodo.time ? currentTodo.time[0] : 12;
      const minutes = currentTodo.time ? currentTodo.time[1] : 0;

      setTodoText(currentTodo.task);
      setReflectText(currentTodo.reflect);
      setTimeHours(hours);
      setTimeMinutes(minutes);

      const currentTime = moment();
      const todoTimeString = `${currentTime.format('YYYY-MM-DD-')}-${hours}-${minutes}`;
      const todoTime = moment(todoTimeString, 'YYYY-MM-DD-H-m');

      if (currentTime.isAfter(todoTime)) {
        setTodoTimePassed(false);
      }
    }
  }, [currentTodo]);

  const saveTodo = async () => {
    const newTodo = {
      task: todoText.value,
      reflect: reflectText.value,
      date: moment(store.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      time: [timeHours.value, timeMinutes.value]
    }
    const key = currentTodo.key || null
    await firebase.saveTodo(newTodo, key);
  }

  return (
    <CardBase>
      <H2>Today<button onClick={saveTodo}>save [TEMPORARY SOLUTION]</button></H2>
      <textarea {...todoText} />
      <textarea {...reflectText} readOnly={todoTimeNotPassed} />      
      <SetTodoTime hours={timeHours} minutes={timeMinutes} />
    </CardBase>
  );
});

export default DayCard;