import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { getMenuIcon } from '../../images/menu.js'

import { Container, TopSection, NoteTitle, DropdownBox, Content } from './styles';

const Note = (props) => {

  const { id, title, content } = props.note;

  return (
    <Draggable draggableId={id} index={props.index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}>
        <TopSection>
          <NoteTitle id={`${id}-title`}>
            {title}
          </NoteTitle>
          <DropdownBox id={`${id}-dropdown`} onClick={(event) => {props.openNoteMenu(); event.stopPropagation();}}>
            {getMenuIcon()}
          </DropdownBox>
        </TopSection>
        <Content readOnly={true} value={content} />
      </Container>
    )}
    </Draggable>
  );
}

export default Note;