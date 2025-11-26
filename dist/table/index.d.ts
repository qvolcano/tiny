interface ITable<TKey, TValue> {
    forEach(arg0: (v: TValue) => void): void;
    add(key: TKey, value: TValue): void;
    remove(key: TKey): void;
    get(key: TKey): TValue | undefined;
}
interface ITableReader<TRow, TKey extends keyof TRow> {
    get(key: TKey): any;
    has(key: TKey): boolean;
    find(key: TKey, value: TRow[TKey]): TRow;
    findAll(key: TKey, value: TRow[TKey]): TRow[];
    foreach(fn: (item: TRow) => void): void;
    keys(): TKey[];
    values(): TRow[];
    size(): number;
}

declare class Table<TKey, TValue> implements ITable<TKey, TValue> {
    name: string;
    value: any;
    constructor(...args: any);
    get(id: TKey): TValue | undefined;
    forEach(fn: (item: TValue) => void): void;
    add(key: TKey, value: TValue): void;
    remove(key: TKey): void;
}

export { ITable, ITableReader, Table };
