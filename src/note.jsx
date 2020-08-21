import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 3px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  min-height: 100px;

  &: focus {
    outline: none;
    border-color: darkgreen;
  }
`;

export default function(props) {
  return (
    <Draggable draggableId={props.note.id} index={props.index}>
    {(provided, snapshot) => (
      <Container
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      isDragging={snapshot.isDragging}
      >
      {props.note.content}
      </Container>
    )}
    </Draggable>
  );
}