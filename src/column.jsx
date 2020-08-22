import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Note from './note';

const Container = styled.div`
  background-color: white;
  margin-top: 8px;
  margin-right: 8px;
  border-radius: 4px;
  width: 280px;
  
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  padding: 24px;
  text-align: center;
  font-size: 24px
`;
const NoteList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  flex-grow: 1;
  min-height: 10px;
`;

const StyledButton = styled.button `
  border: 2px solid;
  border-radius: 50%;
  background-color: white;
  
  width: 60px;
  height: 60px;

  padding-bottom: 6px;
  font-size: 50px;
  line-height: 0;
  margin: auto;
`

export default function(props) {

  /*const notes = useMemo(
    () =>
      props.notes.map((note, index) => (
        <Note key={note.id} note={note} index={index} />
      )),
    [props.notes]
  );*/

  const notes = (
    props.notes.map((note, index) => (
      <Note key={note.id} note={note} index={index} />
    ))
  );
      

  return (
    <Draggable draggableId={props.column.id} index={props.index} >
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>
            {props.column.title}
          </Title>
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
          <StyledButton onClick={props.addNote}>
            + 
          </StyledButton>
          
        </Container>
      )}
    </Draggable>
  ); 
}