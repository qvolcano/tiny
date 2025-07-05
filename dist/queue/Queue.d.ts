export declare class Queue {
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
