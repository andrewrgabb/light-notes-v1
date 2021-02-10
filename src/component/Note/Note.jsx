import React, { useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { getMenuIcon } from '../../images/menu.js'

import { Container, TopSection, TitleEditingTarget, NoteTitle, DropdownBox,
   ContentSection, ContentEditingTarget, Content, ButtonSection, StyledButton } from './styles';

const Note = (props) => {

  const { id, title, content } = props.note;

  const { editing, setEditingToThis, saveNote, closeDropdown, openNoteMenu } = props;

  // Determine whether or not the user is editing the note title.
  const isEditingTitle = (editing.noteTitle === id);
  const isEditingContent = (editing.noteContent === id);

  const titleRef = useRef();
  const contentRef = useRef();

  if (!isEditingTitle) {
    if (titleRef.current) {
      titleRef.current.blur()
    }
  }

  if (!isEditingContent) {
    if (contentRef.current) {
      contentRef.current.blur()
    }
  }

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

    closeDropdown()

    const titleDom = event.target.parentNode.childNodes[1]
    const cursorPosition = (titleDom.value.length > 10000) ? titleDom.value.length : 10000;

    titleRef.current.focus()
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

  function handleEditingContentOnClick(event) {

    closeDropdown()

    const contentDom = event.target.parentNode.childNodes[1]
    const cursorPosition = (contentDom.value.length > 10000) ? contentDom.value.length : 10000;

    contentDom.focus()
    contentDom.selectionStart = contentDom.selectionEnd = cursorPosition;
    if (contentDom.value === 'Enter details here...') {
      contentDom.select()
    }
    setEditingToThis(newEditingContent)
  }

  const numRows = (content) => {


    const lines = content.split('\n');
    const n = lines.length

    let rowCount = 0

    for (let i = 0; i < n; i++) {
      const line = lines[i]
      const rows = Math.ceil(line.length / 31)
      if (rows < 1) {
        rowCount ++;
      } else {
        rowCount += rows;
      }
    }
    return rowCount
  }

  function handleContentChange(e) {

    const newContent = e.target.value;

    if (numRows(newContent) < 9) {
      
      saveNote(id, title, newContent);
    }
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
          <NoteTitle id={`${id}-title`} ref={titleRef} onChange={handleTitleChange} value={title} onClick={(event) => {event.stopPropagation();}} />

          <DropdownBox id={`${id}-dropdown`} onClick={(event) => {openNoteMenu(); event.stopPropagation();}}>
            {getMenuIcon()}
          </DropdownBox>

        </TopSection>
        <ContentSection>
            <ContentEditingTarget style={{display: `${isEditingContent? "none" : "block"}`}} onClick={(event) => {handleEditingContentOnClick(event); event.stopPropagation();}}/>
            <Content id={`${id}-content`} ref={contentRef} onChange={handleContentChange} value={content} onClick={(event) => {event.stopPropagation();}} />
        </ContentSection>
        <ButtonSection style={{display: `${isEditingContent? "block" : "none"}`}}>
          <StyledButton onClick={(event) => {setEditingToThis(stopEditing); event.stopPropagation();}}>
            Done
          </StyledButton>
        </ButtonSection>
      </Container>
    )}
    </Draggable>
  );
}

export default Note;