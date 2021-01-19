import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// import initialData from './initial-data';
import initialDataEmpty from './initial-data-empty';

import Board from './board';

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const Structure = styled.div`
`;

const Content = styled.div`
  background-color: white;
  position: absolute;
  top: 80px;
  bottom: 0;
  width: 100%; 
`;

const Header = styled.div`
  position: relative;
  height: 80px;
  text-align: left;
  left: 10px;
  font-size: 20px;
  background-color: white;
`;

const Title = styled.h1`
  position: absolute;
  width: 50%;
  float: left;
  padding-top: 15px;
  padding-left: 20px;
  color: black;
`;

const StyledButton = styled.button `
  position: absolute;
  border: 2px solid;
  background-color: white;
  
  width: 240px;
  height: 40px;

  font-size: inherit;

  right: 20px;
  margin-top: 20px;

  border-radius: 5px;
  color: black;
`

function App() {

  const [notes, setNotes] = useState(initialDataEmpty.notes);

  const [noteCount, setNoteCount] = useState(initialDataEmpty.noteCount);

  const [columns, setColumns] = useState(initialDataEmpty.columns);

  const [columnCount, setColumnCount] = useState(initialDataEmpty.columnCount);

  const [columnOrder, setColumnOrder] = useState(initialDataEmpty.columnOrder);
  

  let onDragEnd = result => {
    const { destination, source, draggableId, type} = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setColumnOrder(newColumnOrder);
      return;
    }

    // if type = notes
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // Moving notes within the same column
    if (start === finish) {
      const newNoteIds = Array.from(start.noteIds);
      newNoteIds.splice(source.index, 1);
      newNoteIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        noteIds: newNoteIds,
      };

      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newColumns)
      return;
    }

    // Moving notes from one column to another
    const startNoteIds = Array.from(start.noteIds);
    startNoteIds.splice(source.index, 1);
    const newStart = {
      ...start,
      noteIds: startNoteIds,
    };

    const finishNoteIds = Array.from(finish.noteIds);
    finishNoteIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      noteIds: finishNoteIds,
    };

    const newColumns = {
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    setColumns(newColumns)
  };

  let addColumn = () => {

    let newColumnCount = columnCount + 1;

    let newColumnName = "column-" + newColumnCount;
    const newColumn = {
      id: newColumnName,
      title: 'Column ' + newColumnCount,
      noteIds: [],
    };
    
    const newColumnOrder = columnOrder;
    newColumnOrder.push(newColumnName);

    setColumnOrder(newColumnOrder)

    const newColumns = {
      ...columns,
      [newColumnName]: newColumn,
    }

    setColumns(newColumns)

    setColumnCount(newColumnCount)
  }

  let addNote = (columnId) => {

    let newNoteCount = noteCount + 1;

    let newNoteId = "note-" + newNoteCount;
    const newNote = {
      id: newNoteId,
      content: ['Note ' + newNoteCount]
    };
    
    const columnToAppend = columns[columnId];
    const columnToAppendNoteIds = columnToAppend.noteIds;
    columnToAppendNoteIds.unshift(newNoteId);
    
    const newColumnToAppend = {
      ...columnToAppend,
      noteIds: columnToAppendNoteIds,
    }

    const newColumns = {
      ...columns,
      [columnId]: newColumnToAppend,
    }

    setColumns(newColumns)

    const newNotes = {
      ...notes,
      [newNoteId]: newNote,
    }

    setNotes(newNotes)

    setNoteCount(newNoteCount)
  }
  

  return (
    <Structure>
      <Header>
        <Title>
          Light Notes 
        </Title>
        <StyledButton onClick={addColumn}>
          Add Column
        </StyledButton>
      </Header>
      <Content>
        <Board id="Board" notes={notes} columns={columns} columnOrder={columnOrder} onDragEnd={onDragEnd} addColumn={addColumn} addNote={(columnId) => addNote(columnId)} />
      </Content>
    </Structure>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);