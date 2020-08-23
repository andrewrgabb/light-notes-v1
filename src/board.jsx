import React, { useMemo } from 'react';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from './column';

const Container = styled.div `
  display: flex;
  height: 100%;
`;

const ColumnContainer = styled.div`
  background-color: white;
  margin-right: 8px;
  border-radius: 4px;
  width: 280px;

  display: flex;
  justify-content: center;
  height: 100%;
`;

const StyledButton = styled.button `
  margin-top: 8px;
  border: 2px solid;
  border-radius: 50%;
  background-color: inherit;
  
  width: 60px;
  height: 60px;

  position: relative;
  padding: 20px;
  bottom: 0;

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
            <ColumnContainer id="Column Container">
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