import { ScriptEngine } from '../../ScriptEngine/index.js';

const BuildIn = {
    "+": function (...args) { return args.reduce((c, v) => Number(c) + Number(v)); },
    "-": function (...args) { return args.reduce((c, v) => Number(c) - Number(v)); },
    "*": function (...args) { return args.reduce((c, v) => Number(c) * Number(v)); },
    "/": function (...args) { return args.reduce((c, v) => Number(c) / Number(v)); },
};
class TrickScriptEngine extends ScriptEngine {
    eval(script, params, context) {
        let tokens = this.loadTokens(script);
        context = context || BuildIn;
        let fn = this._compile(tokens, context);
        if (fn) {
            return fn();
        }
    }
    compile(script, context) {
        let tokens = this.loadTokens(script);
        return this._compile(tokens, context);
    }
    _compile(tokens, context) {
        context = context || BuildIn;
        let token;
        let stack = [];
        while (token = tokens.shift()) {
            if (token) {
                switch (token) {
                    case "(":
                        let mothed_name = stack.pop();
                        let mothed = context[mothed_name] || BuildIn[mothed_name];
                        let mothed_stack = this._compile(tokens, context);
                        stack.push(function () {
                            let args = mothed_stack && mothed_stack();
                            args = args.map((v) => typeof v == "function" ? v() : v);
                            return mothed.apply(null, args);
                        });
                        break;
                    case ")":
                        return function () {
                            return stack;
                        };
                    case ",": break;
                    default:
                        stack.push(token);
                        break;
                }
            }
        }
    }
    loadTokens(script) {
        let tokens = [];
        let buffer = "";
        for (let i of script) {
            if (i == "(" || i == ")" || i == ",") {
                tokens.push(buffer, i);
                buffer = "";
            }
            else {
                buffer = buffer.concat(i);
            }
        }
        return tokens;
    }
    input(tokens) {
    }
}

export { TrickScriptEngine };
