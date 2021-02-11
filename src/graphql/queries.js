/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: String!) {
    getNote(id: $id) {
      id
      title
      content
      sessionId
      createdAt
      updatedAt
      owner
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
        title
        content
        sessionId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getBoard = /* GraphQL */ `
  query GetBoard($id: String!) {
    getBoard(id: $id) {
      id
      json
      sessionId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBoards = /* GraphQL */ `
  query ListBoards(
    $id: String
    $filter: ModelBoardFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBoards(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        json
        sessionId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
