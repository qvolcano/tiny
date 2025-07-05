'use strict';

var TableList = require('../TableList/index.cjs.js');

class SingletonList {
    constructor(factory) {
        this.items = new TableList.TableList();
        this.factory = factory || function (type) { return new type; };
    }
    add(type) {
        this.items.add(type.toString(), new type());
    }
    get(type) {
        return this.items.get(type.toString());
    }
    values() {
        return this.items.values();
    }
}

exports.SingletonList = SingletonList;
