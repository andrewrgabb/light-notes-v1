import React, { useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CloseIcon from '@material-ui/icons/Close';

import { Container, ShowHide, TopSection, TitleEditingTarget, NoteTitle, DropdownBox,
   ContentSection, ContentEditingTarget, Content, ButtonSection, StyledButton } from './styles';

const Note = (props) => {

  const { id, title, content } = props.note;

  const { editing, setEditingToThis, saveNote, removeNote } = props;


  const showHideRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    window.setTimeout(updateTitleHeight(), 0);
  },[])

  // Determine whether or not the user is editing the note title.
  const isEditingTitle = (editing.noteTitle === id);
  const isEditingContent = (editing.noteContent === id);

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

    const titleDom = event.target.parentNode.childNodes[1]
    const cursorPosition = (titleDom.value.length > 10000) ? titleDom.value.length : 10000;

    titleRef.current.focus()
    titleDom.selectionStart = titleDom.selectionEnd = cursorPosition;

    if (titleDom.value.substr(0, 9) === 'New Note ') {
      titleDom.select()
    }
    
    setEditingToThis(newEditingTitle)
  }

  function handleTitleChange(e) {

    const newTitle = e.target.value;

    if (newTitle.includes('\n')) {

      setEditingToThis(stopEditing)
      e.target.blur()

    } else {
      saveNote(id, newTitle, content);
      window.setTimeout(updateTitleHeight(), 0);
    }
  }

  const updateTitleHeight = () => {

    const titleDom = titleRef.current;

    titleDom.style.height = 'auto';

    const newHeight = titleDom.scrollHeight

    titleDom.style.height = newHeight+'px';

    const showHideDom = showHideRef.current;
    showHideDom.style.opacity = 1;
  }

  function handleEditingContentOnClick(event) {

    const contentDom = event.target.parentNode.childNodes[1]
    const cursorPosition = (contentDom.value.length > 10000) ? contentDom.value.length : 10000;

    contentDom.focus()
    contentDom.selectionStart = contentDom.selectionEnd = cursorPosition;

    if (contentDom.value === 'Enter details here...') {
      contentDom.select()
    }

    setEditingToThis(newEditingContent)
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
        <ShowHide id="show-hide" ref={showHideRef}>
        <TopSection>
          <TitleEditingTarget style={{display: `${isEditingTitle ? "none" : "block"}`}} onClick={(event) => {handleEditingTitleOnClick(event); event.stopPropagation();}}/>
          <NoteTitle id={`${id}-title`} ref={titleRef} rows="1" onChange={handleTitleChange} value={title} onClick={(event) => {event.stopPropagation();}} />

          <DropdownBox id={`${id}-dropdown`} onClick={(event) => {removeNote(); event.stopPropagation();}}>
            <CloseIcon style={{fontSize: "20"}} />
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
      </ShowHide>
      </Container>
    )}
    </Draggable>
  );
}

export default Note;