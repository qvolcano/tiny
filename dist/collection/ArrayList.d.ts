declare class ArrayList<T> {
    private _source;
    constructor(source?: T[]);
    get(index: number): T;
    find<TName extends keyof T>(key: TName, condition: T[TName]): T | undefined;
    forEach(callback: (args: T) => void): void;
}
