'use client'
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Data } from '@/utils/interface';
import { initialData } from '@/utils/data';
import { addNewColumnHelper, addNewTaskHelper, onDragEndHelper } from '@/helper/board';

const Dashboard = () => {
    const [data, setData] = useState<Data>(initialData);
    const [newColumnTitle, setNewColumnTitle] = useState<string>('');
    const [newTaskContent, setNewTaskContent] = useState<string>('');
    const [isAddingTask, setIsAddingTask] = useState<string | null>(null);
    const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);

    const onDragEnd = (result: DropResult) => {
        onDragEndHelper(result, data, setData);
    };

    const addNewTask = (columnId: string) => {
        addNewTaskHelper(columnId, newTaskContent, data, setData, setNewTaskContent, setIsAddingTask);
    };

    const addNewColumn = () => {
        addNewColumnHelper(newColumnTitle, data, setData, setNewColumnTitle, setIsAddingColumn);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col p-4">
            <h1 className="text-2xl font-bold text-center mb-4 text-indigo-600">Trackly Board</h1>

            <div className="flex flex-wrap justify-start gap-4 overflow-y-auto min-h-[calc(100vh-150px)]">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="all-columns" direction="horizontal" type="column">
                        {(provided) => (
                            <div
                                className="flex gap-4"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {data.columnOrder.map((columnId, index) => {
                                    const column = data.columns[columnId];
                                    const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                                    return (
                                        <Draggable key={column.id} draggableId={column.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    className="bg-white rounded-lg shadow-md p-4 w-80 min-w-[300px] flex flex-col"
                                                >
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className="cursor-move text-lg font-semibold mb-4 text-indigo-600"
                                                    >
                                                        {column.title}
                                                    </div>

                                                    <Droppable droppableId={column.id}>
                                                        {(provided) => (
                                                            <div
                                                                {...provided.droppableProps}
                                                                ref={provided.innerRef}
                                                                className="space-y-2 flex-1 overflow-auto"
                                                            >
                                                                {tasks.map((task, index) => (
                                                                    <Draggable
                                                                        key={task.id}
                                                                        draggableId={task.id}
                                                                        index={index}
                                                                    >
                                                                        {(provided) => (
                                                                            <div
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                ref={provided.innerRef}
                                                                                className="bg-gray-200 p-2 rounded shadow-sm text-gray-800"
                                                                            >
                                                                                {task.content}
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                ))}
                                                                {provided.placeholder}
                                                            </div>
                                                        )}
                                                    </Droppable>

                                                    {isAddingTask === column.id ? (
                                                        <div className="mt-4">
                                                            <input
                                                                type="text"
                                                                value={newTaskContent}
                                                                onChange={(e) => setNewTaskContent(e.target.value)}
                                                                placeholder="Enter task title"
                                                                className="border p-2 rounded w-full"
                                                            />
                                                            <button
                                                                onClick={() => addNewTask(column.id)}
                                                                className="w-full py-2 mt-2 bg-green-500 text-white rounded"
                                                            >
                                                                Add Task
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => setIsAddingTask(column.id)}
                                                            className="w-full py-2 bg-green-500 text-white rounded"
                                                        >
                                                            Add Task
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {isAddingColumn ? (
                    <div className="flex flex-col items-center">
                        <input
                            type="text"
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            placeholder="Enter column name"
                            className="border p-2 mb-2 rounded"
                        />
                        <button
                            onClick={addNewColumn}
                            className="w-full py-2 bg-blue-500 text-white rounded"
                        >
                            Add Column
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <button
                            onClick={() => setIsAddingColumn(true)}
                            className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Dashboard;

