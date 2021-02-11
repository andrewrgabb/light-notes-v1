/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($owner: String!) {
    onCreateNote(owner: $owner) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($owner: String!) {
    onUpdateNote(owner: $owner) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($owner: String!) {
    onDeleteNote(owner: $owner) {
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
export const onCreateBoard = /* GraphQL */ `
  subscription OnCreateBoard($owner: String!) {
    onCreateBoard(owner: $owner) {
      id
      json
      sessionId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateBoard = /* GraphQL */ `
  subscription OnUpdateBoard($owner: String!) {
    onUpdateBoard(owner: $owner) {
      id
      json
      sessionId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteBoard = /* GraphQL */ `
  subscription OnDeleteBoard($owner: String!) {
    onDeleteBoard(owner: $owner) {
      id
      json
      sessionId
      createdAt
      updatedAt
      owner
    }
  }
`;
