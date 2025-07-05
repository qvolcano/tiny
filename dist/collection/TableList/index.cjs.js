'use strict';

class TableList {
    constructor() {
        this._index = {};
        this._keys = [];
        this._values = [];
    }
    add(key, value) {
        this._index[key] = this._values.length;
        this._values.push(value);
        this._keys.push(key);
        return value;
    }
    remove(key) {
        let index = this._index[key];
        if (index) {
            let last = this._values.length - 1;
            let value = this._values[index];
            if (index < this._values.length - 1) {
                this._values[index] = this._values[last];
                this._keys[index] = this._keys[last];
                this._index[last] = index;
            }
            this._values.length = last;
            this._keys.length = last;
            delete this._index[key];
            return value;
        }
    }
    get(key) {
        if (this._index[key]) {
            return this._values[this._index[key]];
        }
    }
    values() {
        return this._values;
    }
    keys() {
        return this._keys;
    }
}

exports.TableList = TableList;
