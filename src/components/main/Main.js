import React from 'react';
import styled from 'styled-components';
import CenteredDiv from '../common/CenteredDiv';
import DayCard from '../day-card/DayCard';
import BottomBar from './BottomBar';

const Main = () => {
  return (
    <CenteredDiv>
      <DayCard />
      <BottomBar />
    </CenteredDiv>
  );
}

export default Main;