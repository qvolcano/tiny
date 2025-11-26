declare class ArraySheet<TRow> {
    private source;
    private _length;
    constructor(source: TRow[]);
    get(index: number): TRow;
    find<TKey extends keyof TRow>(keyName: TKey, keyValue: TRow[TKey]): TRow;
    findAll<TKey extends keyof TRow>(keyName: TKey, keyValue: TRow[TKey]): ReadonlyArray<TRow>;
    get lengeh(): number;
}

interface ISheet<TRow> {
    get(index: number): TRow;
    find<TKey extends keyof TRow>(keyName: TKey, keyValue: TRow[TKey]): TRow;
    findAll<TKey extends keyof TRow>(keyName: TKey, keyValue: TRow[TKey]): ReadonlyArray<TRow>;
    get lengeh(): number;
}

export { ArraySheet, ISheet };
