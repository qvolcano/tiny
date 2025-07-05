'use strict';

class Queue {
    constructor(executor, autoStart = true) {
        this.executor = executor;
        this.autoStart = autoStart;
        this.itemList = [];
        this._running = false;
    }
    push(item) {
        this.itemList.push(item);
        if (this.autoStart && this._running == false) {
            this.start();
        }
    }
    start() {
        if (this._running == false) {
            this._running = true;
            this.next();
        }
    }
    stop() {
        if (this._running == true) {
            this._running = false;
        }
    }
    next() {
        if (this._running) {
            if (this.itemList.length) {
                let item = this.itemList.shift();
                if (item) {
                    let ret = this.executor(item);
                    if (ret instanceof Promise) {
                        let next = this.next.bind(this);
                        ret.then(next, next).catch(next);
                    }
                }
                else {
                    this.next();
                }
            }
            else {
                this.stop();
            }
        }
    }
}

exports.Queue = Queue;
