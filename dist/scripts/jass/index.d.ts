import { ScriptContext, ScriptRuntime, ScriptScope, ScriptSerializer, TOKEN_TYPE, Token } from "../ScriptEngine";
export declare const createFunctionList: (stack: any[]) => Function;
export declare const processors: {
    8: (token: Token, context: ScriptContext) => void;
    3: (token: Token, context: ScriptContext) => void;
    4: (token: Token, context: ScriptContext) => void;
    5: (_token: Token, _context: ScriptContext) => void;
    6: (_token: Token, context: ScriptContext) => void;
    7: (_token: Token, context: ScriptContext) => void;
    1: (token: Token, context: ScriptContext) => void;
    2: (token: Token, context: ScriptContext) => void;
};
export declare const BUILTIN_TOKEN_READER: {
    TOKEN_COM: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
    };
    TOKEN_LB: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
    };
    TOKEN_RB: {
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
export declare class JassScriptEngine {
    global: ScriptContext;
    serializer: ScriptSerializer;
    runtime: ScriptRuntime;
    context: ScriptContext;
    constructor(global?: ScriptScope);
    eval(script: string): any;
    compile(script: string): () => any;
    setContext(context: ScriptContext): void;
}
