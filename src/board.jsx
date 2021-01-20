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

  console.log("noteOrder")
  console.log(column)
  console.log(Array.isArray(column.noteOrder))

  if (column.noteOrder.length > 0) {
    const notes = column.noteOrder.map(noteId => noteMap[noteId]);
    return <Column id="Column" column={column} notes={notes} index={index} addNote={addNote}/>;
  } else {
    const notes = [];
    return <Column id="Column" column={column} notes={notes} index={index} addNote={addNote}/>;
  }
  // useMemo for [column, noteMap] removed here due to incompatibility with an empty array
}



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