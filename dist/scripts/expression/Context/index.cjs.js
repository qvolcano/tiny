'use strict';

class rple {
    constructor() {
        this.grammars = [
            Word,
            Nums,
            LeftBracket,
            Bracket,
        ];
    }
    eval() {
    }
    compile(script) {
        this.readTokens(script);
        // for (let i of tokens) {
        //     context.call(i);
        // }
        // return null
        throw new Error;
    }
    readTokens(script) {
        let buffer = "";
        let tokens = [];
        let grammar = null;
        for (let i of script) {
            if (grammar) {
                if (grammar.match(i)) {
                    buffer = buffer.concat(i);
                }
                else {
                    tokens.push(buffer);
                }
            }
            else {
                for (let ig of this.grammars) {
                    if (ig.start(i)) {
                        grammar = ig;
                        buffer = i;
                        break;
                    }
                }
            }
        }
        return tokens;
    }
}
const Nums = {
    doted: false,
    start: function (char) {
        let code = char.charCodeAt(0);
        Nums.doted = false;
        return code >= 47 && code <= 57;
    },
    match: function (char) {
        let code = char.charCodeAt(0);
        if (code >= 47 && code <= 57) {
            return true;
        }
        else if (code == 46) {
            Nums.doted = true;
            return true;
        }
    }
};
const LeftBracket = {
    start: function (char) { return char == "("; },
    match: function (char) { return false; }
};
const Bracket = {
    start: function (char) { return char == "(" || char == ")" || char == ""; },
    match: function (char) { return false; }
};
const Word = {
    start: function (char) {
        let code = char.charCodeAt(0);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            return true;
        }
    },
    match: function (char) {
        let code = char.charCodeAt(0);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            return true;
        }
    }
};

exports.rple = rple;
