import { ScriptEngine } from "../ScriptEngine";
import { TinyScriptContext } from "./TinyScriptContext";
export declare class TinyScriptEngine extends ScriptEngine {
    reander: TinyTokenReader;
    eval(script: string, context: TinyScriptContext): any;
}
export declare class TinyScriptRuntime {
    context: TinyScriptContext;
    stack: any[];
    stackScope: number;
    start(context: TinyScriptContext): void;
    input(token: Token): void;
    output(): void;
}
export declare enum TinyTokenType {
    STRING = 0,
    ADD = 1,
    SUB = 2,
    MUP = 3,
    EXP = 4,
    BIG = 5,
    MIN = 6,
    LK = 7,
    RK = 8,
    NUM = 9,
    SP = 10,
    VAR = 11
}
export type TinyTokenReaderRule = {
    begin: any;
    end: any;
    type: any;
};
export declare class TinyTokenReader {
    curRule: TinyTokenReaderRule;
    content: string;
    rules: TinyTokenReaderRule[];
    position: number;
    constructor(rules: TinyTokenReaderRule[]);
    load(content: string): void;
    read(): Token | null;
}
export interface Token {
    type: number | string;
    value: string;
}
