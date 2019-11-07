import React from 'react';
import styled from 'styled-components';
import DateChanger from './DateChanger';

const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5e9f0;
  border-top: 1px solid #c8cee9;
  position: fixed;
  bottom: 0px;
  height: 4rem;
  width: 100%;
`;

const BottomBar = (props) => {
  return (
    <Base>
      <DateChanger />
    </Base>
  );
}

export default BottomBar;