import React, { useRef } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Note from '../Note';
import { getMenuIcon } from '../../images/menu.js'

import { Container, TopSection, EditingTarget, ColumnTitle, DropdownBox, Content, NoteList, StyledButton } from './styles';

const Column = (props) => {

  const { notes, column, editing, openNoteMenu, saveColumnTitle, setEditingToThis, saveNote, closeDropdown } = props;

  const { id, title } = column;

  const completedNotes = (
    notes.map((note, index) => {
      if (note) {
        return <Note key={note.id} note={note} index={index} openNoteMenu={() => openNoteMenu(note.id)} 
          editing={editing} setEditingToThis={(newEditing) => setEditingToThis(newEditing)}
          saveNote={(noteId, newTitle, newContent) => saveNote(noteId, newTitle, newContent)}
          closeDropdown={closeDropdown} />
      }
      console.log("Missing Note!")
      return null
    })
  );

  // Determine whether or not the user is editing the column title.
  
  const isEditing = (editing.columnTitle === id);

  const titleRef = useRef();

  if (!isEditing) {
    if (titleRef.current) {
      titleRef.current.blur()
    }
  }

  const stopEditing = {
    columnTitle: '',
    noteTitle: '',
    noteContent: '',
  };

  const newEditing = {
    columnTitle: id,
    noteTitle: '',
    noteContent: '',
  };

  function handleTitleChange(e) {

    const newTitle = e.target.value;

    if (newTitle.includes('\n')) {

      setEditingToThis(stopEditing)
      e.target.blur()

    } else if (newTitle.length < 26) {
      saveColumnTitle(id, newTitle);
    }
  }

  function handleEditingOnClick(event) {

    closeDropdown()

    const titleDom = event.target.parentNode.childNodes[1]
    const cursorPosition = (titleDom.value.length > 10000) ? titleDom.value.length : 10000;

    titleDom.focus()
    titleDom.selectionStart = titleDom.selectionEnd = cursorPosition; 

    if (titleDom.value.substr(0, 11) === 'New Column ') {
      titleDom.select()
    }
    
    setEditingToThis(newEditing)
  }

  return (
    <Draggable draggableId={id} index={props.index} >
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TopSection {...provided.dragHandleProps} id={`top-section`} onClick={(event) => {event.stopPropagation();}}>
            <EditingTarget style={{display: `${isEditing ? "none" : "block"}`}} onClick={(event) => {handleEditingOnClick(event); event.stopPropagation();}}/>
            <ColumnTitle id={`${id}-title`} ref={titleRef} onChange={handleTitleChange} value={title} onClick={(event) => {event.stopPropagation();}} />
            <DropdownBox id={`${id}-dropdown`} onClick={(event) => {props.openColumnMenu(); event.stopPropagation();}}>
              {getMenuIcon()}
            </DropdownBox>
          </TopSection>
          
          <Content id={`content`}>
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