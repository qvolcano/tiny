declare class TableList<TKey extends string | number, TValue> {
    private _index;
    private _keys;
    private _values;
    add(key: TKey, value: TValue): TValue;
    remove(key: TKey): TValue[][{
        [key: string]: number;
        [key: number]: number;
    }[TKey]];
    get(key: TKey): TValue | undefined;
    values(): TValue[];
    keys(): TKey[];
}

export { TableList as T };
