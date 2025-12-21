export enum TOKEN_TYPE {
    NUMBER,
    STRING,
    KEY,
    LP,
    RP,
    COM,
    LB,
    RB,
    DEFAULT
}
type Token = { value: any, type: TOKEN_TYPE }
type Processor = (token: Token, context: ScriptContext) => void
type CallNode = { __jass_call: true, fn: Function, args: any[] }
type FunctionListItem = CallNode
type ListFrame = { list: FunctionList, scope: ScriptScope }
export type FunctionList = {
    (): any
    items: FunctionListItem[]
    run: () => any
}

const isCallNode = (value: any): value is CallNode => {
    return Boolean(value && value.__jass_call)
}

const evaluateCallNode = (node: CallNode): any => {
    let args = node.args.map((arg) => isCallNode(arg) ? evaluateCallNode(arg) : arg)
    return node.fn.apply(null, args)
}

export const createFunctionList = (): FunctionList => {
    const fn = (() => fn.run()) as FunctionList
    fn.items = []
    fn.run = () => {
        let result
        for (let item of fn.items) {
            result = evaluateCallNode(item)
        }
        return result
    }
    return fn
}
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
    // 解析期函数序列栈，用于处理 [] 嵌套
    list_stack: ListFrame[] = []
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
        let mothed = typeof mothed_name === "function" ? mothed_name : context.get_value(mothed_name)
        if (context.list_stack.length > 0) {
            let frame = context.list_stack[context.list_stack.length - 1]
            let call = { __jass_call: true, fn: mothed, args: stack.slice() }
            // 列表模式下只收集调用，不执行
            if (frame.scope === context.scope) {
                frame.list.items.push(call)
            } else {
                context.scope.stack.push(call)
            }
            return
        }
        let result = mothed.apply(null, stack)
        // 让外层调用可以拿到返回值
        context.scope.stack.push(result)
    }
    processors[TOKEN_TYPE.COM] = function (_token: Token, _context: ScriptContext) {

    }
    processors[TOKEN_TYPE.LB] = function (_token: Token, context: ScriptContext) {
        // 运行期构建函数序列
        context.list_stack.push({ list: createFunctionList(), scope: context.scope })
    }
    processors[TOKEN_TYPE.RB] = function (_token: Token, context: ScriptContext) {
        if (context.list_stack.length > 0) {
            // 结束函数序列，将列表作为值压回参数栈
            let frame = context.list_stack.pop()
            context.scope.stack.push(frame.list)
        }
    }
    processors[TOKEN_TYPE.STRING] = function (token: Token, context: ScriptContext) {
        context.scope.stack.push(token.value)
    }
    processors[TOKEN_TYPE.KEY] = function (token: Token, context: ScriptContext) {
        let value = context.get_value(token.value)
        context.scope.stack.push(value !== undefined ? value : token.value)
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
        (this.processors[token.type] || this.processors[TOKEN_TYPE.DEFAULT])(token, context)
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
            BUILTIN_TOKEN_READER.TOKEN_STRING_1
        ])
        this.runtime = new ScriptRuntime(JassRuntimeProcessor)
        this.global = new ScriptContext()
        this.global.set_value("print", (...args) => console.log.apply(null, args))
        this.global.set_value("run", (list: FunctionList) => list && list())
        this.global.set_value("if", (cond: any, yes: any, no: any) => {
            if (cond) {
                return typeof yes === "function" ? yes() : yes
            }
            return typeof no === "function" ? no() : no
        })
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

    compile(script: string) {
        let stream = this.serializer.createReader(script)
        let token = null;
        let context = new ScriptContext(this.context || this.global)
        let program = createFunctionList()
        // 让整个脚本在列表模式下解析，等价于隐式的 []
        context.list_stack.push({ list: program, scope: context.scope })
        while (token = stream.read()) {
            this.runtime.input(token, context)
        }
        return () => program()
    }
    setContext(context: ScriptContext) {
        this.context = context;
    }
}
//? compile 编译成function
//? scope隔离
//? 暂停继续
