import { TableList } from '../../collection/TableList/index.js';

class Context {
    constructor() {
        this.tags = {};
    }
    addComponent(entity, type, component) {
        if (this.tags[type] == null) {
            this.tags[type] = new TableList();
        }
        this.tags[type].add(entity, component);
    }
    removeComponent(entity, type) {
        if (this.tags[type] != null) {
            this.tags[type].remove(entity);
        }
    }
    getComponent(entity, type) {
        if (this.tags[type] == null) {
            return this.tags[type].get(entity);
        }
    }
    getComponents(type) {
        return this.tags[type].values();
    }
    getComponentsByEntity(entity) {
        let list = [];
        for (let i in this.tags) {
            let com = this.getComponent(entity, Number(i));
            if (com != null) {
                list.push(com);
            }
        }
        return list;
    }
}

export { Context };
