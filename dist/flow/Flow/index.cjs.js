'use strict';

class Flow {
    constructor() {
        this.items = [];
    }
    add(item) {
    }
    remove(item) {
    }
    call(...args) {
        for (let i of this.items) {
            i(...args);
        }
    }
}

exports.Flow = Flow;
