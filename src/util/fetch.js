import { v4 as uuidv4 } from 'uuid';

import { API, graphqlOperation } from 'aws-amplify'

// fetchNotes / fetchBoard
import { listNotes, listBoards } from '../graphql/queries'

// fetchBoard
import { createBoard } from '../graphql/mutations'

// resetDatabase
import { deleteNote, updateBoard, /*deleteBoard*/ } from '../graphql/mutations'

// Download the notes from the server
export const fetchNotes = async() => {
  try {
    const noteData = await API.graphql(graphqlOperation(listNotes))
    const tempNotes = noteData.data.listNotes.items

    var newNotes = {}
    
    for (var index = 0; index < tempNotes.length; index++) { 
      
      const newNote = tempNotes[index]

      const newId = newNote.id

      const refinedNote = {
        id: newId,
        name: newNote.name,
        content: newNote.content,
      }

      newNotes = {
        ...newNotes,
        [newId]: refinedNote,
      }
    }

    return newNotes

  } catch (err) { console.log('error fetching notes'); console.log(err)}
}

// Download the board from the server
export const fetchBoard = async(sessionId) => {
  try {
    const boardData = await API.graphql(graphqlOperation(listBoards))
    const jsonBoard = boardData.data.listBoards.items
    
    if (jsonBoard.length > 0) {

      const id = jsonBoard[0].id
      const json = JSON.parse(jsonBoard[0].json)

      const newBoard = {
        id: id,
        columns: json.columns,
        columnOrder: json.columnOrder,
      }

      return (newBoard)
      
    } else {

      const id = uuidv4();
      const columns = {};
      const columnOrder = [];

      const newBoard = {
        id: id,
        columns: columns,
        columnOrder: columnOrder,
      }

      const jsonBoard = JSON.stringify(newBoard)

      const inputBoard = {
        id: id,
        json: jsonBoard,
        sessionId: sessionId,
      }

      await API.graphql(graphqlOperation(createBoard, {input: inputBoard}))

      return (newBoard)
    }

  } catch (err) { console.log('error fetching board'); console.log(err) }
}

// Reset the board in the server
export const resetDatabase = async() => {
  try {
    const noteData = await API.graphql(graphqlOperation(listNotes))
    const tempNotes = noteData.data.listNotes.items
    
    for (var index = 0; index < tempNotes.length; index++) { 
      
      const id = tempNotes[index].id

      const info = {
        id: id,
      }

      await API.graphql(graphqlOperation(deleteNote, {input: info}))

    }

    const boardData = await API.graphql(graphqlOperation(listBoards))
    const jsonBoard = boardData.data.listBoards.items

    const id = jsonBoard[0].id
    const columns = {};
    const columnOrder = [];

    const newBoard = {
      id: id,
      columns: columns,
      columnOrder: columnOrder,
    }

    const jsonBoardClean = JSON.stringify(newBoard)

    const inputBoard = {
      id: id,
      json: jsonBoardClean,
    }

    // Maintain the same board-id, but remove the columns.
    await API.graphql(graphqlOperation(updateBoard, {input: inputBoard}))

    // Alternative to delete entire board row: Used before schema updates
    /*
    const info = {
      id: id,
    }

    await API.graphql(graphqlOperation(deleteBoard, {input: info}))
    */

  } catch (err) { console.log('error resetting App'); console.log(err)}
}