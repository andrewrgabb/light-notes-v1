import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import initialNotes from './initial/initial-notes';
import initialBoard from './initial/initial-board';

import Board from './component/Board';
import Dropdown from './component/Dropdown';

import { Structure, Content, Header, Title, StyledButton, ResetButton} from './styles';

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


const App = () => {

  const [board, setBoard] = useState(initialBoard)

  const [notes, setNotes] = useState(initialNotes);
  const notesRef = useRef();

  const [sessionId, setSessionId] = useState(1);
  const sessionIdRef = useRef();

  // Count (Will be irrelavent soon)
  const [noteCount, setNoteCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);

  // Refs
  notesRef.current = notes
  sessionIdRef.current = sessionId

  // Dropdown menu
  const [dropdown, setDropdown] = useState({});

  // Fetch Notes, Columns, and ColumnOrder
  useEffect(() => {

    const newSessionId  = uuidv4()
    setSessionId(newSessionId)

    fetchData(sessionId)

    subscribeToBoardUpdates()
    subscribeToNoteUpdates()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const subscribeToBoardUpdates = () => {
    API.graphql(
      graphqlOperation(onUpdateBoard)
    ).subscribe({
      next: ({ value }) => {

        const data = value.data.onUpdateBoard;

        const currentSessionId =  sessionIdRef.current

        if (currentSessionId !== data.sessionId) {

          const id = data.id
          const json = JSON.parse(data.json)

          const newBoard = {
            id: id,
            columns: json.columns,
            columnOrder: json.columnOrder,
          }

          setBoard(newBoard)
        }      
      },
      error: error => {
        console.warn(error);
      }
    });
  }

  const subscribeToNoteUpdates = () => {
    API.graphql(
      graphqlOperation(onCreateNote)
    ).subscribe({
      next: ({ provider, value }) => {

        const data = value.data.onCreateNote;

        const currentSessionId =  sessionIdRef.current

        if (currentSessionId !== data.sessionId) {

          const currentNotes = notesRef.current

          const newNote = {
            id: data.id,
            name: data.name,
            content: data.content,
          };

          const newNotes = {
            ...currentNotes,
            [data.id]: newNote,
          }
      
          setNotes(newNotes)
        }
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

    // local
    setBoard(newBoard)
    setNotes(initialNotes)

    // database
    resetDatabase()
  }

  const fetchData = async(sessionId) => {
    try {

      await Promise.all([fetchNotes(), fetchBoard(sessionId)])
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

  const uploadBoard = async(newBoard) => {
    try {

      //console.log({sessionId})

      const jsonBoard = JSON.stringify(newBoard)

      const inputBoard = {
        id: board.id,
        json: jsonBoard,
        sessionId: sessionId,
      }

      //console.log({inputBoard})
  
      await API.graphql(graphqlOperation(updateBoard, {input: inputBoard}))

    } catch (err) {
      console.log('error updating board:')
      console.log(err)
    }
  }

  const uploadNote = async(noteToUpload) => {
    try {

      //console.log({noteToUpload})

      await API.graphql(graphqlOperation(createNote, {input: noteToUpload}))

    } catch (err) {
      console.log('error creating note:')
      console.log(err)
    }
  }

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
      name: ('Note ' + newNoteCount),
      content: ('Note ' + newNoteCount),
    };
    const noteToUpload = {
      ...newNote,
      sessionId: sessionId,
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
    uploadNote(noteToUpload)

    setNoteCount(newNoteCount)
  }

  const openMenu = (columnId) => {

    const dropdown = document.getElementById(`${columnId}-dropdown`)

    const rect = dropdown.getBoundingClientRect()

    const { bottom, left } = rect;

    const x = left;
    const y = bottom;

    const newDropdown = {
      x: x,
      y: y,
    };

    setDropdown(newDropdown)
  }

  const closeMenu = () => {
    if (Object.keys(dropdown).length > 0) {
      setDropdown({})
    }
  }

  return (
    <Structure id="structure" onClick={closeMenu}>
      <Header id="header">
        <Title id="title">
          Light Notes 
        </Title>
        <StyledButton id="add-column-button" onClick={addColumn}>
          Add Column
        </StyledButton>
        <ResetButton id="reset-column-button" onClick={reset}>
          Reset
        </ResetButton>
      </Header>

      
      <Content id="content">
        <Board id="Board" notes={notes} columns={board.columns} columnOrder={board.columnOrder} onDragEnd={onDragEnd} 
          addNote={(columnId) => addNote(columnId)} openMenu={(columnId) => openMenu(columnId)}/>
      </Content>

      <Dropdown id="column-menu" settings={dropdown} />
      <div id="note-menu" />
      <div id="note-pop-up" />
    </Structure>
  );
  
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);