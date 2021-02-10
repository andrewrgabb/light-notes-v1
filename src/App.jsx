import React, { useEffect, useState, useRef } from 'react';

import initialBoard from './initial/board';
import initialNotes from './initial/notes';
import intialDropdown from './initial/dropdown';
import intialColumnEditor from './initial/column-editor';
import intialNoteEditor from './initial/note-editor';
import intialGreyScreen from './initial/grey-screen';
import initialEditing from './initial/editing';

import Board from './component/Board';
import Dropdown from './component/Dropdown';
import ColumnEditor from './component/ColumnEditor';
import NoteEditor from './component/NoteEditor';
import GreyScreen from './component/GreyScreen';

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

  // Column editor
  const [columnEditor, setColumnEditor] = useState(intialColumnEditor);

  // Note editor
  const [noteEditor, setNoteEditor] = useState(intialNoteEditor);

  // Grey screen
  const [greyScreen, setGreyScreen] = useState(intialGreyScreen);

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

  const uploadNewNote = async(noteToUpload) => {
    try {

      //console.log({noteToUpload})

      await API.graphql(graphqlOperation(createNote, {input: noteToUpload}))

    } catch (err) {
      console.log('error uploading note:')
      console.log(err)
    }
  }

  const uploadNote = async(noteToUpload) => {
    try {

      //console.log({noteToUpload})

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

        //console.log("recognides")

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
      title: 'Column ' + newColumnCount,
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
      title: ('Note ' + newNoteCount),
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
    uploadNewNote(noteToUpload)

    setNoteCount(newNoteCount)
  }

  const openColumnMenu = (columnId) => {

    if (dropdown.open && dropdown.objectId === columnId) {
      closeDropdown()
      return
    }

    const dropdownDom = document.getElementById(`${columnId}-dropdown`)

    const rect = dropdownDom.getBoundingClientRect()

    const { bottom, left } = rect;

    const x = left;
    const y = bottom;

    const width = 160;
    //const height = 280;

    const newDropdown = {
      objectId: columnId,
      open: true,
      x: x,
      y: y,
      width: width,
      options: [
        {text: "Edit", function: editColumnTitle},
        {text: "Delete", function: removeColumn},
      ],
    };

    setDropdown(newDropdown)
  }

  const editColumnTitle = (columnId) => {

    closeDropdown()
    showGreyScreen()

    //console.log("Editing column title", {columnId});

    const columnToEdit = board.columns[columnId];
    const titleToEdit = columnToEdit.title;

    const x = window.innerWidth / 2 - 120;
    const y = window.innerHeight / 3 - 60;

    const newColumnEditor = {
      columnId: columnId,
      open: true,
      x: x,
      y: y,
      width: 240,
      height: 120,
      title: titleToEdit,
      updateColumnTitle: updateColumnTitle,
      saveColumnTitle: saveColumnTitle,
    };

    setColumnEditor(newColumnEditor)
  }

  const updateColumnTitle = (columnId, newTitle) => {

    // Not sure why the settings are dissapearing here
    //console.log({columnEditor})

    const x = window.innerWidth / 2 - 120;
    const y = window.innerHeight / 3 - 60;

    const newColumnEditor = {
      columnId: columnId,
      open: true,
      x: x,
      y: y,
      width: 240,
      height: 120,
      title: newTitle,
      updateColumnTitle: updateColumnTitle,
      saveColumnTitle: saveColumnTitle,
    };

    setColumnEditor(newColumnEditor)
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

    if (dropdown.open && dropdown.objectId === noteId) {
      closeDropdown()
      return
    }

    const dropdownDom = document.getElementById(`${noteId}-dropdown`)

    const rect = dropdownDom.getBoundingClientRect()

    const { bottom, left } = rect;

    const x = left;
    const y = bottom;

    const width = 160;
    //const height = 280;

    const newDropdown = {
      objectId: noteId,
      open: true,
      x: x,
      y: y,
      width: width,
      options: [
        {text: "Edit", function: editNote},
        {text: "Delete", function: removeNote},
      ],
    };

    setDropdown(newDropdown)
  }

  const editNote = (noteId) => {

    closeDropdown()
    showGreyScreen()

    //console.log("Editing column title", {columnId});

    const noteToEdit = notes[noteId];
    
    const title = noteToEdit.title;
    const content = noteToEdit.content;

    const x = window.innerWidth / 2 - 200;
    const y = window.innerHeight / 3 - 180;

    const newNoteEditor = {
      noteId: noteId,
      open: true,
      x: x,
      y: y,
      width: 400,
      height: 360,
      title: title,
      content: content,
      updateNoteContent: updateNoteContent,
      saveNote: saveNote,
    };

    setNoteEditor(newNoteEditor)
  }

  const updateNoteContent = (noteId, newTitle, newContent) => {

    const x = window.innerWidth / 2 - 200;
    const y = window.innerHeight / 3 - 180;

    const newNoteEditor = {
      noteId: noteId,
      open: true,
      x: x,
      y: y,
      width: 400,
      height: 360,
      title: newTitle,
      content: newContent,
      updateNoteContent: updateNoteContent,
      saveNote: saveNote,
    };

    setNoteEditor(newNoteEditor)
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
  
  const closeColumnEditor = () => {

    hideGreyScreen()

    const newColumnEditor = {
      columnId: "",
      open: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      title: "",
      updateColumnTitle: {},
    };

    setColumnEditor(newColumnEditor)
  }

  const closeNoteEditor = () => {

    hideGreyScreen()

    const newNoteEditor = {
      noteId: "",
      open: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      title: "",
      content: "",
      updateNote: {},
      saveNote: {},
    };

    setNoteEditor(newNoteEditor)
  }

  const closePopUps = () => {
    closeDropdown();
    closeColumnEditor();
    closeNoteEditor();
    closeEditing();
  }

  const showGreyScreen = () => {

    const newGreyScreen = {
      show: true,
      closePopUps: closePopUps,
    }

    setGreyScreen(newGreyScreen);
  }

  const hideGreyScreen = () => {

    const newGreyScreen = {
      show: false,
      closePopUps: {},
    }

    setGreyScreen(newGreyScreen);
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
      <Structure id="structure" onClick={closePopUps}>
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
            saveColumnTitle={(columnId, newTitle) => saveColumnTitle(columnId, newTitle)} 
            setEditingToThis={(newEditing) => setEditingToThis(newEditing)} />
        </Content>
      </Structure>
      <GreyScreen id="grey-screen" settings={greyScreen} />
      <Dropdown id="dropdown" settings={dropdown}  />
      <ColumnEditor id="column-editor" settings={columnEditor} />
      <NoteEditor id="note-editor" settings={noteEditor} />
    </React.Fragment>
  );
}

export default App;