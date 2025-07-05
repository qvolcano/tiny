import { Context } from "../cs";
export declare class World {
    context: Context;
    constructor();
    addUnit(unit: Unit): void;
    removeUnit(unit: Unit): void;
    getUnit(id: number): Object;
}
export declare class Unit {
    id: number;
}
