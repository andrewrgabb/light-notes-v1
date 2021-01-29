import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Container } from './styles';

const Note = (props) => {
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

export default Note;