import { TableList } from '../collection/TableList/index.js';
import { SingletonMap } from '../collection/SingletonMap/index.js';

class World {
    constructor() {
        this.indexerMap = new SingletonMap();
        this.indexerList = new TableList();
        this.systems = new Map();
    }
    addUnit(unit) {
        for (let i of this.indexerList.values()) {
            i.addUnit(i);
        }
        return unit;
    }
    removeUnit(unit) {
        for (let i of this.indexerList.values()) {
            i.removeUnit(i);
        }
        return unit;
    }
    updateUnit(unit) {
        for (let i of this.indexerList.values()) {
            i.updateUnit(i);
        }
    }
    addIndexer(type) {
        this.indexerList.add(type.name, new type);
    }
    getIndexer(type) {
        return this.indexerMap.get(type);
    }
    addSystem(key, system) {
        this.systems.set(key, system);
        system.context = this;
    }
}
class ComponentIndexer {
    addUnit(unit) {
        throw new Error("Method not implemented.");
    }
    removeUnit(unit) {
        throw new Error("Method not implemented.");
    }
    getUnit(key) {
        throw new Error("Method not implemented.");
    }
    getUnits(key) {
        throw new Error("Method not implemented.");
    }
    updateUnit(unit) {
    }
}

export { ComponentIndexer, World };
