import { Bindings } from "./Bindings"

export interface IScriptContext{
    eval(tokens:any[]):void;
    eval(script:string):void
    eval(script:string,bindings:Bindings):void
    get(key:string):any
    getBindings(scope:number):Bindings
    getContext():IScriptContext
    getScriptContext(nn:Bindings):IScriptContext
    put(key:string, value:any):void
    setBindings(bindings:Bindings, scope:number):void
    setContext(ctxt:IScriptContext):void
}

