class Action {
    constructor() {
        this.listeners = [];
    }
    add(fn) {
        this.listeners.push(fn);
    }
    call() {
        for (let i of this.listeners) {
            i();
        }
    }
}

export { Action };
