import { IScriptContext } from "../ScriptContext";
import {  ScriptEngine } from "../ScriptEngine";
const BuildIn:any = {
    "+": function (...args:any) { return args.reduce((c:any, v:any) => Number(c) + Number(v)) },
    "-": function (...args:any) { return args.reduce((c:any, v:any) => Number(c) - Number(v)) },
    "*": function (...args:any) { return args.reduce((c:any, v:any) => Number(c) * Number(v)) },
    "/": function (...args:any) { return args.reduce((c:any, v:any) => Number(c) / Number(v)) },
}

export class TrickScriptEngine extends ScriptEngine {
    eval(script: string, params: any[], context: any&IScriptContext): any {
        let tokens = this.loadTokens(script);
        context = context || BuildIn;
        function process(tokens: string[]): any {
            let token;
            let args = [];
            while (token = tokens.shift()) {
                switch (token) {
                    case "(":
                        let mothed = args.pop();
                        if(mothed){
                            args.push((context[mothed] || BuildIn[mothed]).apply(null, process(tokens)));
                        }
                        return args;
                    case ")": return args;
                    case ",": break;
                    default: args.push(token); break;
                }
            }
        }
        let fn = this._compile(tokens, context);
        if (fn){
            return fn()
        }
    }

    compile(script: string, context: IScriptContext): Function|undefined {
        let tokens = this.loadTokens(script);
        return this._compile(tokens, context);
    }

    private _compile(tokens: string[], context: any): Function|undefined {
        context = context || BuildIn;
        let token;
        let stack:any = [];
        while (token = tokens.shift()) {
            if (token) {
                switch (token) {
                    case "(":
                        let mothed_name = stack.pop()
                        let mothed = context[mothed_name] || BuildIn[mothed_name];
                        let mothed_stack = this._compile(tokens, context);
                        stack.push(function () {
                            let args = mothed_stack&&mothed_stack();
                            args = args.map((v:any) => typeof v == "function" ? v() : v);
                            return mothed.apply(null, args);
                        });
                        break;
                    case ")":
                        return function () {
                            return stack;
                        }
                        break;
                    case ",": break;
                    default:
                        stack.push(token);
                        break;
                }
            }
        }
    }

    private loadTokens(script: string): string[] {
        let tokens = [];
        let buffer = "";
        for (let i of script) {
            if (i == "(" || i == ")" || i == ",") {
                tokens.push(buffer, i);
                buffer = "";
            } else {
                buffer = buffer.concat(i);
            }
        }
        return tokens;
    }
    private input(tokens: string) {

    }


}
