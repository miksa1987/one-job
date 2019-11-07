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
  grid-template: 4rem 1fr 1fr 4rem / 100%;
  justify-content: center;
  background-color: #eceff4;
  padding: 5px;
  margin-top: 10%;
  flex-basis: 80%;
  height: 60vh;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    margin-top: 25%;
    height: 70vh;
  }
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
    const todoTimeString = `${currentTime.format('YYYY-MM-DD-')}-${hours}-${minutes}`;
    const todoTime = moment(todoTimeString, 'YYYY-MM-DD-H-m');

    if (currentTime.isAfter(todoTime)) {
      setTodoTimePassed(false);
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
    
    firebase.saveTodo(newTodo, key);
  }

  return (
    <CardBase>
      <H2>What's your one job today?</H2>
      <textarea {...todoText} onBlur={saveTodo} />
      <textarea {...reflectText} readOnly={todoTimeNotPassed} onBlur={saveTodo} />      
      <SetTodoTime hours={timeHours} minutes={timeMinutes} onBlur={saveTodo} />
    </CardBase>
  );
});

export default DayCard;