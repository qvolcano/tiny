'use strict';

var TagDict = require('../collection/TagDict/index.cjs.js');

class Context {
    constructor() {
        this.components = new TagDict.TagDict();
    }
    createEntity() {
        return Context.entity_id++;
    }
    addComponent(entity, type, component) {
        this.components.add(entity, type, component);
    }
    removeComponent(entity, type) {
        this.components.remove(entity, type);
    }
    getComponent(entity, type) {
        return this.components.get(entity, type);
    }
    getComponents(type) {
        return this.components.getTagValues(type);
    }
}
Context.entity_id = 0;

exports.Context = Context;
