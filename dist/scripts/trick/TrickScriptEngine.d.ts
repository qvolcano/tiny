import { IScriptContext } from "../ScriptContext";
import { ScriptEngine } from "../ScriptEngine";
export declare class TrickScriptEngine extends ScriptEngine {
    eval(script: string, params: any[], context: any & IScriptContext): any;
    compile(script: string, context: IScriptContext): Function | undefined;
    private _compile;
    private loadTokens;
    private input;
}
