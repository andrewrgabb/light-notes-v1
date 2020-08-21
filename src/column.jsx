import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Note from './note';

const Container = styled.div`
  background-color: white;
  margin-top: 8px;
  margin-right: 8px;
  border-right: 2px solid;
  border-left: 2px solid;
  border-radius: 2px;
  width: 280px;


  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  padding: 8px;
  text-align: center;
`;
const NoteList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;
const StyledButton = styled.button `
  border: 3px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  height: 100px;
  width: 264px;
  
  text-align: center;
  font-size: 50px;
`

export default function(props) {

  const notes = useMemo(
    () =>
      props.notes.map((note, index) => (
        <Note key={note.id} note={note} index={index} />
      )),
    [props.notes]
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
              <StyledButton onClick={props.addNote}> 
                +
              </StyledButton>
            </NoteList>
            )}
          </Droppable>
          
        </Container>
      )}
    </Draggable>
  ); 
}