class HashList {
    constructor(key = "hashCode") {
        this.key = key;
        this._values = [];
        this._keys = {};
    }
    add(value) {
        this._keys[value[this.key]] = this._values.push(value) - 1;
        return value;
    }
    get(key) {
        return this._values[this._keys[key]];
    }
    remove(key) {
        let index = this._keys[key];
        if (index >= 0) {
            let value = this._values[index];
            let len = this._values.length;
            if (index == len - 1) {
                this._values.length--;
            }
            else if (len > 1) {
                this._values[index] = this._values[len - 1];
                this._values.length = len - 1;
                this._keys[this._values[index][this.key]] = index;
            }
            else {
                this._values.length = 0;
            }
            delete this._keys[key];
            return value;
        }
    }
    clear() {
        this._values.length = 0;
        this._keys = {};
    }
    pop() {
        return this.remove(this._values[this._values.length - 1][this.key]);
    }
    values() {
        return this._values;
    }
    keys() {
        return Object.keys(this._keys);
    }
    get length() {
        return this._values.length;
    }
}

export { HashList };
