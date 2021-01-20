/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: String!) {
    getNote(id: $id) {
      id
      name
      content
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $id: String
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNotes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getColumn = /* GraphQL */ `
  query GetColumn($id: String!) {
    getColumn(id: $id) {
      id
      name
      noteOrder
      createdAt
      updatedAt
    }
  }
`;
export const listColumns = /* GraphQL */ `
  query ListColumns(
    $id: String
    $filter: ModelColumnFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listColumns(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        noteOrder
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getColumnOrder = /* GraphQL */ `
  query GetColumnOrder($id: String!) {
    getColumnOrder(id: $id) {
      id
      ids
      createdAt
      updatedAt
    }
  }
`;
export const listColumnOrders = /* GraphQL */ `
  query ListColumnOrders(
    $id: String
    $filter: ModelColumnOrderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listColumnOrders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        ids
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
