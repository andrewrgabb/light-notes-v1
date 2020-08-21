import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// import initialData from './initial-data';
import initialDataEmpty from './initial-data-empty';

import Board from './board';

const Structure = styled.div`
  padding: 20px;
}
`;

const Header = styled.div`
  padding: 20px;
  text-align: center;
  border: 2px solid;
`;

function App() {

  const [state, setState] = useState(initialDataEmpty);
  const [columnCount, setColumnCount] = useState(1);
  const [noteCount, setNoteCount] = useState(1);

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
    let newColumnCount = columnCount + 1;
    setColumnCount(newColumnCount);
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
    }

    setState(newState);
  }

  let addNote = (columnId) => {

    let newNoteCount = noteCount + 1;
    setNoteCount(newNoteCount);
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
      columns: newColumns,
    }

    setState(newState);
  }

  return (
    <Structure>
      <Header id="Header" >
        <h1>
          Light Notes    
        </h1>
        <button onClick={addColumn}>
          Add a Column!
        </button>
      </Header>
      <Board notes={state.notes} columns={state.columns} columnOrder={state.columnOrder} onDragEnd={onDragEnd} addNote={(columnId) => addNote(columnId)} />
    </Structure>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);