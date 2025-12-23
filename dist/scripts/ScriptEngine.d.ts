export declare class ScriptScope {
    values: {};
    parent: ScriptScope;
    type: number;
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
export declare enum TOKEN_TYPE {
    NUMBER = 0,
    STRING = 1,
    KEY = 2,
    LP = 3,
    RP = 4,
    COM = 5,
    LB = 6,
    RB = 7,
    DEFAULT = 8
}
export type Token = {
    value: any;
    type: any;
};
export type TokenReader = {
    type: TOKEN_TYPE;
    check: (char: string) => boolean;
    mode?: number;
    start: string;
    convert?: Function;
};
export declare class ScriptRender {
    serializer: ScriptSerializer;
    reader: TokenReader;
    content: string;
    position: number;
    last_position: number;
    constructor(serializer: ScriptSerializer, content: string);
    read(): {
        value: any;
        type: TOKEN_TYPE;
    };
}
export declare class ScriptSerializer {
    root: any;
    constructor(tokens: any);
    createReader(script: any): {
        read(): Token;
    };
    getReader(text: string, position: number): any;
}
export declare class ScriptRuntime {
    processors: {
        [key: string]: Function;
    };
    constructor(processors: any);
    input(token: any, context: any): void;
}
export declare class ScriptEngine {
    constructor(global?: ScriptScope);
    eval(script: string, ...args: any[]): void;
    compile(script: string, ...args: any[]): void;
    setContext(context: ScriptContext): void;
}
export declare class ScriptMachine extends ScriptRuntime {
    processors: {
        [key: string]: Function;
    };
}
export declare class RegexpScriptReder {
    regexp: RegExp;
    content: string;
    serializer: ScriptSerializer;
    position: number;
    constructor(serializer: ScriptSerializer, content: string, regexp: RegExp);
    read(): Token;
}
export declare class SimpleRegexpScriptSerializer extends ScriptSerializer {
    regexp: RegExp;
    super(regexp: RegExp): void;
    createReader(script: string): any;
}
