import { DefintionKey } from './../definition/DefintionKey';
export declare class SingletonFactory<T> {
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
