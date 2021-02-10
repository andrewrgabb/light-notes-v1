import styled from 'styled-components';

export const Container = styled.div`
  border: 3px solid darkgrey;
  border-radius: 2px;

  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 8px;

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
  background-color: #6FB8FF;
  height: 40px;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
`

export const NoteTitle = styled.div`
  font-size: 20px;
  color: black;
  margin-top: 6px;
  width: 100%;
  padding-left: 6px;
  overflow: hidden;
`

export const DropdownBox = styled.div `
  float: right;
  opacity: 100%;
  width: 30px;
  height: 34px;

  padding-left: 4px;
  padding-top: 6px;
  padding-right: 4px;

  border-radius: 5px;

  :hover {
    background-color: #1873CC; 
  }
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