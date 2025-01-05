export interface Task {
    id: string;
    content: string;
}

export interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

export interface Data {
    columns: Record<string, Column>;
    tasks: Record<string, Task>;
    columnOrder: string[];
}