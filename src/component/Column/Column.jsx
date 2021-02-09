import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Note from '../Note';
import { getMenuIcon } from '../../images/menu.js'

import { Container, TopSection, ColumnTitle, DropdownBox, Content, NoteList, StyledButton } from './styles';

const Column = (props) => {

  const {notes, column} = props;

  const {id, title} = column;

  const completedNotes = (
    notes.map((note, index) => {
      if (note) {
        return <Note key={note.id} note={note} index={index} openNoteMenu={() => props.openNoteMenu(note.id)} />
      }
      console.log("Missing Note!")
      return null
    })
  );
  
  return (
    <Draggable draggableId={id} index={props.index} >
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TopSection {...provided.dragHandleProps} id={`top-section`}>
            <ColumnTitle id={`${id}-title`}>
              {title}
            </ColumnTitle>
            <DropdownBox id={`${id}-dropdown`} onClick={(event) => {props.openColumnMenu(); event.stopPropagation();}}>
              {getMenuIcon()}
            </DropdownBox>
          </TopSection>
          
          <Content>
            <Droppable droppableId={id}>
              {(provided, snapshot) => (
              <NoteList
                ref={provided.innerRef} 
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {completedNotes}
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