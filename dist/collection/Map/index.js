class Map {
    constructor() {
        this._keyMap = {};
        this._size = 0;
    }
    set(key, value) {
        if (value) {
            if (this._keyMap[key] == null && value != null) {
                this._size++;
            }
            this._keyMap[key] = value;
        }
        else {
            this.delete(key);
        }
    }
    delete(key) {
        let value = this._keyMap[key];
        if (value) {
            delete this._keyMap[key];
            this._size--;
        }
        return value;
    }
    clear() {
        this._keyMap = {};
        this._size = 0;
    }
    get(key) {
        return this._keyMap[key];
    }
    has(key) {
        return key in this._keyMap;
    }
    get size() {
        return this._size;
    }
    keys() {
        let index = 0;
        let keys = Object.keys(this._keyMap);
        return {
            next: function () {
                return keys[index++];
            }
        };
    }
    values() {
        let index = 0;
        let map = this._keyMap;
        let keys = Object.keys(this._keyMap);
        return {
            next: function () {
                return map[keys[index++]];
            }
        };
    }
    forEach(callback) {
        for (let i in this._keyMap) {
            callback(this._keyMap[i]);
        }
    }
}

export { Map };
