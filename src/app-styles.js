import styled from 'styled-components';

export const Structure = styled.div`
  background-color: #EFEFEF;
`;

export const Header = styled.div`
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
  background-color: #FAFAFA;
  
  width: 16%;
  min-width: 180px;
  height: 36px;

  font-size: inherit;

  border-radius: 5px;
  color: black;

  :focus {
    outline-width: 0;
    background-color: #FFFFFF;
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
