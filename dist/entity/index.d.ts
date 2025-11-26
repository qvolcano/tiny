import { Context } from '../cs/index.js';
import '../TableList-bbe6535b.js';

declare class World {
    context: Context;
    constructor();
    addUnit(unit: Unit): void;
    removeUnit(unit: Unit): void;
    getUnit(id: number): Object;
}
declare class Unit {
    id: number;
}

export { Unit, World };
