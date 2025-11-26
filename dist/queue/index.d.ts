declare class Queue {
    private executor;
    private autoStart;
    private itemList;
    private _running;
    constructor(executor: (item: any) => void | Promise<void>, autoStart?: boolean);
    push(item: any): void;
    protected start(): void;
    protected stop(): void;
    private next;
}

interface TaskExecutor<Task> {
    execute(task: Task): Promise<void>;
}
declare class TaskQueue<Task = (Function | Promise<void>)> {
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

export { Queue, TaskQueue };
