import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.button `
  border: none;
  background-color: grey;
  padding: 8px;
  margin-bottom: 8px;
  height: 100px;
  width: 264px;
  
  text-align: center;
  font-size: 50px;
`

export default function(props) {
  return (
    <Draggable>
    {(provided, snapshot) => (
      <Container 
      onClick={props.addNote}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      isDragging={snapshot.isDragging}
      >
      +
      </Container>
    )}
    </Draggable>
  );
}