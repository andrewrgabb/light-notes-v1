import styled from 'styled-components';

export const Structure = styled.div`
  background-color: #EFEFEF;
`;

export const Header = styled.div`
  background-color: inherit;
  position: relative;
  min-height: 50px;
  text-align: left;
  padding-left: 10px;
  padding-right: 5px;
  padding-top: 10px;
  font-size: 20px;
  display: flex;
  justify-content: space-between
`;

export const Title = styled.h3`
  position: relative;
  width: 50%;
  
  color: black;
`;

export const StyledButton = styled.button `
  position: relative; 
  border: 2px solid;
  background-color: #EDEDED;
  
  width: 16%;
  min-width: 180px;
  height: 36px;

  font-size: inherit;

  border-radius: 10px;
  color: black;

  :hover {
    outline-width: 0;
    background-color: #FFFFFF;
  }

  :focus {
    box-shadow: inset 0 0 0 2px #0079bf;
    outline-width: 0;
  }
`

export const Content = styled.div`
  background-color: inherit;
  position: absolute;
  display: block;
  top: 50px;
  bottom: 0;
  height: calc(100% - 50px);
  width: 100%; 
`;
