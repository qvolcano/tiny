class EventEmitter {
    on(evt, listener) {
        return this;
    }
    once(evt, listener) {
        return this;
    }
    off(evt, listener) {
        return this;
    }
    emit(evt, ...args) {
        return false;
    }
}

export { EventEmitter };
