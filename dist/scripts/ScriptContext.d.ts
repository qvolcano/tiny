import { Bindings } from "./Bindings";
export interface ScriptContext {
    eval(tokens: any[]): void;
    eval(script: string): void;
    eval(script: string, bindings: Bindings): void;
    get(key: string): any;
    getBindings(scope: number): Bindings;
    getContext(): ScriptContext;
    getScriptContext(nn: Bindings): ScriptContext;
    put(key: string, value: any): void;
    setBindings(bindings: Bindings, scope: number): void;
    setContext(ctxt: ScriptContext): void;
}
