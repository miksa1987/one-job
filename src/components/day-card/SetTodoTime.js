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
        <MarginlessInput />
        <MarginlessInput />
        <MarginlessButton>Set</MarginlessButton>
      </TodoTimeBase>
    </CenteredDiv>
  );
}

export default SetTodoTime;