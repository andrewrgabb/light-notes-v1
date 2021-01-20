/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      content
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      content
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      content
      createdAt
      updatedAt
    }
  }
`;
export const createColumn = /* GraphQL */ `
  mutation CreateColumn(
    $input: CreateColumnInput!
    $condition: ModelColumnConditionInput
  ) {
    createColumn(input: $input, condition: $condition) {
      id
      name
      noteOrder
      createdAt
      updatedAt
    }
  }
`;
export const updateColumn = /* GraphQL */ `
  mutation UpdateColumn(
    $input: UpdateColumnInput!
    $condition: ModelColumnConditionInput
  ) {
    updateColumn(input: $input, condition: $condition) {
      id
      name
      noteOrder
      createdAt
      updatedAt
    }
  }
`;
export const deleteColumn = /* GraphQL */ `
  mutation DeleteColumn(
    $input: DeleteColumnInput!
    $condition: ModelColumnConditionInput
  ) {
    deleteColumn(input: $input, condition: $condition) {
      id
      name
      noteOrder
      createdAt
      updatedAt
    }
  }
`;
export const createColumnOrder = /* GraphQL */ `
  mutation CreateColumnOrder(
    $input: CreateColumnOrderInput!
    $condition: ModelColumnOrderConditionInput
  ) {
    createColumnOrder(input: $input, condition: $condition) {
      id
      ids
      createdAt
      updatedAt
    }
  }
`;
export const updateColumnOrder = /* GraphQL */ `
  mutation UpdateColumnOrder(
    $input: UpdateColumnOrderInput!
    $condition: ModelColumnOrderConditionInput
  ) {
    updateColumnOrder(input: $input, condition: $condition) {
      id
      ids
      createdAt
      updatedAt
    }
  }
`;
export const deleteColumnOrder = /* GraphQL */ `
  mutation DeleteColumnOrder(
    $input: DeleteColumnOrderInput!
    $condition: ModelColumnOrderConditionInput
  ) {
    deleteColumnOrder(input: $input, condition: $condition) {
      id
      ids
      createdAt
      updatedAt
    }
  }
`;
