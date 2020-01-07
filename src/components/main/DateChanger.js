import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import MarginlessButton from '../common/MarginlessButton';
import MarginlessInput from '../common/MarginlessInput';
import useField from '../../hooks/useField';
import { connect } from 'react-redux';
import { setDate } from '../../actions/date';
import { setCurrentTodo } from '../../actions/todos';

const DateChangerBase = styled.div`
  display: grid;
  grid-template: 2rem / 3rem 3rem 3rem 6rem 3rem 6rem;
`;

const DateChanger = (props) => {
  const [day, setDay] = useField('text');
  const [month, setMonth] = useField('text');
  const [year, setYear] = useField('text');

  React.useEffect(() => {
    const dateNow = moment().format('YYYY-MM-DD');
    setDate(dateNow);
  }, []);

  const previousDay = () => {
    const previousDayDate = moment(props.date, 'YYYY-MM-DD').add(-1, 'day').format('YYYY-MM-DD');
    setDate(previousDayDate);
  }

  const nextDay = () => {
    const nextDayDate = moment(props.date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
    setDate(nextDayDate);
  }

  const currentDay = () => {
    const currentDayDate = moment().format('YYYY-MM-DD');
    setDate(currentDayDate);
  }

  const setDate = (date) => {
    props.setDate(date);
    props.setCurrentTodo(props.todos, date);
    const splittedDate = date.split('-');
    
    setYear(splittedDate[0]);
    setMonth(splittedDate[1]);
    setDay(splittedDate[2]);
  }

  return (
    <DateChangerBase>
      <MarginlessButton id='previous-day' onClick={previousDay}>{'<'}</MarginlessButton>
      <MarginlessInput id='date-day' {...day} />
      <MarginlessInput id='date-month' {...month} />
      <MarginlessInput id='date-year' {...year} />
      <MarginlessButton id='next-day' onClick={nextDay}>{'>'}</MarginlessButton>
      <MarginlessButton id='current-date' onClick={currentDay}>Current date</MarginlessButton>
    </DateChangerBase>
  );
}


const mapStateToProps = (state) => {
  return {
    date: state.date,
    todos: state.todos.all
  }
}

export default connect(mapStateToProps, { setDate, setCurrentTodo })(DateChanger);