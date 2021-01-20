import React, { useMemo } from 'react';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from './column';

const Container = styled.div `
  position: relative;
  display: flex;
  height: 100%;
  margin-left: 20px;
  margin-right: 20px;

  overflow: auto;
`;

function InnerList(props) {
  const { column, noteMap, index, addNote } = props;

  const notes = useMemo(
    () =>
    column.noteOrder.map(noteId => noteMap[noteId]),
    [column, noteMap]
  );
  
  return <Column id="Column" column={column} notes={notes} index={index} addNote={addNote}/>;
}

/*
const notes = useMemo(
    () =>
    { var noteSelection = [];
      for (var i = 0; i < column.noteOrder.length; i ++) {
        let noteId = column.noteOrder[i];
        const tempNote = noteMap[noteId]
        if (tempNote) {
          noteSelection.unshift(tempNote)
        } else {
          const fillerNote = {
            id: noteId,
            content: 'loading...',
          }
          noteSelection.unshift(fillerNote)
        }
      }
      return noteSelection;
    },
    [column, noteMap]
  );
  */

export default function(props) {

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
                <InnerList key={column.id} column={column} noteMap={props.notes} index={index} addNote={() => props.addNote(columnId)}/>
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>

    </DragDropContext>
  );
}