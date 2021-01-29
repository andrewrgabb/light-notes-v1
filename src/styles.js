import styled from 'styled-components';

export const Structure = styled.div`
  background-color: #EFEFEF;
`;

export const Header = styled.div`
  position: relative;
  height: 50px;
  text-align: left;
  padding-left: 10px;
  font-size: 20px;
`;

export const Title = styled.h3`
  position: absolute;
  width: 50%;
  float: left;
  padding-top: 10px;
  padding-left: 20px;
  color: black;
`;

export const StyledButton = styled.button `
  position: absolute;
  border: 2px solid;
  background-color: #FAFAFA;
  
  width: 240px;
  height: 30px;

  font-size: inherit;

  right: 20px;
  margin-top: 10px;

  border-radius: 5px;
  color: black;
`

export const ResetButton = styled(StyledButton) `
  width: 120px;
  right: 300px;
`

export const Content = styled.div`
  background-color: inherit;
  position: absolute;
  top: 50px;
  bottom: 0;
  width: 100%; 
`;
