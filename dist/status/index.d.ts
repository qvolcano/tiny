interface IStatus {
    name: string;
    open(): void;
    close(): void;
}

declare class ScriptStatus implements IStatus {
    name: string;
    private onOpen;
    private onClose?;
    constructor(name: string, onOpen: Function, onClose?: Function);
    open(): void;
    close(): void;
}

declare class StatusGroup {
    context?: any;
    name: String;
    private statusMap;
    private currentStatus?;
    constructor(context?: any);
    register(status: IStatus): void;
    setStatus(key: string): void;
}

export { IStatus, ScriptStatus, StatusGroup };
