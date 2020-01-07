import React from 'react';
import styled from 'styled-components';

const ButtonBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Buttons = (props) => {
  return (
    <ButtonBase>
      <button onClick={() => props.setView('login')} id='login'>Log in</button>
      <button onClick={() => props.setView('newuser')} id='new-user'>New user</button>
    </ButtonBase>
  );
};

export default Buttons;