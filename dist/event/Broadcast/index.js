class Broadcast {
    constructor() {
        this.listeners = [];
        this.broadcasting = false;
    }
    on(listener, thisObj) {
        if (this.broadcasting) {
            this.listeners = this.listeners.concat();
        }
        this.off(listener, thisObj);
        this.listeners.push(listener, thisObj, false);
    }
    once(listener, thisObj) {
        if (this.broadcasting) {
            this.listeners = this.listeners.concat();
        }
        this.off(listener, thisObj);
        this.listeners.push(listener, thisObj, true);
    }
    off(listener, thisObj) {
        if (this.broadcasting) {
            this.listeners = this.listeners.concat();
        }
        let length = this.listeners.length;
        for (let i = length - 1; i >= 0; i -= 2) {
            if (this.listeners[i - 2] == listener && this.listeners[i] == thisObj) {
                this.offAt(i - 2);
                return true;
            }
        }
    }
    broadcast(...data) {
        this.broadcasting = true;
        let listeners = this.listeners;
        let length = listeners.length;
        let removes = null;
        for (let i = 0; i < length; i += 3) {
            listeners[i].apply(listeners[i + 1], data);
            if (listeners[i + 2]) {
                //once
                if (removes == null) {
                    removes = [];
                }
                removes.push(i);
            }
        }
        if (removes) {
            for (let i = removes.length - 1; i >= 0; i--) {
                this.offAt(i);
            }
        }
        this.broadcasting = false;
    }
    offAt(index) {
        let length = this.listeners.length;
        if (index != length) {
            this.listeners[index] = this.listeners[length];
            this.listeners[index + 1] = this.listeners[length + 1];
            this.listeners[index + 2] = this.listeners[length + 2];
        }
        this.listeners.length -= 3;
    }
}

export { Broadcast };
