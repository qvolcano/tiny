'use strict';

class World {
    constructor() {
    }
    addUnit(unit) {
        this.context.addComponent(0, unit.id, unit);
    }
    removeUnit(unit) {
    }
    getUnit(id) {
        return this.context.getComponent(0, id);
    }
}
class Unit {
}

exports.Unit = Unit;
exports.World = World;
