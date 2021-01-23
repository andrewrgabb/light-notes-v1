import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Note from './note';
import { getMenu } from './images/menu.js'

const Container = styled.div`
  position: relative;
  background-color: white;
  
  min-width: 380px;
  
  display: flex;
  flex-direction: column;
  height:100%;
  
  margin-left: 8px;
  margin-right: 8px;

  border-left: 4px solid black;
  border-right: 4px solid black;

  border-radius: 5px;

`

const TopSection = styled.div `
  background-color: DodgerBlue;
  max-height: 60px;
  padding: 16px;
`

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  color: black;
  float: left;
  display:inline-block;
`

const DropdownBox = styled.div `
  background-color: transparent;
  opacity: 100%;
  width: 35px;
  height: 35px;
  float: right;
  display:inline-block;
`

const Content = styled.div`
  position: relative;
  overflow: scroll;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 70px;
  min-height: calc(100% - 140px);
`

const NoteList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'DodgerBlue' : 'inherit')};
  flex-grow: 1;
  min-height: calc(100% - 16px);
`

const StyledButton = styled.button `
  border: 2px solid;
  background-color: white;
  
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

const menuClick = () => {
  console.log("menu!")
}

export default function(props) {

  const notes = (
    props.notes.map((note, index) => {
      if (note) {
        return <Note key={note.id} note={note} index={index} />
      }
      return null
    })
  );
      
  return (
    <Draggable draggableId={props.column.id} index={props.index} >
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TopSection {...provided.dragHandleProps}>
            <Title >
              {props.column.name}
            </Title>
            <DropdownBox id="dropdown" onClick={menuClick}>
              {getMenu()}
            </DropdownBox>
          </TopSection>
          
          <Content>
            <Droppable droppableId={props.column.id}>
              {(provided, snapshot) => (
              <NoteList
                ref={provided.innerRef} 
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {notes}
                {provided.placeholder}
              </NoteList>
              )}
            </Droppable>
          </Content>
          <StyledButton onClick={props.addNote}>
            + 
          </StyledButton>
          
        </Container>
      )}
    </Draggable>
  ); 
}