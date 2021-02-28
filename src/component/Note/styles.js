import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  border: 2px solid darkgrey;
  border-radius: 2px;

  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 16px;

  background-color: ${props => (props.isDragging ? '#C4E1FF' : 'white')};
  
  min-height: 160px;

  border-radius: 8px;
  color: black;

  &: focus {
    outline: none;
    border-color: darkgreen;
  }
`;

export const ShowHide = styled.div `
  opacity: 0;
  background-color: transparent;
`

export const TopSection = styled.div `
  position: relative;
  background-color: #c8baff;
  min-height: 32px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  cursor: default;
`

export const NoteTitle = styled.textarea`

  font-size: 16px;
  line-height: 20px;
  font-family: Arial, sans-serif;
  color: black;
  width: 100%;
  padding-left: 6px;

  margin-top: 6px;
  margin-bottom: 6px;
  margin-left: 6px;
  margin-right: 40px;

  padding-top: 6px;

  border: none;
  display: block;
  resize: none;

  background-color: transparent;

  :focus {
    background-color: white;
    box-shadow: inset 0 0 0 2px #0079bf;
    border-radius: 5px;
    cursor: text;
    outline-width: 0;
  }
`

export const TitleEditingTarget = styled.div `
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
`

export const DropdownBox = styled.div `
  position: absolute;
  top: 8px;
  right: 6px;

  width: 28px;
  height: 28px;

  padding: 2px;

  border-radius: 5px;

  display: block;

  :hover {
    background-color: #1873CC; 
  }
  cursor: pointer;
`

export const ContentSection = styled.div `
  margin: 4px;
  position: relative;

  width: calc(100% - 28px);
`

export const ContentEditingTarget = styled.div `
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
`

export const Content = styled.textarea`

  width: 100%;

  font-size: 16px;
  line-height: 20px;
  font-family: Arial, sans-serif;
  
  padding: 10px;

  resize: none;

  border: none;
  display: block;
  resize: none;

  min-height: 142px;

  overflow: auto;

  background-color: transparent;

  :focus {
    background-color: white;
    box-shadow: inset 0 0 0 2px #0079bf;
    border-radius: 5px;
    cursor: text;
    outline-width: 0;
  }
`

export const ButtonSection = styled.div `
  margin: 4px;
  position: relative;
  width: calc(100% - 28px);
  height: 28px;
  padding: 2px;
`

export const StyledButton = styled.button `

  float: right;
  height: 28px;
  width: 80px;
  
  color: black;
  padding: 4px;

  font-size: 14px;
  text-align: center;

  background-color: #4094e6;
  :hover {
    background-color: #6FB8FF; 
  }

  border: 1px solid #343434;
  border-radius: 10px;
`