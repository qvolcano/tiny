interface IWindow {
    context: any;
    info: any;
    open(): Promise<void>;
    load(): Promise<void>;
    show(): Promise<void>;
    hide(): Promise<void>;
    unload(): Promise<void>;
    close(): Promise<void>;
}
