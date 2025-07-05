import { ScriptContext } from "../ScriptContext";
import { ScriptEngine } from "../ScriptEngine";
export declare class TrickScriptEngine extends ScriptEngine {
    eval(script: string, params: any[], context: any & ScriptContext): any;
    compile(script: string, context: ScriptContext): Function | undefined;
    private _compile;
    private loadTokens;
    private input;
}
