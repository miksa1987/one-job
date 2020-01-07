import React from 'react';
import styled from 'styled-components';

const NotificationBase = styled.div`
  display: ${props => props.message !== '' ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  z-index: 1000;
  position: fixed;
  top: 5rem;
  height: 3rem;
  left: 10%;
  width: 80%;
  animation: fade-in 0.75s;

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Notification = (props) => {

  return (
    <NotificationBase message={props.message}>
      <p>{props.message}</p>
    </NotificationBase>
  );
};

export default Notification;