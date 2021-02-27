import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  min-width: 380px;
  width: 380px;

  display: flex;
  flex-direction: column;
  height: 100%;

  margin-left: 8px;
  margin-right: 8px;

  border-left: 4px solid #222222;
  border-right: 4px solid #222222;

  border-radius: 10px;

  background-color: ${props => (props.isDraggingOver ? '#8CC6FF' : '#FAFAFA')};
`

export const TopSection = styled.div `

  position: relative;
  display: block;

  min-height: 52px;

  background-color: #6FB8FF;
  border-radius: 5px;
`

export const EditingTarget = styled.div `

  display: block;

  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;

  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`

export const ColumnTitle = styled.textarea`

  position: static;
  display: block;

  width: 300px;

  overflow: hidden;
  overflow-wrap: break-word;
  
  min-height: 24px;

  font-size: 20px;
  line-height: 24px;
  font-family: Arial, sans-serif;
  color: black;
  margin-top: 6px;
  margin-bottom: 6px;
  margin-left: 16px;
  text-align: left;
  padding-left: 10px;
  padding-top: 6px;

  border: none;

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

export const DropdownBox = styled.div `
  position: absolute;
  top: 8px;
  right: 6px;

  width: 28px;
  height: 28px;

  display: block;

  padding-top: 4px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;
  
  opacity: 100%;

  border-radius: 5px;

  :hover {
    background-color: #1873CC; 
  }

  cursor: pointer;
`

export const Content = styled.div`

  position: absolute;

  left: 6px;
  bottom: calc(60px + 14px);
  overflow-y: scroll;

  width: calc(100% - 12px);
`
//top: calc(44px + 14px);
//background-color: #0000FF;

/*
  &::-webkit-scrollbar {
    border-right: none;
    border-left: 1px solid #E8E8E8;
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #E8E8E8;
    background-clip: content-box;
    border: 4px solid transparent;
    border-radius: 10px;
  }

*/


export const NoteList = styled.div`
  position: relative;
  padding: 4px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#8CC6FF' : 'inherit')};
  flex-grow: 1;
  min-height: calc(100% - 8px);
`

export const StyledButton = styled.button `
  border: 2px solid;
  background-color: #EDEDED;

  width: calc(100% - 20px);
  height: 55px;

  border-radius: 10px;

  font-size: 50px;
  font-family: Arial, sans-serif;
  
  line-height: 0px;
  position: absolute;
  bottom: 5px;
  left: 10px;

  padding-top: 2px;

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