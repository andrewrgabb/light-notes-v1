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
import { createNote } from './graphql/mutations'
import { updateBoard } from './graphql/mutations'

import { fetchNotes, fetchBoard, resetDatabase } from './util/fetch'

// Subscribe
import { onUpdateBoard, onCreateNote } from './graphql/subscriptions'

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

const ResetButton = styled.button `
  position: absolute;
  border: 2px solid;
  background-color: white;
  
  width: 120px;
  height: 40px;

  font-size: inherit;

  right: 300px;
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
    fetchData()
    subscribeToBoardUpdates()
    subscribeToNoteUpdates()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log({notes})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  const subscribeToBoardUpdates = async() => {
    API.graphql(
      graphqlOperation(onUpdateBoard)
    ).subscribe({
      next: ({ value }) => {
  
        const data = value.data.onUpdateBoard;
  
        const id = data.id
        const json = JSON.parse(data.json)
  
        const newBoard = {
          id: id,
          columns: json.columns,
          columnOrder: json.columnOrder,
        }

        //console.log({board})
  
        setBoard(newBoard)
  
        //console.log({ data, newBoard });
      },
      error: error => {
        console.warn(error);
      }
    });
  }

  const subscribeToNoteUpdates = async() => {
    API.graphql(
      graphqlOperation(onCreateNote)
    ).subscribe({
      next: ({ provider, value }) => {
        updateNotes()
      },
      error: error => {
        console.warn(error);
      }
    });
  }

  const reset = () => {

    const id = board.id

    const newBoard = {
      ...initialBoard,
      id: id,
    }

    setBoard(newBoard)
    setNotes(initialNotes)
    resetDatabase()
  }

  const fetchData = async() => {
    try {

      await Promise.all([fetchNotes(), fetchBoard()])
      .then(response => 
        {
          const newNotes = response[0]
          setNotes(newNotes)

          const newBoard = response[1]
          setBoard(newBoard)
        }
      )
    }  catch (err) {
      console.log('error fetching data', err)
    }
  }

  const updateNotes = async() => {
    try {

      await Promise.all([fetchNotes()])
      .then(response => 
        {
          const newNotes = response[0]
          setNotes(newNotes)
        }
      )
    }  catch (err) {
      console.log('error fetching notes', err)
    }
  }

  const uploadBoard = async(newBoard) => {
    try {

      const jsonBoard = JSON.stringify(newBoard)

      const inputBoard = {
        id: board.id,
        json: jsonBoard,
      }

      //console.log(inputBoard)
  
      await API.graphql(graphqlOperation(updateBoard, {input: inputBoard}))

    } catch (err) {
      console.log('error updating board:')
      console.log(err)
    }
  }

  const uploadNote = async(newNote) => {
    try {

      //console.log(newNote)
  
      await API.graphql(graphqlOperation(createNote, {input: newNote}))

    } catch (err) {
      console.log('error creating note:')
      console.log(err)
    }
  }

  // Subscriptions

  // UpdateBoard and CreateNote (for now)

  // Subscribe to note creation
  //(async () => {
  
  //})();

  // Create Columns and Notes
  const addColumn = () => {
    const newColumnCount = columnCount + 1;

    const id  = uuidv4();
    const newColumn = {
      id: id,
      name: 'Column ' + newColumnCount,
      noteOrder: [],
    };
    
    const newColumnOrder = board.columnOrder;
    newColumnOrder.push(id);

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

    uploadBoard(newBoard)
  }

  const onDragEnd = (result) => {
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
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newBoard = {
        ...board,
        columnOrder: newColumnOrder,
      }

      setBoard(newBoard)
      uploadBoard(newBoard)

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
      uploadBoard(newBoard)
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
    uploadBoard(newBoard)
  };


  const addNote = (columnId) => {

    const newNoteCount = noteCount + 1;

    const newNoteId = uuidv4();
    const newNote = {
      id: newNoteId,
      content: ('Note ' + newNoteCount)
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
    uploadBoard(newBoard)

    const newNotes = {
      ...notes,
      [newNoteId]: newNote,
    }

    setNotes(newNotes)
    uploadNote(newNote)

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
        <ResetButton onClick={reset}>
          Reset
        </ResetButton>
      </Header>

      
      <Content>
        <Board id="Board" notes={notes} columns={board.columns} columnOrder={board.columnOrder} onDragEnd={onDragEnd} addNote={(columnId) => addNote(columnId)} />
      </Content>
    </Structure>
  );
  
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);