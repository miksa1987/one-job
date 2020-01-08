import React from 'react';
import styled from 'styled-components';
import MarginlessButton from '../common/MarginlessButton';
import MarginlessInput from '../common/MarginlessInput';
import TodoStore from '../../store/store';
import { observer } from 'mobx-react-lite';

const DateChangerBase = styled.div`
  display: grid;
  grid-template: 2rem / 3rem 3rem 3rem 4rem 3rem 8rem;
`;

const DateChanger = observer(() => {
  const store = React.useContext(TodoStore);

  const splittedDate = store.date.split('-');
  const day = splittedDate[2];
  const month = splittedDate[1];
  const year = splittedDate[0];

  return (
    <DateChangerBase>
      <MarginlessButton id='previous-day' onClick={store.setPreviousDayDate}>{'<'}</MarginlessButton>
      <MarginlessInput id='date-day' value={day} readOnly={true} />
      <MarginlessInput id='date-month' value={month} readOnly={true} />
      <MarginlessInput id='date-year' value={year} readOnly={true} />
      <MarginlessButton id='next-day' onClick={store.setNextDayDate}>{'>'}</MarginlessButton>
      <MarginlessButton id='current-date' onClick={store.setCurrentDayDate}>Current date</MarginlessButton>
    </DateChangerBase>
  );
});

export default DateChanger;