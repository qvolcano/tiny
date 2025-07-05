'use strict';

var tslib_es6 = require('../../node_modules/tslib/tslib.es6/index.cjs.js');

class TaskQueue {
    constructor(executor) {
        this.maxTask = 2;
        this.numTask = 0;
        this.tasks = [];
        this.running = false;
        this.executorList = [];
        if (executor) {
            if (typeof executor == "function") {
                this.executorFactory = executor;
            }
            else {
                this.executorFactory = () => executor;
            }
        }
        else {
            this.executorFactory = () => { return { execute: (task) => typeof task == "function" ? task() : task }; };
        }
    }
    append(task) {
        this.tasks.push(task);
        this.next();
    }
    next() {
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
            if (this.numTask < this.maxTask) {
                let task = this.tasks.shift();
                if (task) {
                    let executor = this.executorList.pop() || this.executorFactory();
                    this.numTask++;
                    if (executor) {
                        try {
                            yield executor.execute(task);
                            this.executorList.push(executor);
                            this.onTaskComplete();
                        }
                        catch (error) {
                            this.executorList.push(executor);
                            this.onTaskFail(error);
                        }
                    }
                }
                else {
                    this.onComplete();
                }
            }
        });
    }
    onComplete() {
    }
    onTaskFail(e) {
        this.numTask--;
        this.next();
    }
    onTaskComplete() {
        this.numTask--;
        this.next();
    }
}

exports.TaskQueue = TaskQueue;
