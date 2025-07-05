interface TaskExecutor<Task> {
    execute(task: Task): Promise<void>;
}
export declare class TaskQueue<Task = (Function | Promise<void>)> {
    maxTask: number;
    numTask: number;
    tasks: Task[];
    running: boolean;
    executorFactory: () => TaskExecutor<Task>;
    executorList: TaskExecutor<Task>[];
    onTaskFild?: (task: Task) => void;
    constructor(executor?: TaskExecutor<Task> | (() => TaskExecutor<Task>));
    append(task: Task): void;
    private next;
    private onComplete;
    private onTaskFail;
    private onTaskComplete;
}
export {};
