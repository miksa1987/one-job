import React from 'react';
import styled from 'styled-components';
import IntroText from './IntroText';
import Buttons from './Buttons';
import Loginform from './Loginform';
import NewUserform from './NewUser';

const IntroBase = styled.div`
  display: grid;
  grid-template: 50% 50% / 100%;
  margin-top: 4rem;
  height: calc(100vh - 8rem);
  padding: 10px;
`;

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const Intro = () => {
  const [ view, setView ] = React.useState('buttons');

  return (
    <IntroBase>
      <Upper>
        <IntroText />
        <img src='splash.png' alt='One job splash' />
      </Upper>
      { view === 'buttons' && <Buttons setView={setView} /> }
      { view === 'login' && <Loginform setView={setView} /> }
      { view === 'newuser' && <NewUserform setView={setView} /> }
    </IntroBase>
  );
}

export default Intro;