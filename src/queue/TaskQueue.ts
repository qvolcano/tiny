
interface TaskExecutor<Task> {
    execute(task: Task): Promise<void>;
}
export class TaskQueue<Task = (Function | Promise<void>)>{
    maxTask: number = 2;
    numTask: number = 0;
    tasks: Task[] = [];
    running = false;
    executorFactory: () => TaskExecutor<Task>;
    executorList: TaskExecutor<Task>[] = [];

    onTaskFild?: (task: Task) => void;

    constructor(executor?: TaskExecutor<Task> | (() => TaskExecutor<Task>)) {
        if (executor) {
            if (typeof executor == "function") {
                this.executorFactory = executor;
            } else {
                this.executorFactory = () => executor;
            }
        } else {
            this.executorFactory = () => { return { execute: (task: Task) => typeof task == "function" ? task() : task } };
        }
    }
    append(task: Task) {
        this.tasks.push(task);
        this.next();
    }

    private async next() {
        if (this.numTask < this.maxTask) {
            let task = this.tasks.shift();
            if (task) {
                let executor = this.executorList.pop() || this.executorFactory();
                this.numTask++;
                if (executor) {
                    try {
                        await executor.execute(task);
                        this.executorList.push(executor);
                        this.onTaskComplete();
                    } catch (error) {
                        this.executorList.push(executor);
                        this.onTaskFail(error);
                    }
                }
            } else {
                this.onComplete();
            }
        }
    }

    private onComplete() {
    }

    private onTaskFail(e:any) {
        this.numTask--;
        this.next();
    }

    private onTaskComplete() {
        this.numTask--;
        this.next();
    }
}
