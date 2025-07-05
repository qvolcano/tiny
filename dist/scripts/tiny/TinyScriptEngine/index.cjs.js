'use strict';

var ScriptEngine = require('../../ScriptEngine/index.cjs.js');

class TinyScriptEngine extends ScriptEngine.ScriptEngine {
    constructor() {
        super(...arguments);
        this.reander = new TinyTokenReader([
            { begin: "'", end: "'", type: exports.TinyTokenType.STRING },
            { begin: '"', end: '"', type: exports.TinyTokenType.STRING },
            { begin: '+', end: '', type: exports.TinyTokenType.ADD },
            { begin: '-', end: '', type: exports.TinyTokenType.SUB },
            { begin: '*', end: '', type: exports.TinyTokenType.MUP },
            { begin: '/', end: '', type: exports.TinyTokenType.EXP },
            { begin: '>', end: '', type: exports.TinyTokenType.BIG },
            { begin: '<', end: '', type: exports.TinyTokenType.MIN },
            { begin: '(', end: '', type: exports.TinyTokenType.LK },
            { begin: ')', end: '', type: exports.TinyTokenType.RK },
            { begin: '0123456789', end: '0123456789.', type: exports.TinyTokenType.NUM },
            { begin: ' ', end: '', type: exports.TinyTokenType.SP },
            { begin: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_', end: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_", type: exports.TinyTokenType.VAR },
        ]);
    }
    eval(script, context) {
        let runtime = new TinyScriptRuntime();
        let reander = this.reander;
        reander.load(script);
        runtime.start(context);
        let token;
        while (token = reander.read()) {
            runtime.input(token);
        }
        return context.get("@return");
    }
}
class TinyScriptRuntime {
    constructor() {
        this.stack = [];
        this.stackScope = 1;
    }
    start(context) {
    }
    input(token) {
        switch (token.type) {
            case exports.TinyTokenType.STRING:
            // if(this.context.get(2,))
            // this.context.put(token.value)
        }
    }
    output() {
    }
}
exports.TinyTokenType = void 0;
(function (TinyTokenType) {
    TinyTokenType[TinyTokenType["STRING"] = 0] = "STRING";
    TinyTokenType[TinyTokenType["ADD"] = 1] = "ADD";
    TinyTokenType[TinyTokenType["SUB"] = 2] = "SUB";
    TinyTokenType[TinyTokenType["MUP"] = 3] = "MUP";
    TinyTokenType[TinyTokenType["EXP"] = 4] = "EXP";
    TinyTokenType[TinyTokenType["BIG"] = 5] = "BIG";
    TinyTokenType[TinyTokenType["MIN"] = 6] = "MIN";
    TinyTokenType[TinyTokenType["LK"] = 7] = "LK";
    TinyTokenType[TinyTokenType["RK"] = 8] = "RK";
    TinyTokenType[TinyTokenType["NUM"] = 9] = "NUM";
    TinyTokenType[TinyTokenType["SP"] = 10] = "SP";
    TinyTokenType[TinyTokenType["VAR"] = 11] = "VAR";
})(exports.TinyTokenType || (exports.TinyTokenType = {}));
class TinyTokenReader {
    constructor(rules) {
        this.rules = rules;
    }
    load(content) {
        this.content = content;
    }
    read() {
        let tokenType;
        let buffer = "";
        let content = this.content;
        let length = content.length;
        let curRule = null;
        for (let i = this.position; i < length; i++) {
            if (curRule == null) {
                for (let l of this.rules) {
                    if (l.begin.indexOf(content[i]) >= 0) {
                        curRule = l;
                    }
                }
            }
            if (curRule) {
                if (curRule.end.indexOf(i) >= 0) {
                    buffer = buffer.concat(content[i]);
                }
                else {
                    tokenType = curRule.type;
                }
            }
            if (tokenType) {
                buffer = "";
                tokenType = "";
                return { value: buffer, type: tokenType };
            }
        }
        return null;
    }
}

exports.TinyScriptEngine = TinyScriptEngine;
exports.TinyScriptRuntime = TinyScriptRuntime;
exports.TinyTokenReader = TinyTokenReader;
