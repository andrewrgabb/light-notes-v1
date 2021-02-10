import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  border: 3px solid darkgrey;
  border-radius: 2px;

  margin-left: 4px;
  margin-right: 4px;
  margin-top: 4px;
  margin-bottom: 16px;

  background-color: ${props => (props.isDragging ? '#C4E1FF' : 'white')};
  min-height: 120px;

  border-radius: 8px;
  color: black;

  &: focus {
    outline: none;
    border-color: darkgreen;
  }
`;

export const TopSection = styled.div `
  background-color: #c8baff;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  cursor: default;
`

export const NoteTitle = styled.textarea`
  font-size: 16px;
  color: black;
  width: 100%;
  padding-left: 6px;
  overflow: hidden;

  margin-top: 6px;
  margin-bottom: 6px;
  margin-left: 6px;
  margin-right: 40px;

  padding-top: 4px;

  border: none;
  display: block;
  resize: none;

  background-color: transparent;

  :focus {
    background-color: white;
    box-shadow: inset 0 0 0 2px #0079bf;
    border-radius: 3px;
    cursor: text;
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
  top: 3px;
  right: 2px;

  width: 28px;
  height: 28px;

  padding-top: 4px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;

  border-radius: 5px;

  display: block;

  :hover {
    background-color: #1873CC; 
  }
  cursor: pointer;
`

export const Content = styled.textarea`
  padding: 10px;
  margin-top: 2px;
  position: relative;
  max-width: 100%;
  min-width: calc(100% - 6px - 16px);
  min-height: 120px;
  resize: none;
  border: none;
  :focus {
    outline-width: 0;
  }

  background-color: inherit;
`