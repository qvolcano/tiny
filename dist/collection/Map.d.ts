export declare class Map<TKey extends string | number, TValue> {
    private _keyMap;
    private _size;
    set(key: TKey, value: TValue): void;
    delete(key: TKey): {
        [key: string]: TValue;
        [key: number]: TValue;
    }[TKey];
    clear(): void;
    get(key: TKey): TValue;
    has(key: TKey): boolean;
    get size(): number;
    keys(): {
        next: () => TKey;
    };
    values(): {
        next: () => TValue;
    };
    forEach(callback: (value: TValue) => void): void;
}
