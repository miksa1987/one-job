import React from 'react';
import styled from 'styled-components';
import SetTodoTime from './SetTodoTime';
import TodoStore from '../../store/store';
import useField from '../../hooks/useField';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { H2 } from '../common/Headers';

const CardBase = styled.div`
  display: grid;
  grid-template: 4rem 1fr 1.5rem 1fr 4rem / 100%;
  justify-content: center;
  background-color: #eceff4;
  padding: 5px;
  margin-top: 10%;
  flex-basis: 80%;
  height: 60vh;
  box-sizing: border-box;
  animation: fade-in 0.75s;

  @media screen and (max-width: 600px) {
    margin-top: 25%;
    height: 70vh;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DayCard = observer(() => {
  const [ todoText, setTodoText ] = useField('text');
  const [ reflectText, setReflectText ] = useField('text');
  const [ timeHours, setTimeHours ] = useField('hours');
  const [ timeMinutes, setTimeMinutes ] = useField('minutes');

  const store = React.useContext(TodoStore);
  const currentTodo = store.todo;
  const [todoTimeNotPassed, setTodoTimeNotPassed] = React.useState(true);

  React.useEffect(() => {
    if (currentTodo) {
      setTodoTexts();
      setReminderTimeFromTodo();
      seeIfTodoTimeIsPassed();
    }
  }, [currentTodo]);

  const setTodoTexts = () => {
    setTodoText(currentTodo.task);
    setReflectText(currentTodo.reflect);
  }

  const setReminderTimeFromTodo = () => {  
    const [ hours, minutes ] = getHoursAndMinutesFromTodo();
    setTimeHours(hours);
    setTimeMinutes(minutes);
  }

  const seeIfTodoTimeIsPassed = () => {
    const [ hours, minutes ] = getHoursAndMinutesFromTodo();
    const currentTime = moment();
    const todoTimeString = `${store.date}-${hours}-${minutes}`;
    const todoTime = moment(todoTimeString, 'YYYY-MM-DD-H-m');

    if (currentTime.isAfter(todoTime)) {
      setTodoTimeNotPassed(false);
    }
    else {
      setTodoTimeNotPassed(true);
    }
  }

  const getHoursAndMinutesFromTodo = () => {
    const hours = currentTodo.time ? currentTodo.time[0] : 12;
    const minutes = currentTodo.time ? currentTodo.time[1] : 0;

    return [ hours, minutes ];
  }

  const saveTodo = () => {
    const newTodo = {
      task: todoText.value,
      reflect: reflectText.value,
      date: moment(store.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      time: [timeHours.value, timeMinutes.value]
    }
    const key = currentTodo.key || null
    
    store.saveTodo(newTodo, key);
  }

  const saveReflect = () => {
    saveTodo();
    store.setNotification('Good job!');
  }

  return (
    <CardBase>
      <H2 id='one-job-text'>What is your one job today?</H2>
      <textarea id='todo-text' {...todoText} onBlur={saveTodo} />

      {todoTimeNotPassed ? <div /> : <strong>Now, reflect on how you felt doing the job:</strong>}

      <textarea id='reflect-text' {...reflectText} readOnly={todoTimeNotPassed} onBlur={saveReflect} />      
      <SetTodoTime hours={timeHours} minutes={timeMinutes} saveTodo={saveTodo} />
    </CardBase>
  );
});

export default DayCard;