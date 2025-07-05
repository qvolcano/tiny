class EventHandler {
    constructor() {
        this.listeners = [];
        this.emmiting = false;
    }
    on(listener, caller) {
        this.off(listener, caller);
        if (this.emmiting) {
            this.listeners = this.listeners.concat();
        }
        this.listeners.push(listener, caller, false);
    }
    once(listener, caller) {
        this.off(listener, caller);
        if (this.emmiting) {
            this.listeners = this.listeners.concat();
        }
        this.listeners.push(listener, caller, true);
    }
    off(listener, caller) {
        let index = this.get(listener, caller);
        if (index != -1) {
            this.listeners.splice(index, 1);
            return true;
        }
        return false;
    }
    has(listener, caller) {
        return this.get(listener, caller) != -1;
    }
    get(listener, caller) {
        let start_index = 0;
        while (start_index = this.listeners.indexOf(listener, start_index), start_index != -1) {
            if (start_index != -1 && this.listeners[start_index + 3] == caller) {
                this.listeners.splice(start_index, 1);
                return start_index;
            }
        }
        return -1;
    }
    emmit(event) {
        let listeners = this.listeners;
        let len = listeners.length;
        for (let i = 0; i < len; i += 3) {
            listeners[i](listeners[i + 1]);
            if (listeners[i + 3]) {
                this.off(listeners[i], listeners[i + 1]);
            }
        }
    }
}

export { EventHandler };
