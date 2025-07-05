type JobResult = {} | ((result: any) => void);
export declare class Job {
    then(result: JobResult): void;
    resolve(): void;
    reject(): void;
}
export {};
