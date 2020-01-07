import React from 'react';
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
};

export default Main;