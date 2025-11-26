import { S as SingletonMap, T as Type } from '../SingletonMap-5c09553f.js';
import { T as TableList } from '../TableList-bbe6535b.js';

declare class World<T> {
    indexerMap: SingletonMap<Indexer<T>>;
    indexerList: TableList<string, Indexer<T>>;
    systems: Map<string, System>;
    addUnit(unit: T): T;
    removeUnit(unit: T): T;
    updateUnit(unit: T): void;
    addIndexer<K extends Indexer<T>>(type: Type<K>): void;
    getIndexer<K extends Indexer<T>>(type: Type<K>): K | undefined;
    addSystem(key: string, system: System): void;
}
interface IUnit {
}
interface Indexer<T> {
    addUnit(unit: any): T;
    updateUnit(unit: any): void;
    removeUnit(unit: any): T;
    getUnit(key: any): T | undefined;
    getUnits(key: any): T[] | undefined;
}
declare class ComponentIndexer implements Indexer<Object> {
    addUnit(unit: any): Object;
    removeUnit(unit: any): Object;
    getUnit(key: any): Object | undefined;
    getUnits(key: any): Object[] | undefined;
    updateUnit(unit: any): void;
}
interface System {
    context?: World<any>;
}

export { ComponentIndexer, IUnit, Indexer, System, World };
