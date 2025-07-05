export declare class Task implements ITaskResult {
    resolves: Function[];
    rejects: Function[];
    then(fn: (result: any) => any): this;
    catch(fn: () => any): this;
    resolve(): void;
    reject(): void;
    _reset(): void;
}
export interface ITaskResult {
    then(fn: (result: any) => any): this;
    catch(fn: () => any): this;
}
