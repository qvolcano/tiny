export declare class Registry<T extends {
    context: T["context"];
}> {
    private onAdded?;
    private onRemoved?;
    private values;
    constructor(onAdded?: (item: any) => void, onRemoved?: (item: any) => void);
    add(name: string, value: T): void;
    remove(name: string): void;
    get(name: string): T;
}
