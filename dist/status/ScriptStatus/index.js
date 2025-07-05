class ScriptStatus {
    constructor(name, onOpen, onClose) {
        this.name = name;
        this.onOpen = onOpen;
        this.onClose = onClose;
    }
    open() {
        this.onOpen && this.onOpen();
    }
    close() {
        this.onClose && this.onClose();
    }
}

export { ScriptStatus };
