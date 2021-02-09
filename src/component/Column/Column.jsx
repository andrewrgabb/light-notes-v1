import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Note from '../Note';
import { getMenuIcon } from '../../images/menu.js'

import { Container, TopSection, ColumnTitle, DropdownBox, Content, NoteList, StyledButton } from './styles';

const Column = (props) => {

  const notes = (
    props.notes.map((note, index) => {
      if (note) {
        return <Note key={note.id} note={note} index={index} openNoteMenu={() => props.openNoteMenu(note.id)} />
      }
      return null
    })
  );
  
  return (
    <Draggable draggableId={props.column.id} index={props.index} >
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TopSection {...provided.dragHandleProps}>
            <ColumnTitle id={`${props.column.id} Title`}>
              {props.column.title}
            </ColumnTitle>
            <DropdownBox id={`${props.column.id}-dropdown`} onClick={(event) => {props.openColumnMenu(); event.stopPropagation();}}>
              {getMenuIcon()}
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

export default Column;