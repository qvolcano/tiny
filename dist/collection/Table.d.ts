import { ITable } from "./ITable";
export declare class Table<TKey, TValue> implements ITable<TKey, TValue> {
    name: string;
    value: any;
    constructor(...args: any[]);
    get(id: TKey): TValue | undefined;
    forEach(fn: (item: TValue) => void): void;
    add(key: TKey, value: TValue): void;
    remove(key: TKey): void;
}
