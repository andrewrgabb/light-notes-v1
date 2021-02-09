import React from 'react';

import { Box, Title, Content, Button } from './styles';

const NoteEditor = ( props ) => {

  const {settings} = props;

  const {noteId, open, x, y, width, height, title, content, updateNoteContent, saveNote} = settings; //saveColumnTitle

  //console.log(title)

  function handleTitleChange(e) {
    updateNoteContent(noteId, e.target.value, content)
  }

  function handleContentChange(e) {
    updateNoteContent(noteId, e.target.value)
  }

  function handleOnClick() {
    saveNote(noteId, title, content)
  }

  //console.log({noteId, open})

  const noteEditor = open ? 
    <Box style={{left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px`}}
      onClick={(event) => {event.stopPropagation();}}>
        Edit Note Title
      <Title onChange={handleTitleChange} 
        value={title} />
        Edit Note Content
      <Content onChange={handleContentChange} 
        value={content} />
      <Button onClick={handleOnClick}>
        Save
      </Button>
    </Box>
  : null;

  return noteEditor;
}
export default NoteEditor;