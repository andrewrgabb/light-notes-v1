import { v4 as uuidv4 } from 'uuid';

import { API, graphqlOperation } from 'aws-amplify'

import { listNotes, listColumns, listColumnOrders } from '../graphql/queries'

import { deleteColumnOrder, deleteColumn, createColumnOrder } from '../graphql/mutations'

// Fetch Notes, Columns, and ColumnOrder
export async function fetchNotes() {
  try {
    const noteData = await API.graphql(graphqlOperation(listNotes))
    const newNotes = noteData.data.listNotes.items

    return newNotes

  } catch (err) { console.log('error fetching notes');}
}

export async function fetchColumns() {
  try {
    const columnData = await API.graphql(graphqlOperation(listColumns))
    const jsonColumns = columnData.data.listColumns.items

    var newColumns
    
    for (var index = 0; index < jsonColumns.length; index++) { 
      
      const jsonColumn = jsonColumns[index]

      const newId = jsonColumn.id

      const noteOrder = JSON.parse(jsonColumn.noteOrder)

      const newColumn = {
        id: newId,
        name: jsonColumn.name,
        noteOrder: noteOrder,
      }

      /*
      console.log(jsonColumn.id)

      const info = {
        id: jsonColumn.id,
      }

      await API.graphql(graphqlOperation(deleteColumn, {input: info}))
      */

      newColumns = {
        ...newColumns,
        [newId]: newColumn,
      }

      //newColumns[index] = newColumn
    }
    
    return (newColumns)

  } catch (err) { console.log('error fetching columns'); console.log(err)  }
}

export async function fetchColumnOrder() {
  try {
    const columnOrderData = await API.graphql(graphqlOperation(listColumnOrders))
    const jsonColumnOrder = columnOrderData.data.listColumnOrders.items

    /*console.log(jsonColumnOrder[0])

    const info = {
      id: jsonColumnOrder[0].id,
    }

    await API.graphql(graphqlOperation(deleteColumnOrder, {input: info}))*/

    if (jsonColumnOrder.length > 0) {

      const id = jsonColumnOrder[0].id
      const ids = JSON.parse(jsonColumnOrder[0].ids)

      const newColumnOrder = {
        id: id,
        ids: ids,
      }

      return (newColumnOrder)
      
    } else {

      const id = uuidv4();
      const ids = [];

      const newColumnOrder = {
        id: id,
        ids: ids,
      }

      await API.graphql(graphqlOperation(createColumnOrder, {input: newColumnOrder}))

      return (newColumnOrder)
    }

  } catch (err) { console.log('error fetching column order'); console.log(err) }
}