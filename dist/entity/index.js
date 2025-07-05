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

export { Unit, World };
