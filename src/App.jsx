import React, { useEffect, useState, useRef } from 'react';

import initialBoard from './initial/board';
import initialNotes from './initial/notes';
import intialDropdown from './initial/dropdown';
import initialEditing from './initial/editing';

import Board from './component/Board';
import Dropdown from './component/Dropdown';

import { Structure, Content, Header, Title, StyledButton} from './app-styles';

import { v4 as uuidv4 } from 'uuid';

import Amplify, { API, graphqlOperation } from 'aws-amplify'

// Update
import { createNote, updateNote, deleteNote } from './graphql/mutations'
import { updateBoard } from './graphql/mutations'

import { fetchNotes, fetchBoard, resetDatabase } from './util/fetch' //

// Subscribe
import { onUpdateBoard, onCreateNote, onUpdateNote } from './graphql/subscriptions'

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
  const [dropdown, setDropdown] = useState(intialDropdown);

  const [editing, setEditing] = useState(initialEditing);

  // Fetch Notes, Columns, and ColumnOrder
  useEffect(() => {

    /*reset()*/
    
    const newSessionId  = uuidv4()
    setSessionId(newSessionId)

    fetchData(sessionId)

    subscribeToBoardUpdates()
    subscribeToNoteCreations()
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

  const subscribeToNoteCreations = () => {
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
            title: data.title,
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

  const subscribeToNoteUpdates = () => {
    API.graphql(
      graphqlOperation(onUpdateNote)
    ).subscribe({
      next: ({ provider, value }) => {

        const data = value.data.onUpdateNote;

        const currentSessionId =  sessionIdRef.current

        if (currentSessionId !== data.sessionId) {

          const currentNotes = notesRef.current

          const newNote = {
            id: data.id,
            title: data.title,
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
  
  // eslint-disable-next-line no-unused-vars
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

      const jsonBoard = JSON.stringify(newBoard)

      const inputBoard = {
        id: board.id,
        json: jsonBoard,
        sessionId: sessionId,
      }
  
      await API.graphql(graphqlOperation(updateBoard, {input: inputBoard}))

    } catch (err) {
      console.log('error updating board:')
      console.log(err)
    }
  }

  const uploadNewNote = async(noteToUpload) => {
    try {

      await API.graphql(graphqlOperation(createNote, {input: noteToUpload}))

    } catch (err) {
      console.log('error uploading note:')
      console.log(err)
    }
  }

  const uploadNote = async(noteToUpload) => {
    try {

      await API.graphql(graphqlOperation(updateNote, {input: noteToUpload}))

    } catch (err) {
      console.log('error uploading note:')
      console.log(err)
    }
  }

  const removeNote = (noteId) => {

    closeDropdown()

    removeNoteFromDatabase(noteId)

    const {
      [noteId]: removed,
      ...newNotes
    } = notes

    //console.log({newNotes})

    setNotes(newNotes)

    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(board.columns)) {
  
      //console.log({key, value})

      const column = value;

      const noteOrder = column.noteOrder
      const newNoteOrder = noteOrder.filter(noteOrderId => noteOrderId !== noteId)

      if (newNoteOrder.length < noteOrder.length) {

        const newColumn = {
          ...column,
          noteOrder: newNoteOrder,
        }

        const newBoard = {
          ...board,
          columns: {
            ...board.columns,
            [newColumn.id]: newColumn,
          }
        }

        uploadBoard(newBoard)
        setBoard(newBoard)

        return;
      }
    }
  }

  const removeNoteFromDatabase = async(noteId) => {
    try {

      const info = {
        id: noteId,
      }

      await API.graphql(graphqlOperation(deleteNote, {input: info}))

    } catch (err) {
      console.log('error deleting note:')
      console.log(err)
    }
  }

  // Create Columns and Notes
  const addColumn = () => {
    const newColumnCount = columnCount + 1;

    const id  = uuidv4();
    const newColumn = {
      id: id,
      title: 'New Column ' + newColumnCount,
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

  const removeColumn = (columnId) => {

    closeDropdown()

    const column = board.columns[columnId];

    const columnNotes = column.noteOrder.map(noteId => notes[noteId]);

    //console.log({columnNotes})

    columnNotes.forEach(note => {
      if (note) {
        const id = note.id;
        removeNoteFromDatabase(id);
      }
    });

    //console.log("Removing column ",{columnId})

    let newColumns = board.columns;

    delete newColumns[columnId];

    const newColumnOrder = board.columnOrder.filter(otherColumnId => otherColumnId !== columnId);

    const newBoard = {
      ...board,
      columns: newColumns,
      columnOrder: newColumnOrder,
    }

    setBoard(newBoard);
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
      title: ('New Note ' + newNoteCount),
      content: ('Enter details here...'),
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
    uploadNewNote(noteToUpload)

    setNoteCount(newNoteCount)
  }

  const openColumnMenu = (columnId) => {

    closeEditing()

    if (dropdown.open && dropdown.objectId === columnId) {
      closeAll()
      return
    }

    const dropdownDom = document.getElementById(`${columnId}-dropdown`)

    const rect = dropdownDom.getBoundingClientRect()

    const { bottom, left } = rect;

    const x = left;
    const y = bottom;

    const width = 120;
    //const height = 280;

    const newDropdown = {
      objectId: columnId,
      open: true,
      x: x,
      y: y,
      width: width,
      options: [
        //{text: "Edit", function: editColumnTitle},
        {text: "Delete", function: removeColumn},
      ],
    };

    setDropdown(newDropdown)
  }

  const saveColumnTitle = (columnId, newTitle) => {

    const newBoard = {
      ...board,
      columns: {
        ...board.columns,
        [columnId]: {
          ...board.columns[columnId],
          title: newTitle,
        }
      },
    }

    setBoard(newBoard);
    uploadBoard(newBoard)
  }
  
  const openNoteMenu = (noteId) => {

    closeEditing()

    if (dropdown.open && dropdown.objectId === noteId) {
      closeAll()
      return
    }

    const dropdownDom = document.getElementById(`${noteId}-dropdown`)

    const rect = dropdownDom.getBoundingClientRect()

    const { bottom, left } = rect;

    const x = left;
    const y = bottom;

    const width = 120;
    //const height = 280;

    const newDropdown = {
      objectId: noteId,
      open: true,
      x: x,
      y: y,
      width: width,
      options: [
        //{text: "Edit", function: editNote},
        {text: "Delete", function: removeNote},
      ],
    };

    setDropdown(newDropdown)
  }

  const saveNote = (noteId, newTitle, newContent) => {

    const newNote = {
      id: noteId,
      title: newTitle,
      content: newContent,
    }

    const newNotes = {
      ...notes,
      [noteId]: newNote,
    }

    setNotes(newNotes);

    const noteToUpload = {
      ...newNote,
      sessionId: sessionId,
    };

    uploadNote(noteToUpload)
  }

  const closeDropdown = () => {

    const newDropdown = {
      objectId: "",
      open: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      options: [],
    };

    setDropdown(newDropdown)
  }

  const closeAll = () => {
    closeDropdown();
    closeEditing();
  }

  const closeEditing = () => {
    setEditing(initialEditing);
  }

  const setEditingToThis = (newEditing) => {
    //console.log({newEditing})
    setEditing(newEditing);
  }

  return (
    <React.Fragment>
      <Structure id="structure" onClick={closeAll}>
        <Header id="header">
          <Title id="title">
            Light Notes 
          </Title>
          <StyledButton id="add-column-button" onClick={addColumn}>
            Add Column
          </StyledButton>
        </Header>
        
        <Content id="content">
          <Board id="Board" notes={notes} columns={board.columns} columnOrder={board.columnOrder} onDragEnd={onDragEnd} 
            addNote={(columnId) => addNote(columnId)} openColumnMenu={(columnId) => openColumnMenu(columnId)} 
            openNoteMenu={(noteId) => openNoteMenu(noteId)} editing={editing} 
            setEditingToThis={(newEditing) => setEditingToThis(newEditing)} 
            saveColumnTitle={(columnId, newTitle) => saveColumnTitle(columnId, newTitle)} 
            saveNote={(noteId, newTitle, newContent) => saveNote(noteId, newTitle, newContent)}
            closeDropdown={closeDropdown}/>
        </Content>
      </Structure>
      <Dropdown id="dropdown" settings={dropdown}  />
    </React.Fragment>
  );
}

export default App;