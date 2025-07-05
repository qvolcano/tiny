import { IStatus } from "./IStatus";
export declare class ScriptStatus implements IStatus {
    name: string;
    private onOpen;
    private onClose?;
    constructor(name: string, onOpen: Function, onClose?: Function);
    open(): void;
    close(): void;
}
