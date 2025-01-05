import { Data, Task, Column } from '@/utils/interface';
import { DropResult } from '@hello-pangea/dnd';

export const onDragEndHelper = (
    result: DropResult,
    data: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>
) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (type === 'column') {
        const columnOrder = Array.from(data.columnOrder);
        columnOrder.splice(source.index, 1);
        columnOrder.splice(destination.index, 0, draggableId);

        setData({
            ...data,
            columnOrder,
        });
        return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...start,
            taskIds: newTaskIds,
        };

        setData({
            ...data,
            columns: {
                ...data.columns,
                [newColumn.id]: newColumn,
            },
        });
        return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
        ...start,
        taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
    };

    setData({
        ...data,
        columns: {
            ...data.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        },
    });
};

export const addNewTaskHelper = (
    columnId: string,
    newTaskContent: string,
    data: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>,
    setNewTaskContent: React.Dispatch<React.SetStateAction<string>>,
    setIsAddingTask: React.Dispatch<React.SetStateAction<string | null>>
) => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1 + Math.random()}`;
    const newTask: Task = { id: newTaskId, content: newTaskContent || 'New Task' };
    const updatedTasks = { ...data.tasks, [newTaskId]: newTask };

    const updatedColumn = {
        ...data.columns[columnId],
        taskIds: [...data.columns[columnId].taskIds, newTaskId],
    };

    setData({
        ...data,
        tasks: updatedTasks,
        columns: {
            ...data.columns,
            [columnId]: updatedColumn,
        },
    });
    setNewTaskContent('');
    setIsAddingTask(null);
};

export const addNewColumnHelper = (
    newColumnTitle: string,
    data: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>,
    setNewColumnTitle: React.Dispatch<React.SetStateAction<string>>,
    setIsAddingColumn: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const newColumnId = `column-${Object.keys(data.columns).length + 1 + Math.random()}`;
    const newColumn: Column = { id: newColumnId, title: newColumnTitle || 'New Column', taskIds: [] };

    setData({
        ...data,
        columns: { ...data.columns, [newColumnId]: newColumn },
        columnOrder: [...data.columnOrder, newColumnId],
    });
    setNewColumnTitle('');
    setIsAddingColumn(false);
};
