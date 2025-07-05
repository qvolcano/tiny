'use strict';

class SingletonFactory {
    constructor(autoCreate = false, autoRegister = false, creator) {
        this.autoCreate = autoCreate;
        this.autoRegister = autoRegister;
        this.creator = creator;
        this.table = {};
    }
    register(def) {
        if (def) {
            let key = def["name"];
            if (key) {
                this.table[key] = {
                    instance: null,
                    constructor: def,
                };
                if (this.autoCreate) {
                    this.get(def);
                }
            }
        }
    }
    get(def) {
        if (def) {
            let key = def.name;
            if (key) {
                let item = this.table[key];
                if (item) {
                    if (item.instance) {
                        return item.instance;
                    }
                    else {
                        let creator = this.creator || SingletonFactory.DEFAULT_CREATOR;
                        return item.instance = creator(item.constructor);
                    }
                }
                else {
                    if (this.autoRegister) {
                        this.register(def);
                        return this.get(def);
                    }
                }
            }
        }
    }
    forEach(callback) {
        for (let key in this.table) {
            let instance = this.get(this.table[key].constructor);
            instance && callback(instance);
        }
    }
    static DEFAULT_CREATOR(def) {
        return new def();
    }
}

exports.SingletonFactory = SingletonFactory;
