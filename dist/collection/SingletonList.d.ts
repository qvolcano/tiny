import { Type } from "../lobby/system/Type";
export declare class SingletonList<T> {
    private items;
    private factory;
    constructor(factory?: (type: Type<T>) => T);
    add(type: Type<T>): void;
    get(type: Type<T>): T | undefined;
    values(): T[];
}
