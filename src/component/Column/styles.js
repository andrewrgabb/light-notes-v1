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
  background-color: #6FB8FF;

  height: 40px;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  cursor: default;
`

export const EditingTarget = styled.div `
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
`

export const ColumnTitle = styled.textarea`
  text-align: center;
  font-size: 20px;
  color: black;
  margin-top: 6px;
  margin-bottom: 6px;
  margin-left: 16px;
  margin-right: 40px;
  width: 100%;
  text-align: left;
  padding-left: 10px;
  overflow: hidden;
  max-height: 100%;

  border: none;

  display: block;
  resize: none;

  background-color: transparent;

  :focus {
    background-color: white;
    box-shadow: inset 0 0 0 2px #0079bf;
    border-radius: 3px;
  }

  
`

export const DropdownBox = styled.div `
  
  width: 30px;
  height: 34px;

  position: absolute;
  top: 2px;
  right: 2px;

  display: block;

  padding-top: 6px;
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
  position: relative;
  overflow-y: scroll;
  width: calc(100% - 14px);

  position: absolute;

  top: calc(44px + 14px);
  bottom: calc(60px + 14px);

  left: 14px;

  border-left: 1px solid #E8E8E8;

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
`
//background-color: #0000FF;


export const NoteList = styled.div`
  position: relative;
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#8CC6FF' : 'inherit')};
  flex-grow: 1;
  min-height: calc(100% - 16px);
`

export const StyledButton = styled.button `
  border: 2px solid;
  background-color: #FAFAFA;

  width: calc(100% - 20px);
  height: 55px;

  border-radius: 5px;

  font-size: 50px;
  line-height: 0px;
  position: absolute;
  bottom: 5px;
  left: 10px;

  padding-bottom: 10px;
  :focus {
    outline-width: 0;
    background-color: #FFFFFF;
  }
`