import { Bindings } from "../Bindings";
import { IScriptContext } from "../ScriptContext";
export declare class StackFlowContext implements IScriptContext {
    bindingsList: any;
    runtime: StackRuntime;
    constructor();
    eval(tokens: any[]): void;
    eval(script: string): void;
    eval(script: string, bindings: Bindings): void;
    get(key: string): void;
    getBindings(scope: number): Bindings;
    getContext(): IScriptContext;
    getScriptContext(nn: Bindings): IScriptContext;
    put(key: string, value: any): void;
    setBindings(bindings: Bindings, scope: number): void;
    setContext(ctxt: IScriptContext): void;
    compile(script: string): Function;
}
export declare class StackRuntime {
    private bindings;
    private stacks;
    private stack;
    constructor();
    setBindings(bindings: Bindings): void;
    push(value: any): void;
    pop(): any;
    call(): void;
    down(): void;
    up(): void;
}
