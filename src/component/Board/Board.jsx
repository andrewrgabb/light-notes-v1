import React, { useMemo } from 'react';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from '../Column';

import { Container } from './styles';

const InnerList = (props) => {
  const { column, noteMap, index, addNote, openColumnMenu, openNoteMenu, editing, saveColumnTitle, setEditingToThis } = props;

  const notes = useMemo(
    () =>
    column.noteOrder.map(noteId => noteMap[noteId]),
    [column, noteMap]
  );
  
  return <Column id="Column" column={column} notes={notes} index={index} addNote={addNote} 
    openColumnMenu={openColumnMenu} openNoteMenu={(noteId) => openNoteMenu(noteId)} editing={editing}
    saveColumnTitle={(columnId, newTitle) => saveColumnTitle(columnId, newTitle)} setEditingToThis={(newEditing) => setEditingToThis(newEditing)}/>;
}

const Board = (props) => {

  const {onDragEnd, columnOrder, columns, notes, addNote, openColumnMenu, openNoteMenu,
    editing, saveColumnTitle, setEditingToThis} = props;

  if (! columnOrder) {
    return null
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId='board'
        direction='horizontal' 
        type='column'
      >
        {provided => (
          <Container id="Board"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columnOrder.map((columnId, index) => {
              const column = columns[columnId];
              return (
                <InnerList key={column.id} column={column} noteMap={notes} index={index} 
                  addNote={() => addNote(columnId)} openColumnMenu={() => openColumnMenu(columnId)} 
                  openNoteMenu={(noteId) => openNoteMenu(noteId)} editing={editing}
                  saveColumnTitle={(columnId, newTitle) => saveColumnTitle(columnId, newTitle)} 
                  setEditingToThis={(newEditing) => setEditingToThis(newEditing)}/>
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>

    </DragDropContext>
  );
}

export default Board;