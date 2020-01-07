import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import MarginlessButton from '../common/MarginlessButton';
import MarginlessInput from '../common/MarginlessInput';
import TodoStore from '../../store/store';
import useField from '../../hooks/useField';
import { observer } from 'mobx-react-lite';

const DateChangerBase = styled.div`
  display: grid;
  grid-template: 2rem / 3rem 3rem 3rem 4rem 3rem 8rem;
`;

const DateChanger = observer(() => {
  const [day, setDay] = useField('text');
  const [month, setMonth] = useField('text');
  const [year, setYear] = useField('text');

  const store = React.useContext(TodoStore);

  React.useEffect(() => {
    const dateNow = moment().format('YYYY-MM-DD');
    setDate(dateNow);
  }, []);

  const previousDay = () => {
    const previousDayDate = moment(store.date, 'YYYY-MM-DD').add(-1, 'day').format('YYYY-MM-DD');
    setDate(previousDayDate);
  }

  const nextDay = () => {
    const nextDayDate = moment(store.date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
    setDate(nextDayDate);
  }

  const currentDay = () => {
    const currentDayDate = moment().format('YYYY-MM-DD');
    setDate(currentDayDate);
  }

  const setDate = (date) => {
    store.setCurrentDate(date);
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
});

export default DateChanger;