export declare enum TOKEN_TYPE {
    NUMBER = 0,
    STRING = 1,
    KEY = 2,
    LP = 3,
    RP = 4,
    COM = 5,
    DEFAULT = 6
}
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
    constructor(parent?: ScriptContext);
    down(): void;
    up(): void;
    get_value(key: string): any;
    set_value(key: string, value: any): void;
}
export declare const JassRuntimeProcessor: {
    6: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
    3: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
    4: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
    5: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
    1: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
    2: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
};
export type TokenReader = {
    type: TOKEN_TYPE;
    check: (char: string) => boolean;
    mode?: number;
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
    TOKEN_STRING_1: {
        type: TOKEN_TYPE;
        start: string;
        convert: StringConstructor;
        check: (char: string) => boolean;
        mode: number;
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
    global: ScriptContext;
    serializer: ScriptSerializer;
    runtime: ScriptRuntime;
    context: ScriptContext;
    constructor(global?: ScriptScope);
    eval(script: string): void;
    commpile(script: string, scriptScope: ScriptScope): void;
    setContext(context: ScriptContext): void;
}
