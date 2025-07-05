'use strict';

class ValueBroadcastNode {
    constructor() {
        this._nodeList = [];
        this._enabled = true;
        this._value = 0;
    }
    connnect(node) {
        if (this._nodeList.indexOf(node) == -1) {
            this._nodeList.push(node);
        }
    }
    disconnect(node) {
        let index = this._nodeList.indexOf(node);
        if (index != -1) {
            this._nodeList.splice(index, 1);
        }
    }
    broadcast(event) {
        this._onChange && this._onChange();
        for (let i of this._nodeList) {
            i.receive(event);
        }
    }
    receive(event) {
        let actived = 0;
        for (let i of this._nodeList) {
            if (i._enabled && i._value > 0) {
                actived += i._value;
            }
        }
        this.value = actived;
        this.broadcast(event);
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        this._enabled = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
}

exports.ValueBroadcastNode = ValueBroadcastNode;
