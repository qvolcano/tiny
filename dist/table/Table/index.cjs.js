'use strict';

class Table {
    // constructor(name: TValue, value: TValue[]| ({ [key: TValue]: TValue }))
    // constructor(table: { name: TValue, value: (TValue[]) | ({ [key: TValue]: TValue }) })
    constructor(...args) {
        if (args.length == 1) {
            this.name = args[0].name;
            this.value = args[0].name;
        }
        else {
            this.name = args[0];
            this.value = args[1];
        }
    }
    get(id) {
        if (this.value instanceof Array) ;
        else {
            return this.value[id];
        }
    }
    forEach(fn) {
        for (let i in this.value) {
            fn(this.value[i]);
        }
    }
    add(key, value) {
        throw new Error("Method not implemented.");
    }
    remove(key) {
        throw new Error("Method not implemented.");
    }
}

exports.Table = Table;
