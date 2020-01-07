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
    const splittedDate = store.date.split('-');
    
    setYear(splittedDate[0]);
    setMonth(splittedDate[1]);
    setDay(splittedDate[2]);
  }, [store.date]);

  return (
    <DateChangerBase>
      <MarginlessButton id='previous-day' onClick={store.setPreviousDayDate}>{'<'}</MarginlessButton>
      <MarginlessInput id='date-day' {...day} />
      <MarginlessInput id='date-month' {...month} />
      <MarginlessInput id='date-year' {...year} />
      <MarginlessButton id='next-day' onClick={store.setNextDayDate}>{'>'}</MarginlessButton>
      <MarginlessButton id='current-date' onClick={store.setCurrentDayDate}>Current date</MarginlessButton>
    </DateChangerBase>
  );
});

export default DateChanger;