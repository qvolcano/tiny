class Context {
    builtin:any = {
        "+": function (a: number, b: number) { return a + b },
        "-": function (a: number, b: number) { return a - b },
        "*": function (a: number, b: number) { return a * b },
        "/": function (a: number, b: number) { return a / b },
        ">": function (a: number, b: number) { return a > b },
        "<": function (a: number, b: number) { return a < b },
        ">=": function (a: number, b: number) { return a >= b },
        "<=": function (a: number, b: number) { return a <= b },
    }
    context: any = {}
    call(token: { content: string, type: number }) {
        switch (token.type) {
            case 1: {
                let mothed = this.builtin[token.content] || this.context[token.content];
                if (mothed) {

                }
            }
        }
    }

    stacks!: any[];
    push(symbol: string, args: any[]) {

    }

    flush() {

    }
}

export class rple {

    grammars = [
        Word,
        Nums,
        LeftBracket,
        Bracket,
    ]
    eval() {

    }
    compile(script: string): Function {
        let context = new Context();
        let tokens = this.readTokens(script);

        // for (let i of tokens) {
        //     context.call(i);
        // }
        // return null
        throw new Error
    }

    readTokens(script: string) {
        let tokenIndex = 0;
        let buffer = "";
        let tokens = [];
        let grammar: { start:any, match:any } |null = null;
        for (let i of script) {
            if (grammar) {
                if (grammar.match(i)) {
                    buffer = buffer.concat(i);
                } else {
                    tokens.push(buffer);
                }
            } else {
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
    start: function (char: string) {
        let code = char.charCodeAt(0);
        Nums.doted = false;
        return code >= 47 && code <= 57;
    },
    match: function (char: string) {
        let code = char.charCodeAt(0);
        if (code >= 47 && code <= 57) {
            return true;
        } else if (code == 46) {
            Nums.doted = true
            return true;
        }
    }
}

const LeftBracket = {
    start: function (char: string) { return char == "(" },
    match: function (char: string) { return false }
}

const Bracket = {
    start: function (char: string) { return char == "(" || char == ")" || char == "" },
    match: function (char: string) { return false }
}

const Plush = {
    start: function (char: string) {
        return char == ">" || char == "<";
    },
    match: function (char: string) {
        return char == "=";
    }
}

const Word = {
    start: function (char: string) {
        let code = char.charCodeAt(0);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            return true;
        }
    },
    match: function (char: string) {
        let code = char.charCodeAt(0);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            return true;
        }
    }
}