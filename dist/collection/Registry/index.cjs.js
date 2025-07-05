'use strict';

class Registry {
    constructor(onAdded, onRemoved) {
        this.onAdded = onAdded;
        this.onRemoved = onRemoved;
        this.values = {};
    }
    add(name, value) {
        this.remove(name);
        this.values[name] = value;
        this.onAdded && this.onAdded(this);
    }
    remove(name) {
        let old = this.values[name];
        if (old) {
            delete this.values[name];
            this.onRemoved && this.onRemoved(this);
        }
    }
    get(name) {
        return this.values[name];
    }
}

exports.Registry = Registry;
