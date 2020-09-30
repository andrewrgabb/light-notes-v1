import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// import initialData from './initial-data';
import initialDataEmpty from './initial-data-empty';

import Board from './board';

const Structure = styled.div`
  background-color: pink;
`;

const Content = styled.div`
  background-color: lightblue;
  position: absolute;
  top: 80px;
  bottom: 0;
  width: 100%; 
`;

const Header = styled.div`
  position: relative;
  height: 80px;
  text-align: left;
  font-size: 20px;
  background-color: white;
`;

const Title = styled.h1`
  position: absolute;
  width: 50%;
  float: left;
  padding-top: 15px;
  padding-left: 20px;
`;

const StyledButton = styled.button `
  position: absolute;
  border: 2px solid;
  background-color: white;
  
  width: 40px;
  height: 40px;

  font-size: 20px;
  line-height: 0px;

  margin-left: 50%;
  margin-top: 20px;
`

function App() {

  const [state, setState] = useState(initialDataEmpty);

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
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    // if type = notes
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    // Moving notes within the same column
    if (start === finish) {
      const newNoteIds = Array.from(start.noteIds);
      newNoteIds.splice(source.index, 1);
      newNoteIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        noteIds: newNoteIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
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

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

      setState(newState);
  };

  let addColumn = () => {

    let newColumnCount = state.columnCount + 1;

    let newColumnName = "column-" + newColumnCount;
    const newColumn = {
      id: newColumnName,
      title: 'Column ' + newColumnCount,
      noteIds: [],
    };
    
    const newColumnOrder = state.columnOrder;
    newColumnOrder.push(newColumnName);

    const newColumns = {
      ...state.columns,
      [newColumnName]: newColumn,
    }

    const newState = {
      ...state,
      columns: newColumns,
      columnOrder: newColumnOrder,
      columnCount: newColumnCount,
    }

    setState(newState);
  }

  let addNote = (columnId) => {

    let newNoteCount = state.noteCount + 1;

    let newNoteId = "note-" + newNoteCount;
    const newNote = {
      id: newNoteId,
      content: ['notable' + newNoteCount]
    };
    
    const columnToAppend = state.columns[columnId];
    const columnToAppendNoteIds = columnToAppend.noteIds;
    columnToAppendNoteIds.push(newNoteId);
    
    const newColumnToAppend = {
      ...columnToAppend,
      noteIds: columnToAppendNoteIds,
    }

    const newColumns = {
      ...state.columns,
      [columnId]: newColumnToAppend,
    }

    const newNotes = {
      ...state.notes,
      [newNoteId]: newNote,
    }

    const newState = {
      ...state,
      notes: newNotes,
      noteCount: newNoteCount,
      columns: newColumns,
    }

    setState(newState);
  }
  

  return (
    <Structure>
      <Header>
        <Title>
          Light Notes 
        </Title>
        <StyledButton onClick={addColumn}>
                +
        </StyledButton>
      </Header>
      <Content>
        <Board id="Board" notes={state.notes} columns={state.columns} columnOrder={state.columnOrder} onDragEnd={onDragEnd} addColumn={addColumn} addNote={(columnId) => addNote(columnId)} />
      </Content>
    </Structure>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);