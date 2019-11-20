import React from 'react';
import styled from 'styled-components';

const NotificationBase = styled.div`
  display: ${props => props.message !== '' ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  z-index: 1000;
  position: fixed;
  top: 3rem;
  height: 3rem;
  left: 10%;
  width: 80%;
`;

const Notification = (props) => {
  return (
    <NotificationBase message={props.message}>
      <p>{props.message}</p>
    </NotificationBase>
  )
}

export default Notification;