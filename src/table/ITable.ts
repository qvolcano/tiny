export interface ITable<TKey, TValue>{
    forEach(arg0: (v: TValue) => void):void;
    add(key: TKey, value: TValue): void;
    remove(key: TKey): void;
    get(key: TKey): TValue|undefined;
}


export interface ITableReader<TRow,TKey extends keyof TRow>{
    get(key: TKey): any;
    has(key: TKey): boolean;
    find(key: TKey, value: TRow[TKey]): TRow;
    findAll(key: TKey, value: TRow[TKey]): TRow[];
    foreach(fn: (item: TRow) => void):void;
    keys(): TKey[];
    values():TRow[];
    size(): number;
    // entries(): IterableIterator<[TKey, TRow]>
}
