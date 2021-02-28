import React, { useMemo } from 'react';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from '../Column';

import { Container } from './styles';

const InnerList = (props) => {
  const { column, noteMap, index, addNote, removeColumn, removeNote,
     editing, setEditingToThis, saveColumnTitle, saveNote } = props;

  const notes = useMemo(
    () =>
    column.noteOrder.map(noteId => noteMap[noteId]),
    [column, noteMap]
  );
  
  return <Column id="Column" column={column} notes={notes} index={index} addNote={addNote} 
    removeColumn={removeColumn} removeNote={(noteId) => removeNote(noteId)} editing={editing}
    setEditingToThis={(newEditing) => setEditingToThis(newEditing)}
    saveColumnTitle={(columnId, newTitle) => saveColumnTitle(columnId, newTitle)} 
    saveNote={(noteId, newTitle, newContent) => saveNote(noteId, newTitle, newContent)} />;
}

const Board = (props) => {

  const {onDragEnd, columnOrder, columns, notes, addNote, removeColumn, removeNote,
    editing, setEditingToThis, saveColumnTitle, saveNote } = props;

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
                  addNote={() => addNote(columnId)} removeColumn={() => removeColumn(columnId)} 
                  removeNote={(noteId) => removeNote(noteId)} editing={editing}
                  setEditingToThis={(newEditing) => setEditingToThis(newEditing)}
                  saveColumnTitle={(columnId, newTitle) => saveColumnTitle(columnId, newTitle)} 
                  saveNote={(noteId, newTitle, newContent) => saveNote(noteId, newTitle, newContent)} />
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