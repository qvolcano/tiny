export declare class HashList<T extends Record<string, any> = {
    hashCode: number;
}> {
    private key;
    private _values;
    private _keys;
    constructor(key?: string);
    add(value: T): T;
    get(key: any): T | undefined;
    remove(key: any): T | undefined;
    clear(): void;
    pop(): T | undefined;
    values(): T[];
    keys(): string[];
    get length(): number;
}
