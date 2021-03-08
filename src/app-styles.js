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
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  position: relative;
  width: 40%;
  color: black;
  font-size: 28px;

  @media (max-width: 380px) {
    font-size: 20px;
    width: 50%;
    margin-top: 4px;
  }
`;

export const HeaderDemo = styled.div`
  background-color: inherit;
  position: absolute;
  width: 100%;
  top: 50px;
  min-height: 48px;
  padding: 0px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction row;
  justify-content: center;
  align-items: center;

  @media (max-width: 740px) {
    min-height: 32px;
  }
`;

export const Info = styled.h4`
  position: relative;
  font-size: 24px;
  color: black;
  margin: 0px;
  text-align: left;
  margin-left: 10px;

  @media (max-width: 740px) {
    font-size: 16px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const StyledButton = styled.button `
  position: relative; 
  border: 2px solid;
  background-color: #EDEDED;
  
  width: 16%;
  min-width: 180px;
  height: 36px;

  font-size: 20px;
  font-family: Arial, sans-serif;

  @media (max-width: 380px) {
    font-size: 16px;
    width: 30%;
    min-width: 140px;
    height: 26px;
    margin-top: 4px;
  }

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

  touch-action: none;
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

export const ContentDemo = styled.div`
  background-color: inherit;
  position: absolute;
  display: block;
  top: calc(50px + 48px);
  bottom: 0;
  height: calc(100% - 50px - 48px);
  width: 100%; 

  @media (max-width: 740px) {
    top: calc(50px + 32px);
    height: calc(100% - 50px - 32px);
  }
`;
