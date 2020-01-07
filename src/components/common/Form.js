import styled from 'styled-components';

export default styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 50px 30px;
  background-color: rgba(255, 255, 255, 0.4);

  @media screen and (min-width: 500px) {
    margin: 30px 80px 30px;
  }

  @media screen and (min-width: 800px) {
    margin: 30px 120px 30px;
  }
`;