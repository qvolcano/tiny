declare class Control {
}

declare class Context {
    controls: {
        [key: string]: Control;
    };
    registerControl(): void;
}

declare class Model {
    context: Context;
}

declare class View {
    context: Context;
}

export { Model, View };
