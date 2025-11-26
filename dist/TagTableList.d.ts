import { TableList } from "./TableList";
export declare class TagTableList<T extends string | number> {
    tags: {
        [key: string | number]: TableList<T, Object>;
    };
    add(tag: T, key: T, value: Object): void;
    remove(tag: T, key: T): void;
    removeByKey(key: T): void;
    get(tag: T, key: T): Object;
    getTagValues(tag: T): Object[];
    getKeyValues(key: T): any[];
}
