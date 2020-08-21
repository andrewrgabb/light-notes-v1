import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import initialData from './initial-data';

import Board from './board';

const Structure = styled.div`
  padding: 20px;
}
`;

const Header = styled.h1`
  padding: 20px;
  text-align: center;
  border: 2px solid;
`;

function App() {

  const [state, setState] = useState(initialData);

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

  return (
    <Structure>
      <Header id="Header">
        Light Notes
      </Header>
      <Board notes={state.notes} columns={state.columns} columnOrder={state.columnOrder} onDragEnd={onDragEnd}/>
    </Structure>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);