import { Data } from './interface';

export const initialData: Data = {
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To Do',
            taskIds: ['task-1', 'task-2'],
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: ['task-3'],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        },
    },
    tasks: {
        'task-1': { id: 'task-1', content: 'Task 1' },
        'task-2': { id: 'task-2', content: 'Task 2' },
        'task-3': { id: 'task-3', content: 'Task 3' },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};