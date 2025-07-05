class ArraySheet {
    constructor(source) {
        this.source = source;
        this._length = source.length;
    }
    get(index) {
        return this.source[index];
    }
    find(keyName, keyValue) {
        return this.source.filter(v => v[keyName] === keyValue)[0];
    }
    findAll(keyName, keyValue) {
        return this.source.filter(v => v[keyName] === keyValue);
    }
    get lengeh() {
        return this._length;
    }
}

export { ArraySheet };
