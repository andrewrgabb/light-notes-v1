import React, { useMemo } from 'react';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from './column';

const Container = styled.div `
  position: relative;

  background-color: purple;
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
    column.noteIds.map(noteId => noteMap[noteId]),
    [column, noteMap]
  );
  return <Column id="Column" column={column} notes={notes} index={index} addNote={addNote}/>;
}



export default function(props) {

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