import React from 'react';
import styled from 'styled-components';

const NotificationBase = styled.div`
  display: ${props => props.visible ? 'flex' : 'none'};
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
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    setMessage(props.message);
  }, [props.message, props.visible]);
  return (
    <NotificationBase visible={props.visible}>
      <p>{message}</p>
    </NotificationBase>
  )
}

export default Notification;