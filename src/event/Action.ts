export class Action {
    listeners: Function[] = [];
    add(fn: Function) {
        this.listeners.push(fn);
    }

    call() {
        for (let i of this.listeners) {
            i();
        }
    }
}