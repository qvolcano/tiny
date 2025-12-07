export enum TOKEN_TYPE {
    NUMBER,
    STRING,
    KEY,
    LP,
    RP,
    COM,
    DEFAULT
}
type Token = { value: any, type: TOKEN_TYPE }
type Processor = (token: Token, context: ScriptContext) => void
export class ScriptScope {
    values = {}
    parent: ScriptScope
    silent = 0
    stack = []

    constructor(parent?: ScriptScope) {
        this.parent = parent
    }
    set_value(key: string, value: any) {
        this.values[key] = value
    }

    get_value(key: string) {
        return this.values[key] || this.parent?.get_value(key)
    }
}

export class ScriptContext {
    parent: ScriptContext
    scope: ScriptScope = new ScriptScope()
    constructor(parent?: ScriptContext) {
        this.parent = parent
    }

    down() {
        this.scope = new ScriptScope(this.scope)
    }

    up() {
        this.scope = this.scope.parent
    }

    get_value(key: string) {
        return this.scope.get_value(key) || this.parent?.get_value(key)
    }

    set_value(key: string, value: any) {
        this.scope.set_value(key, value)
    }

}
export const createJassRuntimeProcessor = (): Record<TOKEN_TYPE, Processor> => {
    const processors: Partial<Record<TOKEN_TYPE, Processor>> = {}
    processors[TOKEN_TYPE.DEFAULT] = function (token: Token, context: ScriptContext) {
        context.scope.stack.push(token.value)
    }
    processors[TOKEN_TYPE.LP] = function (token: Token, context: ScriptContext) {
        context.down()
    }
    processors[TOKEN_TYPE.RP] = function (token: Token, context: ScriptContext) {
        let stack = context.scope.stack
        context.up()
        let mothed_name = context.scope.stack.pop()
        let mothed = context.get_value(mothed_name)
        mothed.apply(null, stack)
    }
    processors[TOKEN_TYPE.COM] = function (_token: Token, _context: ScriptContext) {

    }
    processors[TOKEN_TYPE.STRING] = function (token: Token, context: ScriptContext) {
        context.scope.stack.push(token.value)
    }
    processors[TOKEN_TYPE.KEY] = function (token: Token, context: ScriptContext) {
        context.scope.stack.push(token.value)
    }
    return processors as Record<TOKEN_TYPE, Processor>
}

export const JassRuntimeProcessor = createJassRuntimeProcessor()



export type TokenReader = {
    type: TOKEN_TYPE,
    check: (char: string) => boolean,
    mode?: number
    start: string,
    convert?: Function
}

export const BUILTIN_TOKEN_READER = {
    TOKEN_COM: {
        type: TOKEN_TYPE.COM,
        start: ",",
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
        start: "01234556789",
        convert: Number,
        check: (char: string) => char.charCodeAt(0) >= 45 && char.charCodeAt(0) <= 57,
        single: true
    },
    TOKEN_STRING_1: {
        type: TOKEN_TYPE.STRING,
        start: "'",
        convert: String,
        check: (char: string) => char != "'",
        mode: 1,
        single: true
    },
    TOKEN_KEY: {
        type: TOKEN_TYPE.KEY,
        start: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        check: (char: string) => {
            return char.charCodeAt(0) >= 45 && char.charCodeAt(0) <= 128
        },
        single: true
    }
}

export class ScriptRender {
    serializer: ScriptSerializer
    reader: TokenReader
    content: string
    position: number = 0
    last_position: number = 0
    constructor(serializer: ScriptSerializer, content: string) {
        this.serializer = serializer
        this.content = content;
    }

    read() {
        let length = this.content.length
        let position = this.position
        for (; position < length; position++) {
            let char = this.content.charAt(position)
            this.reader = this.reader || this.serializer.getReader(this.content, position)
            if (!this.reader.check(char)) {
                if (this.last_position == position) {
                    position = position + 1
                }
                let start = this.last_position
                let end = position
                if (this.reader.mode == 1) {
                    if (position - this.last_position <= 1) {
                        this.last_position++
                        continue
                    } else {
                        position++
                    }
                }
                let value = this.content.substring(start, end)
                if (this.reader.convert) {
                    value = this.reader.convert(value)
                }
                let type = this.reader.type
                this.last_position = position
                this.position = position
                this.reader = null
                return { value: value, type: type }
            }
        }
    }
}


export class ScriptSerializer {
    root: any = {}
    constructor(tokens) {
        for (let i of tokens) {
            let node = this.root
            for (let k of i.start) {
                if (!node[k]) {
                    node[k] = {}
                }
                node = node[k]
                if (i.single) {
                    node.value = i
                    node = this.root
                }
            }
            if (node != this.root) {
                node.value = i
            }
        }
        this.root.default = tokens[0]
    }

    createReader(script) {
        let stream = new ScriptRender(this, script);
        return stream
    }

    getReader(text: string, position: number) {
        let node = this.root
        let length = text.length
        for (; position < length; position++) {
            let char = text.charAt(position)
            if (node[char]) {
                node = node[char]
            }
        }
        return node.value || this.root.default
    }
}




export class ScriptRuntime {
    processors: { [key: string]: Function }
    constructor(processors) {
        this.processors = processors
    }
    input(token: any, context) {
       ( this.processors[token.type] || this.processors[TOKEN_TYPE.DEFAULT])(token, context)
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
            BUILTIN_TOKEN_READER.TOKEN_LP,
            BUILTIN_TOKEN_READER.TOKEN_RP,
            BUILTIN_TOKEN_READER.TOKEN_NUMBER,
            BUILTIN_TOKEN_READER.TOKEN_STRING_1
        ])
        this.runtime = new ScriptRuntime(JassRuntimeProcessor)
        this.global = new ScriptContext()
        this.global.set_value("print", (...args) => console.log.apply(null, args))
    }
    eval(script: string) {
        let stream = this.serializer.createReader(script)
        let token = null;
        let context = new ScriptContext(this.global)
        while (token = stream.read()) {
            console.log(token)
            this.runtime.input(token, context)
        }
    }

    commpile(script: string, scriptScope: ScriptScope) {
        let stream = this.serializer.createReader(script)
        let token = null;
        let context = new ScriptContext(this.context)
        while (token = stream.read()) {
            this.runtime.input(token, context)
        }
    }

    setContext(context: ScriptContext) {
        this.context = context;
    }
}
//? compile 编译成function
//? scope隔离
//? 暂停继续
