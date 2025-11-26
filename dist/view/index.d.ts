interface IView {
    name: string;
    context: any;
    load(): Promise<void>;
    unload(): Promise<void>;
    show(context: any): Promise<void>;
    hide(): Promise<void>;
}

export { IView };
