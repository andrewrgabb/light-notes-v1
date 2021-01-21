import { v4 as uuidv4 } from 'uuid';

import { API, graphqlOperation } from 'aws-amplify'

import { listNotes, listBoards } from '../graphql/queries'

import { createBoard } from '../graphql/mutations'

import { deleteNote, deleteBoard } from '../graphql/mutations'

// Fetch Notes, Columns, and ColumnOrder
export async function fetchNotes() {
  try {
    const noteData = await API.graphql(graphqlOperation(listNotes))
    const tempNotes = noteData.data.listNotes.items

    var newNotes = {}
    
    for (var index = 0; index < tempNotes.length; index++) { 
      
      const newNote = tempNotes[index]

      const newId = newNote.id

      const refinedNote = {
        id: newId,
        content: newNote.content,
      }

      newNotes = {
        ...newNotes,
        [newId]: refinedNote,
      }
    }

    console.log(newNotes)

    return newNotes

  } catch (err) { console.log('error fetching notes'); console.log(err)}
}

export async function fetchBoard() {
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

      console.log(newBoard)

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
      }

      await API.graphql(graphqlOperation(createBoard, {input: inputBoard}))

      console.log(newBoard)

      return (newBoard)
    }

  } catch (err) { console.log('error fetching board'); console.log(err) }
}

export async function resetDatabase() {

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

    const info = {
      id: jsonBoard[0].id,
    }

    await API.graphql(graphqlOperation(deleteBoard, {input: info}))

  } catch (err) { console.log('error resetting App'); console.log(err)}

}