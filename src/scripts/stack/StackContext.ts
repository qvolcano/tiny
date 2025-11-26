import { Bindings } from "../Bindings";
import { IScriptContext } from "../ScriptContext";

export class StackFlowContext implements IScriptContext {
    bindingsList:any = []
    runtime!: StackRuntime;
    constructor() {
        if (this.runtime == null) {
            this.runtime = new StackRuntime();
            this.bindingsList[0] = new ValueBindings(builtin);
        }
    }
    eval(tokens: any[]): void;
    eval(script: string): void;
    eval(script: string, bindings: Bindings): void;
    eval(script: unknown, bindings?: Bindings): void {
        if (typeof (script) =="string") {
            let token:any = []
            let tokens:any
            // this.read_tokens(script);
            let last_toekn_is_word = false;
            for (let i of tokens) {
                if (i == "(") {
                    if (last_toekn_is_word) {
                        let word = this.runtime.pop()
                        this.runtime.down();
                        this.runtime.push(word);
                    } else {
                        this.runtime.down();

                    }
                    last_toekn_is_word = false
                } else if (i == ")") {
                    this.runtime.call();
                    last_toekn_is_word = false
                } else if (i != ",") {
                    last_toekn_is_word = true;

                    if (bindings) {
                        this.runtime.push(bindings.get(i))
                    } else {
                        this.runtime.push(i);
                    }
                }
            }
        }
    }
    get(key: string) {
        throw new Error("Method not implemented.");
    }
    getBindings(scope: number): Bindings {
        throw new Error("Method not implemented.");
    }
    getContext(): IScriptContext {
        throw new Error("Method not implemented.");
    }
    getScriptContext(nn: Bindings): IScriptContext {
        throw new Error("Method not implemented.");
    }
    put(key: string, value: any): void {
        throw new Error("Method not implemented.");
    }
    setBindings(bindings: Bindings, scope: number): void {
        throw new Error("Method not implemented.");
    }
    setContext(ctxt: IScriptContext): void {
        throw new Error("Method not implemented.");
    }

    compile(script: string): Function {
        return function(...args:any){

        }
    }


}

const builtin = {
    sum:function(...args:any){return args.reduce((p:any,c:any)=>p+c)},
    sub:function(...args:any){return args.reduce((p:any,c:any)=>p-c)},
    mul:function(...args:any){return args.reduce((p:any,c:any)=>p*c)},
    div:function(...args:any){return args.reduce((p:any,c:any)=>p/c)},
}

class ValueBindings implements Bindings {
    constructor(private value:any){
    }
    containsKey(key: any) {
        return this.value[key] != null;
    }
    get(key: any) {
        return this.value[key]
    }
    put(name: string, value: any) {
        this.value[name] = value
    }
    putAll(toMerge: { [key: string]: { name: string; value: any; }; }) {
        for(let i in toMerge){
            this.value[i]=toMerge[i];
        }
    }
    remove(key: any) {
        delete this.value[key]
    }
    
}

export class StackRuntime {
    private bindings:any;
    private stacks;
    private stack:any;
    constructor() {
        this.stacks = [this.stack = []];
    }
    setBindings(bindings: Bindings) {
        this.bindings = bindings;
    }
    push(value: any) {
        this.stack.push(value);
    }
    pop() {
        return this.stack.pop();
    }
    call() {
        if (this.stack[0] instanceof Function) {
            let ret = this.stack.call(this.stack[0]);
            this.up();
            this.push(ret);
        }
    }
    down() {
        this.stacks.push(this.stack = []);
    }
    up() {
        this.stacks.pop();
        this.stack = this.stacks[this.stacks.length - 1];
    }
}
