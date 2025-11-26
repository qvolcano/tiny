type JobResult = {} | ((result: any) => void);
declare class Job {
    then(result: JobResult): void;
    resolve(): void;
    reject(): void;
}

declare class Task implements ITaskResult {
    resolves: Function[];
    rejects: Function[];
    then(fn: (result: any) => any): this;
    catch(fn: () => any): this;
    resolve(): void;
    reject(): void;
    _reset(): void;
}
interface ITaskResult {
    then(fn: (result: any) => any): this;
    catch(fn: () => any): this;
}

export { ITaskResult, Job, Task };
