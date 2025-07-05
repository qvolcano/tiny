import { Dict } from "./Dict";
export declare class TagDict<T extends string | number> {
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
