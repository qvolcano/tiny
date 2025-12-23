import { ScriptContext, ScriptRuntime, ScriptScope, ScriptSerializer, TOKEN_TYPE, Token } from "../ScriptEngine"

enum SCOPE_TYPE {
    CALL = 0,
    LIST_FN = 1
}

const builders: Array<(scope: ScriptScope) => any> = []

const evaluateCallNode = (scope: ScriptScope): any => {
    let method = scope.stack[0] as Function
    let args: any[] = []
    for (let i = 1; i < scope.stack.length; i++) {
        let value = scope.stack[i]
        if (value instanceof ScriptScope) {
            value = builders[value.type](value)
        }
        args.push(value)
    }
    return method.apply(scope, args)
}

const buildFunctionList = (scope: ScriptScope): Function[] => {
    let list: Function[] = []
    for (const item of scope.stack) {
        if (item instanceof ScriptScope) {
            const node = item
            list.push(() => builders[node.type](node))
            continue
        }
        if (typeof item === "function") {
            list.push(item)
            continue
        }
        throw new Error("jass: list item must be function")
    }
    return list
}

builders[SCOPE_TYPE.CALL] = evaluateCallNode
builders[SCOPE_TYPE.LIST_FN] = buildFunctionList


export const processors = {
    [TOKEN_TYPE.DEFAULT]: function (token: Token, context: ScriptContext) {
        context.scope.stack.push(token.value)
    },
    [TOKEN_TYPE.LP]: function (_token: Token, context: ScriptContext) {
        let method = context.scope.stack.pop()
        context.down()
        context.scope.type = SCOPE_TYPE.CALL
        context.scope.stack.push(method)
    },
    [TOKEN_TYPE.RP]: function (_token: Token, context: ScriptContext) {
        let scope = context.scope
        context.up()
        context.scope.stack.push(scope)
    },
    [TOKEN_TYPE.COM]: function (_token: Token, _context: ScriptContext) {
    },
    [TOKEN_TYPE.LB]: function (_token: Token, context: ScriptContext) {
        context.down()
        context.scope.type = SCOPE_TYPE.LIST_FN
    },
    [TOKEN_TYPE.RB]: function (_token: Token, context: ScriptContext) {
        let scope = context.scope
        context.up()
        context.scope.stack.push(scope)
    },
    [TOKEN_TYPE.STRING]: function (token: Token, context: ScriptContext) {
        context.scope.stack.push(token.value)
    },
    [TOKEN_TYPE.KEY]: function (token: Token, context: ScriptContext) {
        context.scope.stack.push(context.get_value(token.value))
    }
}


export const BUILTIN_TOKEN_READER = {
    TOKEN_COM: {
        type: TOKEN_TYPE.COM,
        start: ",",
        check: (char: string) => false
    },
    TOKEN_LB: {
        type: TOKEN_TYPE.LB,
        start: "[",
        check: (char: string) => false
    },
    TOKEN_RB: {
        type: TOKEN_TYPE.RB,
        start: "]",
        check: (char: string) => false
    },
    TOKEN_LP: {
        type: TOKEN_TYPE.LP,
        start: "(",
        check: (char: string) => false
    },
    TOKEN_RP: {
        type: TOKEN_TYPE.RP,
        start: ")",
        check: (char: string) => false
    },
    TOKEN_NUMBER: {
        type: TOKEN_TYPE.NUMBER,
        start: "0123456789",
        convert: Number,
        check: (char: string) => char.charCodeAt(0) >= 45 && char.charCodeAt(0) <= 57,
        single: true
    },
    TOKEN_STRING_1: {
        type: TOKEN_TYPE.STRING,
        start: "'",
        convert: String,
        check: (char: string) => char != "'",
        mode: 1
    },
    TOKEN_STRING_2: {
        type: TOKEN_TYPE.STRING,
        start: '"',
        convert: String,
        check: (char: string) => char != '"',
        mode: 1
    },
    TOKEN_KEY: {
        type: TOKEN_TYPE.KEY,
        start: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        check: (char: string) => {
            let code = char.charCodeAt(0)
            return (code >= 48 && code <= 57)
                || (code >= 65 && code <= 90)
                || (code >= 97 && code <= 122)
                || char === "_"
                || char === "-"
        },
        single: true
    }
}

export class JassScriptEngine {
    global: ScriptContext
    serializer: ScriptSerializer
    runtime: ScriptRuntime
    context: ScriptContext
    constructor(global?: ScriptScope) {
        this.serializer = new ScriptSerializer([
            BUILTIN_TOKEN_READER.TOKEN_KEY,
            BUILTIN_TOKEN_READER.TOKEN_COM,
            BUILTIN_TOKEN_READER.TOKEN_LB,
            BUILTIN_TOKEN_READER.TOKEN_RB,
            BUILTIN_TOKEN_READER.TOKEN_LP,
            BUILTIN_TOKEN_READER.TOKEN_RP,
            BUILTIN_TOKEN_READER.TOKEN_NUMBER,
            BUILTIN_TOKEN_READER.TOKEN_STRING_1,
            BUILTIN_TOKEN_READER.TOKEN_STRING_2
        ])
        this.runtime = new ScriptRuntime(processors)
        this.global = new ScriptContext()
        this.global.set_value("print", (...args) => console.log.apply(null, args))
        let run = (list: Function[]) => { for (const fn of list) { fn() } }
        this.global.set_value("run", run)
    }
    eval(script: string) {
        let stream = this.serializer.createReader(script)
        let token = null;
        let context = new ScriptContext(this.global)
        context.scope.type = SCOPE_TYPE.CALL
        while (token = stream.read()) {
            this.runtime.input(token, context)
        }
        let root = context.scope.stack.pop()
        if (root instanceof ScriptScope) {
            return builders[root.type](root)
        }
        return root
    }

    compile(script: string) {
        let stream = this.serializer.createReader(script)
        let token = null;
        let context = new ScriptContext(this.global)
        context.scope.type = SCOPE_TYPE.CALL
        while (token = stream.read()) {
            this.runtime.input(token, context)
        }
        let root = context.scope.stack.pop()
        return () => {
            if (root instanceof ScriptScope) {
                return builders[root.type](root)
            }
            return root
        }
    }
    setContext(context: ScriptContext) {
        this.context = context;
    }
}
//? compile 编译成function
//? scope隔离
//? 暂停继续
