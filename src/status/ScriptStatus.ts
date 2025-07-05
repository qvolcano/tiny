import { IStatus } from "./IStatus";

export class ScriptStatus implements IStatus {
    constructor(public name: string, private onOpen: Function, private onClose?: Function) {

    }
    open() {
        this.onOpen && this.onOpen();
    }
    close() {
        this.onClose && this.onClose();
    }
}