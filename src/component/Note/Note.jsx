import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Container } from './styles';

const Note = (props) => {

  const { id, title, content } = props.note;

  return (
    <Draggable draggableId={id} index={props.index}>
    {(provided, snapshot) => (
      <Container
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      isDragging={snapshot.isDragging}
      onClick={props.openNoteMenu}
      >
        {title}
        <br/>
        {content}
      </Container>
    )}
    </Draggable>
  );
}

export default Note;