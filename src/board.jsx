import React, { useMemo } from 'react';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from './column';

const Container = styled.div `
  display: flex;
`;

const ColumnContainer = styled.div`
  background-color: white;
  margin-top: 8px;
  margin-right: 8px;
  border-radius: 4px;
  width: 280px;
  height: 80px;

  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button `
  margin-top: 8px;
  border: 2px solid;
  border-radius: 50%;
  background-color: inherit;
  
  width: 60px;
  height: 60px;

  padding-bottom: 6px;
  font-size: 50px;
  
  display: flex;
  justify-content: center;
  align-items: center;
`

function InnerList(props) {
  const { column, noteMap, index, addNote } = props;
  const notes = useMemo(
    () =>
    column.noteIds.map(noteId => noteMap[noteId]),
    [column, noteMap]
  );
  return <Column column={column} notes={notes} index={index} addNote={addNote}/>;
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
                <InnerList key={column.id} column={column} noteMap={props.notes} index={index} addNote={() => props.addNote(columnId)}/>
              );
            })}
            {provided.placeholder}
            <ColumnContainer>
              <StyledButton onClick={props.addColumn}>
                +
              </StyledButton>
            </ColumnContainer>
          </Container>
        )}
      </Droppable>
      
    </DragDropContext>
  ); 
}