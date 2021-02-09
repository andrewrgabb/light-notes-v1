import styled from 'styled-components';

export const Box = styled.div `
  position: absolute;
  border: 4px solid #222222;
  border-radius: 10px;
  background-color: #FEFEFE;
  opacity: 100%;
  padding: 5px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.textarea `
  position: relative;
  width: 300px;
  height: 30px;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 2px solid #111111;
  resize: none;
  padding: 4px;
  font-size: 16px;
`

export const Content = styled.textarea `
  position: relative;
  width: 300px;
  height: 200px;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 2px solid #111111;
  resize: none;
  padding: 4px;
  font-size: 16px;
`

export const Button = styled.button `
  background-color: lightGreen;
  margin-bottom: 10px;
  font-size: 14px;
`