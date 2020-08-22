const intialData = {
  notes: {
    'note-1': { id: 'note-1', content: 'Take out the trash.' },
    'note-2': { id: 'note-2', content: 'Watch TV.' },
    'note-3': { id: 'note-3', content: 'Charge phone.' },
    'note-4': { id: 'note-4', content: 'Cook dinner.' },
    'note-5': { id: 'note-5', content: 'Take out the trash.' },
    'note-6': { id: 'note-6', content: 'Watch TV.' },
    'note-7': { id: 'note-7', content: 'Charge phone.' },
    'note-8': { id: 'note-8', content: 'Cook dinner.' },
    'note-9': { id: 'note-9', content: 'Take out the trash.' },
    'note-10': { id: 'note-10', content: 'Watch TV.' },
    'note-11': { id: 'note-11', content: 'Charge phone.' },
    'note-12': { id: 'note-12', content: 'Cook dinner.' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      noteIds: ['note-1', 'note-2', 'note-3', 'note-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      noteIds: ['note-5', 'note-6', 'note-7', 'note-8'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      noteIds: ['note-9', 'note-10', 'note-11', 'note-12'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Forgotten',
      noteIds: [],
    },
  },
  
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default intialData;