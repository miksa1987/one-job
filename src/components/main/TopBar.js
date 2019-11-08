import React from 'react';
import styled from 'styled-components';
import IconButton from '../common/IconButton';
import TodoStore from '../../store';
import Firebase from '../../firebase/firebase';
import { ReactComponent as LogoutSVG } from './log-out.svg';

const BaseLayout = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template: 100% / 1fr 4rem;
  padding-left: 20px;
  align-items: center;
  background-color: #e5e9f0;
  border-bottom: 1px solid #c8cee9;
  position: fixed;
  top: 0px;
  height: 4rem;
  width: 100%;
`;

const TopBar = () => {
  const store = React.useContext(TodoStore);
  const firebase = React.useContext(Firebase);

  const logoutUser = () => {
    window.localStorage.clear();
    store.setUser({});
    firebase.logoutUser();
  }
  
  return (
    <BaseLayout>
      <h1>One job app</h1>
      <IconButton id='log-out' onClick={logoutUser}>
        <LogoutSVG color='#2e3440' />
      </IconButton>
    </BaseLayout>
  );
}

export default TopBar;