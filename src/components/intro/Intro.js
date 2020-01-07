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

const Intro = (props) => {
  const [ view, setView ] = React.useState('buttons');

  return (
    <IntroBase>
      <IntroText />
      { view === 'buttons' && <Buttons setView={setView} /> }
      { view === 'login' && <Loginform setView={setView} /> }
      { view === 'newuser' && <NewUserform setView={setView} /> }
    </IntroBase>
  );
}

export default Intro;