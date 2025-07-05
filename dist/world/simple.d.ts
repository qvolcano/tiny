import { TableList } from "../collection";
export declare class Context {
    indexermap: TableList<string, Indexer>;
    systemmap: TableList<string, System>;
    addUnit(unit: number): void;
    removeUnit(unit: number): void;
    updateUnit(unit: number): void;
    addSystem(key: string, system: System): void;
    addIndexer(key: string, indexer: Indexer): void;
    getIndexer(key: string): Indexer | undefined;
    update(): void;
}
export interface Indexer {
    addUnit(unit: number): void;
    removeUnit(unit: number): void;
    updateUnit(unit: number): void;
}
export interface System {
    update(): void;
}
