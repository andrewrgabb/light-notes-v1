import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  background-color: #FAFAFA;

  min-width: 380px;

  display: flex;
  flex-direction: column;
  height:100%;

  margin-left: 8px;
  margin-right: 8px;

  border-left: 4px solid #222222;
  border-right: 4px solid #222222;

  border-radius: 10px;
`

export const TopSection = styled.div `
  background-color: DodgerBlue;
  height: 40px;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
`

export const ColumnTitle = styled.input`
  text-align: center;
  font-size: 20px;
  color: black;
  margin-top: 6px;
  margin-left: 16px;
  width: 100%;
  text-align: left;
  padding-left: 10px;
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

export const Content = styled.div`
  position: relative;
  overflow: scroll;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 70px;
  min-height: calc(100% - 140px);
`

export const NoteList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'DodgerBlue' : 'inherit')};
  flex-grow: 1;
  min-height: calc(100% - 16px);
`

export const StyledButton = styled.button `
  border: 2px solid;
  background-color: #FAFAFA;

  margin-left: 10px;
  margin-bottom: 5px;
  width: calc(100% - 20px);
  height: 55px;

  border-radius: 5px;

  font-size: 50px;
  line-height: 0px;
  position: absolute;
  bottom: 0px;
`