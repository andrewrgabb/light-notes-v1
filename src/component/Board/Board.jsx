import React, { useMemo } from 'react';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from '../Column';

import { Container } from './styles';

const InnerList = (props) => {
  const { column, noteMap, index, addNote, openColumnMenu, openNoteMenu } = props;

  const notes = useMemo(
    () =>
    column.noteOrder.map(noteId => noteMap[noteId]),
    [column, noteMap]
  );
  
  return <Column id="Column" column={column} notes={notes} index={index} addNote={addNote} 
  openColumnMenu={openColumnMenu} openNoteMenu={(noteId) => openNoteMenu(noteId)}/>;
}

const Board = (props) => {

  if (! props.columnOrder) {
    return null
  }

  return (
    <DragDropContext onDragEnd={props.onDragEnd}>
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
            {props.columnOrder.map((columnId, index) => {
              const column = props.columns[columnId];
              return (
                <InnerList key={column.id} column={column} noteMap={props.notes} index={index} 
                  addNote={() => props.addNote(columnId)} openColumnMenu={() => props.openColumnMenu(columnId)} 
                  openNoteMenu={(noteId) => props.openNoteMenu(noteId)} />
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