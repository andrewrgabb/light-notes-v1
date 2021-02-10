import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { getMenuIcon } from '../../images/menu.js'

import { Container, TopSection, TitleEditingTarget, NoteTitle, DropdownBox, Content } from './styles';

const Note = (props) => {

  const { id, title, content } = props.note;

  const { editing, setEditingToThis, saveNote} = props;

  // Determine whether or not the user is editing the note title.
  console.log(editing.noteTitle)
  const isEditingTitle = (editing.noteTitle === id);
  const isEditingContent = (editing.noteContent === id);

  const stopEditing = {
    columnTitle: '',
    noteTitle: '',
    noteContent: '',
  };

  const newEditingTitle = {
    columnTitle: '',
    noteTitle: id,
    noteContent: '',
  };

  const newEditingContent = {
    columnTitle: '',
    noteTitle: '',
    noteContent: id,
  };

  function handleEditingTitleOnClick(event) {

    const titleDom = event.target.parentNode.childNodes[1]
    const cursorPosition = (titleDom.value.length > 10000) ? titleDom.value.length : 10000;

    titleDom.focus()
    titleDom.selectionStart = titleDom.selectionEnd = cursorPosition; 
    titleDom.select()
    setEditingToThis(newEditingTitle)
  }

  function handleTitleChange(e) {

    const newTitle = e.target.value;

    if (newTitle.includes('\n')) {

      setEditingToThis(stopEditing)
      e.target.blur()

    } else if (newTitle.length < 26) {
      saveNote(id, newTitle, content);
    }
  }

  function handleContentChange(e) {

    const newContent = e.target.value;
    saveNote(id, title, newContent);
  }

  return (
    <Draggable draggableId={id} index={props.index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}>
        <TopSection>

          <TitleEditingTarget style={{display: `${isEditingTitle ? "none" : "block"}`}} onClick={(event) => {handleEditingTitleOnClick(event); event.stopPropagation();}}/>
          <NoteTitle id={`${id}-title`} onChange={handleTitleChange} value={title} onClick={(event) => {event.stopPropagation();}} />

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