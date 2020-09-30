import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Note from './note';

const Container = styled.div`
  position: relative;
  background-color: orange;
  margin-right: 8px;
  border-radius: 4px;
  min-width: 280px;
  
  display: flex;
  flex-direction: column;
  height:100%
`;

const Title = styled.h2`
  background-color: blue;
  padding: 24px;
  text-align: center;
  font-size: 24px
`;

const Content = styled.div`
  background-color: grey;
  overflow: auto;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 70px;
  min-height: 150px;
`;

const NoteList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  flex-grow: 1;
  min-height: 10px;
`;

const StyledButton = styled.button `
  border: 2px solid;
  background-color: white;
  
  width: 100%;
  height: 60px;

  font-size: 50px;
  line-height: 0px;
  position: absolute;
  bottom: 0px;
`

export default function(props) {
  const notes = (
    props.notes.map((note, index) => (
      <Note key={note.id} note={note} index={index} />
    ))
  );
      
  return (
    <Draggable draggableId={props.column.id} index={props.index} >
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>
            {props.column.title}
          </Title>
          <Content>
            <Droppable droppableId={props.column.id}>
              {(provided, snapshot) => (
              <NoteList
                ref={provided.innerRef} 
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {notes}
                {provided.placeholder}
              </NoteList>
              )}
            </Droppable>
          </Content>
          <StyledButton onClick={props.addNote}>
            + 
          </StyledButton>
          
        </Container>
      )}
    </Draggable>
  ); 
}