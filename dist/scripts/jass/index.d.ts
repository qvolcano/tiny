export declare class ScriptScope {
    values: {};
    parent: ScriptScope;
    silent: number;
    stack: any[];
    constructor(parent?: ScriptScope);
    set_value(key: string, value: any): void;
    get_value(key: string): any;
}
export declare class ScriptContext {
    parent: ScriptContext;
    scope: ScriptScope;
    constructor(parent: ScriptContext);
    down(): void;
    up(): void;
    get_value(key: string): any;
    set_value(key: string, value: any): void;
}
export declare const JassRuntimeProcessor: {
    6(token: any, context: any): void;
    5(token: any, context: any): void;
    1(token: any, context: any): void;
    0(token: any, context: any): void;
};
export declare enum TOKEN_TYPE {
    NUMBER = 0,
    STRING = 1,
    KEY = 2,
    LP = 3,
    RP = 4,
    COM = 5,
    DEFAULT = 6
}
export type TokenReader = {
    type: TOKEN_TYPE;
    check: (char: string) => boolean;
    start: string;
    convert?: Function;
};
export declare const BUILTIN_TOKEN_READER: {
    TOKEN_COM: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
    };
    TOKEN_LP: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
    };
    TOKEN_RP: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
    };
    TOKEN_NUMBER: {
        type: TOKEN_TYPE;
        start: string;
        convert: NumberConstructor;
        check: (char: string) => boolean;
        single: boolean;
    };
    TOKEN_KEY: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
        single: boolean;
    };
};
export declare class ScriptRender {
    serializer: ScriptSerializer;
    reader: TokenReader;
    content: string;
    position: number;
    last_position: number;
    constructor(serializer: ScriptSerializer, content: string);
    read(): {
        value: string;
        type: TOKEN_TYPE;
    };
}
export declare class ScriptSerializer {
    root: any;
    constructor(tokens: any);
    createReader(script: any): ScriptRender;
    getReader(text: string, position: number): any;
}
export declare class ScriptRuntime {
    processors: {
        [key: string]: Function;
    };
    constructor(processors: any);
    input(token: any, context: any): void;
}
export declare class JassScriptEngine {
    global: ScriptScope;
    serializer: ScriptSerializer;
    runtime: ScriptRuntime;
    context: ScriptContext;
    constructor(global?: ScriptScope);
    eval(script: string): void;
    commpile(script: string, scriptScope: ScriptScope): void;
    setContext(context: ScriptContext): void;
}
