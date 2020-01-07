import React from 'react';
import styled from 'styled-components';
import CenteredDiv from '../common/CenteredDiv';
import { ReactComponent as SVG } from '../../assets/loading-bars.svg';

const LoadingSVG = styled(SVG)`
  margin: 15px;
  fill: black;
`;

const Loading = () => {
  return (
    <CenteredDiv>
      <LoadingSVG />
    </CenteredDiv>
  );
}

export default Loading;