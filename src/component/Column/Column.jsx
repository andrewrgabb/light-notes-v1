import React, { useEffect, useRef, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Note from '../Note';
import CloseIcon from '@material-ui/icons/Close';

import { Container, TopSection, EditingTarget, ColumnTitle, DropdownBox, Content, NoteList, StyledButton } from './styles';

const Column = (props) => {

  const { notes, column, editing, removeColumn, removeNote, saveColumnTitle, setEditingToThis, saveNote } = props;

  const { id, title } = column;

  const titleRef = useRef();

  useEffect(() => {
    window.setTimeout(updateTitleHeight(), 0);
  },[])

  const [titleHeight, setTitleHeight] = useState(24);

  const completedNotes = (
    notes.map((note, index) => {
      if (note) {
        return <Note key={note.id} note={note} index={index} removeNote={() => removeNote(note.id)} 
          editing={editing} setEditingToThis={(newEditing) => setEditingToThis(newEditing)}
          saveNote={(noteId, newTitle, newContent) => saveNote(noteId, newTitle, newContent)} />
      }
      console.log("Missing Note!")
      return null
    })
  );

  // Determine whether or not the user is editing the column title.
  
  const isEditing = (editing.columnTitle === id);

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

    } else {
      saveColumnTitle(id, newTitle);
      window.setTimeout(updateTitleHeight(), 0);
    }
  }

  const updateTitleHeight = () => {

    const titleDom = titleRef.current;

    titleDom.style.height = 'auto';

    const newHeight = titleDom.scrollHeight

    titleDom.style.height = newHeight+'px';

    setTitleHeight(newHeight);
  }

  function handleEditingOnClick(event) {

    const titleDom = event.target.parentNode.childNodes[1]
    const cursorPosition = (titleDom.value.length > 10000) ? titleDom.value.length : 10000;

    titleDom.focus()
    titleDom.selectionStart = titleDom.selectionEnd = cursorPosition; 

    if (titleDom.value.substr(0, 11) === 'New Column ') {
      titleDom.select()
    }
    
    setEditingToThis(newEditing)
  }
  //style={{height: `${titleRef.current.height}px`}}
  return (
    <Draggable draggableId={id} index={props.index} >
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TopSection {...provided.dragHandleProps}  id={`top-section`} onClick={(event) => {event.stopPropagation();}}>
            <EditingTarget style={{display: `${isEditing ? "none" : "block"}`}} onClick={(event) => {handleEditingOnClick(event); event.stopPropagation();}}/>
            <ColumnTitle id={`${id}-title`} ref={titleRef} rows="1" onChange={handleTitleChange} value={title} onClick={(event) => {event.stopPropagation();}} />
            <DropdownBox id={`${id}-dropdown`} onClick={(event) => {removeColumn(); event.stopPropagation();}}>
              <CloseIcon style={{fontSize: "28"}} />
            </DropdownBox>
          </TopSection>
          
          <Content id={`content`} style={{top: `${titleHeight + 28}px`}} >
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