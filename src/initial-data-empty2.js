const intialData = {
  notes: {
    'note-1': { id: 'note-1', content: 'Note 1'},
  },
  columns: [{
      id: 'column-1',
      name: 'Column 1',
      noteOrder: ['note-1'],
    }],
  columnOrder: {
    id: '1',
    ids: ['column-1'],
  }
};

export default intialData;