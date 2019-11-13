import React from 'react';
import styled from 'styled-components';
import CenteredDiv from '../common/CenteredDiv';
import MarginlessButton from '../common/MarginlessButton';
import MarginlessInput from '../common/MarginlessInput';

const TodoTimeBase = styled.div`
  display: grid;
  grid-template: 2rem / 3rem 3rem 6rem;
`;

const SetTodoTime = (props) => {
  return (
    <CenteredDiv>
      <TodoTimeBase>
        <MarginlessInput id='todo-time-hours' {...props.hours}/>
        <MarginlessInput id='todo-time-minutes' {...props.minutes}/>
        <MarginlessButton id='todo-time-set' onClick={props.saveTodo}>
          Set
        </MarginlessButton>
      </TodoTimeBase>
    </CenteredDiv>
  );
}

export default SetTodoTime;