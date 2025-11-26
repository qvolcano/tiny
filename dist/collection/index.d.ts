export { H as HashList } from '../HashList-63a4f70c.js';
import { DefintionKey } from '../definition/index.js';
import { T as Type } from '../SingletonMap-5c09553f.js';
export { S as SingletonMap } from '../SingletonMap-5c09553f.js';
export { T as TableList } from '../TableList-bbe6535b.js';

declare class Dict<TKey extends string | number, TValue> {
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

declare class LinkNode<T = any> {
    next?: LinkNode<T>;
    prev?: LinkNode<T>;
    value?: T;
    constructor(value?: T);
}

declare class Map<TKey extends string | number, TValue> {
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

declare class Registry<T extends {
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

declare class SingletonFactory<T> {
    autoCreate: boolean;
    autoRegister: boolean;
    creator?: (def: any) => T;
    private table;
    constructor(autoCreate?: boolean, autoRegister?: boolean, creator?: (def: any) => T);
    register<T>(def: DefintionKey<T>): void;
    get<T>(def: DefintionKey<T>): T | undefined;
    forEach(callback: (item: T) => void): void;
    static DEFAULT_CREATOR<T>(def: DefintionKey<T>): T;
}

declare class SingletonList<T> {
    private items;
    private factory;
    constructor(factory?: (type: Type<T>) => T);
    add(type: Type<T>): void;
    get(type: Type<T>): T | undefined;
    values(): T[];
}

declare class SyncDict {
}

declare class Table<TKey, TValue> implements ITable<TKey, TValue> {
    name: string;
    value: any;
    constructor(...args: any[]);
    get(id: TKey): TValue | undefined;
    forEach(fn: (item: TValue) => void): void;
    add(key: TKey, value: TValue): void;
    remove(key: TKey): void;
}

declare class TagDict<T extends string | number> {
    tags: {
        [key: string | number]: Dict<T, Object>;
    };
    add(tag: T, key: T, value: Object): void;
    remove(tag: T, key: T): void;
    removeByKey(key: T): void;
    get(tag: T, key: T): Object;
    getTagValues(tag: T): Object[];
    getKeyValues(key: T): any[];
}

export { Dict, ITable, ITableReader, LinkNode, Map, Registry, SingletonFactory, SingletonList, SyncDict, Table, TagDict };
