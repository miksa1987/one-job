import React from 'react';
import styled from 'styled-components';
import SetTodoTime from './SetTodoTime';
import TodoStore from '../../store';
import CenteredDiv from '../common/CenteredDiv';
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
  const currentTodo = store.todo;

  const [todoTimeNotPassed, setTodoTimePassed] = React.useState(true);
  const reflectPlaceholder = todoTimeNotPassed ? '' : 'How did it feel?'

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
    
    store.saveTodo(newTodo, key);
  }

  return (
    <CardBase>
      <H2 id='one-job-text'>What is your one job today?</H2>
      <textarea id='todo-text' {...todoText} onBlur={saveTodo} placeholder='Describe your one job in detail' />
      <textarea id='reflect-text' {...reflectText} readOnly={todoTimeNotPassed} onBlur={saveTodo} placeholder={reflectPlaceholder} /> 
      <CenteredDiv> 
        <strong>Set time for it: </strong>    
        <SetTodoTime hours={timeHours} minutes={timeMinutes} saveTodo={saveTodo} />
      </CenteredDiv>
    </CardBase>
  );
});

export default DayCard;