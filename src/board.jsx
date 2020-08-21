import React, { useMemo } from 'react';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from './column';

const Container = styled.div `
  display: flex;
`;

function InnerList(props) {
  const { column, noteMap, index } = props;
  const notes = useMemo(
    () =>
    column.noteIds.map(noteId => noteMap[noteId]),
    [column, noteMap]
  );
  return <Column column={column} notes={notes} index={index} />;
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
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef} 
          >
            {props.columnOrder.map((columnId, index) => {
              const column = props.columns[columnId];
              return (
                <InnerList key={column.id} column={column} noteMap={props.notes} index={index} />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  ); 
}