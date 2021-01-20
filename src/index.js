import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// import initialData from './initial-data';
import initialNotes from './initial-notes';
import initialBoard from './initial-board';

import Board from './board';

import { v4 as uuidv4 } from 'uuid';

import Amplify, { API, graphqlOperation } from 'aws-amplify'

// Update
import { createNote, deleteNote } from './graphql/mutations'
import { createColumn, updateColumn, deleteColumn } from './graphql/mutations'
import { createColumnOrder, updateColumnOrder, deleteColumnOrder } from './graphql/mutations'

import { fetchNotes, fetchColumns, fetchColumnOrder } from './util/fetch'

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

  const [board, setBoard] = useState(initialBoard)

  const [notes, setNotes] = useState(initialNotes);

  // Count
  const [noteCount, setNoteCount] = useState(1);
  const [columnCount, setColumnCount] = useState(1);

  // Fetch Notes, Columns, and ColumnOrder
  useEffect(() => {
    //fetchData()
  }, [])

  async function fetchData() {
    try {

      await Promise.all([fetchNotes(), fetchColumns(), fetchColumnOrder()])
      /*.then(response => 
        {
          const newBoard = {
            notes: response[0],
            columns: response[1],
            columnOrder: response[2],
          }
          console.log(newBoard)
          setBoard(newBoard)
        }
      )*/
    }  catch (err) {
      console.log('error fetching data:', err)
    }
  };

  // Create Columns and Notes
  async function addColumn() {
    try {

      let newColumnCount = columnCount + 1;
  
      let id  = uuidv4();
      const newColumn = {
        id: id,
        name: 'Column ' + newColumnCount,
        noteOrder: [],
      };
      
      const newColumnOrder = board.columnOrder;
      newColumnOrder.ids.push(id);
  
      const newColumns = {
        ...board.columns,
        [id]: newColumn,
      }
  
      const newBoard = {
        ...board,
        columns: newColumns,
        columnOrder: newColumnOrder,
      }
  
      setBoard(newBoard);
  
      setColumnCount(newColumnCount)
  
      const jsonNoteOrder = JSON.stringify(newColumn.noteOrder)
  
      const jsonColumn = {
        ...newColumn,
        noteOrder: jsonNoteOrder,
      };

      const jsonIds = JSON.stringify(newColumnOrder.ids)

      const jsonColumnOrder = {
        ...newColumnOrder,
        ids: jsonIds,
      }

      //console.log(jsonColumn)
      //console.log(jsonColumnOrder)
  
      //await API.graphql(graphqlOperation(createColumn, {input: jsonColumn}))
  
      //await API.graphql(graphqlOperation(updateColumnOrder, {input: jsonColumnOrder}))

    } catch (err) {
      console.log('error adding column:')
      console.log(err)
    }
  }

  
  // Update Columns, and ColumnOrder



  // Delete Columns, Notes (To be added once the delete function is implemented in the GUI)




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
      const newColumnOrderIds = Array.from(board.columnOrder.ids);
      newColumnOrderIds.splice(source.index, 1);
      newColumnOrderIds.splice(destination.index, 0, draggableId);

      const newColumnOrder = {
        ...board.columnOrder,
        ids: newColumnOrderIds,
      };

      const newBoard = {
        ...board,
        columnOrder: newColumnOrder,
      }

      setBoard(newBoard)

      return;
    }

    // if type = notes
    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    // Moving notes within the same column
    if (start === finish) {
      const newNoteOrder = Array.from(start.noteOrder);
      newNoteOrder.splice(source.index, 1);
      newNoteOrder.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start, // or finish since they are the same column
        noteOrder: newNoteOrder,
      };

      const newColumns = {
        ...board.columns,
        [newColumn.id]: newColumn,
      };

      const newBoard = {
        ...board,
        columns: newColumns,
      }
  
      setBoard(newBoard);
      return;
    }

    // Moving notes from one column to another
    const startNoteOrder = Array.from(start.noteOrder);
    startNoteOrder.splice(source.index, 1);
    const newStart = {
      ...start,
      noteOrder: startNoteOrder,
    };

    const finishNoteOrder = Array.from(finish.noteOrder);
    finishNoteOrder.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      noteOrder: finishNoteOrder,
    };

    const newColumns = {
      ...board.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    const newBoard = {
      ...board,
      columns: newColumns,
    }

    setBoard(newBoard);
  };


  let addNote = (columnId) => {

    let newNoteCount = noteCount + 1;

    let newNoteId = uuidv4();
    const newNote = {
      id: newNoteId,
      content: ['Note ' + newNoteCount]
    };
    
    const columnToAppend = board.columns[columnId];
    const columnToAppendNoteOrder = columnToAppend.noteOrder;
    columnToAppendNoteOrder.unshift(newNoteId);
    
    const newColumnToAppend = {
      ...columnToAppend,
      noteOrder: columnToAppendNoteOrder,
    }

    const newColumns = {
      ...board.columns,
      [columnId]: newColumnToAppend,
    }

    const newBoard = {
      ...board,
      columns: newColumns,
    }

    setBoard(newBoard);

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
        <Board id="Board" notes={notes} columns={board.columns} columnOrder={board.columnOrder.ids} onDragEnd={onDragEnd} addNote={(columnId) => addNote(columnId)} />
      </Content>
    </Structure>
  );
  
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);