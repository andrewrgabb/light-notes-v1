import React, { useState } from 'react';

import initialBoard from './initial/board';
import initialNotes from './initial/notes';
import intialDropdown from './initial/dropdown';
import initialEditing from './initial/editing';

import Board from './component/Board';
import Dropdown from './component/Dropdown';

import { Structure, ContentDemo, Header, Title, HeaderDemo, Info, StyledButton} from './app-styles';

import { v4 as uuidv4 } from 'uuid';

import Amplify from 'aws-amplify'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);


const AppDemo = () => {

  const [board, setBoard] = useState(initialBoard)

  const [notes, setNotes] = useState(initialNotes);

  // Count (Will be irrelavent soon)
  const [noteCount, setNoteCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);


  // Dropdown menu
  const [dropdown, setDropdown] = useState(intialDropdown);

  const [editing, setEditing] = useState(initialEditing);

  const removeNote = (noteId) => {

    closeDropdown()

    const {
      [noteId]: removed,
      ...newNotes
    } = notes

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

        setBoard(newBoard)
        return;
      }
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
    newColumnOrder.unshift(id);

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
  }

  const removeColumn = (columnId) => {

    closeDropdown()

    let newColumns = board.columns;

    delete newColumns[columnId];

    const newColumnOrder = board.columnOrder.filter(otherColumnId => otherColumnId !== columnId);

    const newBoard = {
      ...board,
      columns: newColumns,
      columnOrder: newColumnOrder,
    }

    setBoard(newBoard);
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


  const addNote = (columnId) => {

    const newNoteCount = noteCount + 1;

    const newNoteId = uuidv4();
    const newNote = {
      id: newNoteId,
      title: ('New Note ' + newNoteCount),
      content: ('Enter details here...'),
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
        <HeaderDemo id="header-demo">
          <Info id="info">Go to&nbsp;
          <a href="https://lightnotes.life/">lightnotes.life</a>
          &nbsp;to create an account and save your notes!</Info>
        </HeaderDemo>
        
        <ContentDemo id="content">
          <Board id="Board" notes={notes} columns={board.columns} columnOrder={board.columnOrder} onDragEnd={onDragEnd} 
            addNote={(columnId) => addNote(columnId)} openColumnMenu={(columnId) => openColumnMenu(columnId)} 
            openNoteMenu={(noteId) => openNoteMenu(noteId)} editing={editing} 
            setEditingToThis={(newEditing) => setEditingToThis(newEditing)} 
            saveColumnTitle={(columnId, newTitle) => saveColumnTitle(columnId, newTitle)} 
            saveNote={(noteId, newTitle, newContent) => saveNote(noteId, newTitle, newContent)}
            closeDropdown={closeDropdown}/>
        </ContentDemo>
      </Structure>
      <Dropdown id="dropdown" settings={dropdown}  />
    </React.Fragment>
  );
}

export default AppDemo;
