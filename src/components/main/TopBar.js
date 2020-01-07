import React from 'react';
import styled from 'styled-components';
import IconButton from '../common/IconButton';
import TodoStore from '../../store/store';
import { ReactComponent as LogoutSVG } from './log-out.svg';
import Loading from './Loading';

const BaseLayout = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template: 100% / 1fr 4rem 4rem;
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
  
  return (
    <BaseLayout>
      <h1>One job</h1>
      {store.loading ? <Loading /> : <div />} 
      {store.user.uid ? <IconButton id='log-out' onClick={store.logoutUser}>
        <LogoutSVG color='#2e3440' />
      </IconButton>
      : <div />}
    </BaseLayout>
  );
}

export default TopBar;