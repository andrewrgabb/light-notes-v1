const intialData = {
  notes: {
    'task-1': { id: 'task-1', content: 'Take out the trash.' },
    'task-2': { id: 'task-2', content: 'Watch TV.' },
    'task-3': { id: 'task-3', content: 'Charge phone.' },
    'task-4': { id: 'task-4', content: 'Cook dinner.' },
    'task-5': { id: 'task-5', content: 'Take out the trash.' },
    'task-6': { id: 'task-6', content: 'Watch TV.' },
    'task-7': { id: 'task-7', content: 'Charge phone.' },
    'task-8': { id: 'task-8', content: 'Cook dinner.' },
    'task-9': { id: 'task-9', content: 'Take out the trash.' },
    'task-10': { id: 'task-10', content: 'Watch TV.' },
    'task-11': { id: 'task-11', content: 'Charge phone.' },
    'task-12': { id: 'task-12', content: 'Cook dinner.' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      noteIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6', 'task-7', 'task-8', 'task-9', 'task-10', 'task-11', 'task-12'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      noteIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      noteIds: [],
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