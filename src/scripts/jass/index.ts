import { ScriptContext, ScriptRuntime, ScriptScope, ScriptSerializer, TOKEN_TYPE, Token } from "../ScriptEngine"


type Processor = (token: Token, context: ScriptContext) => void
type CallNode = { __jass_call: true, apply: Function, arguments: any[] }
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
    let args = node.arguments.map((arg) => isCallNode(arg) ? evaluateCallNode(arg) : arg)
    return node.apply.apply(null, args)
}

export const createFunctionList = (stack:any[]): Function => {
    return function(){
        for (const call of stack) {
            evaluateCallNode(call)
        }
    }
}
export const processors =  {
    [TOKEN_TYPE.DEFAULT] : function (token: Token, context: ScriptContext) {
        context.scope.stack.push(token.value)
    },
    [TOKEN_TYPE.LP] : function (token: Token, context: ScriptContext) {
        context.down()
    },
    [TOKEN_TYPE.RP] : function (token: Token, context: ScriptContext) {
        let stack = context.scope.stack
        context.up()
        //必然是function
        let mothed = context.scope.stack.pop()
        if (context.scope.silent > 0) {
            let call:CallNode = { __jass_call: true, apply: mothed, arguments: stack.slice() }
            context.scope.stack.push(call)
        }else{
            let result = mothed.apply(null, stack)
            context.scope.stack.push(result)
        }
    },
    [TOKEN_TYPE.COM] : function (_token: Token, _context: ScriptContext) {
    },
    [TOKEN_TYPE.LB] : function (_token: Token, context: ScriptContext) {
        // 运行期构建函数序列
        context.scope.silent = 1
        context.down()
    },
    [TOKEN_TYPE.RB] : function (_token: Token, context: ScriptContext) {
        let stack = context.scope.stack
        context.up()
        context.scope.stack.push(createFunctionList(stack))

    },
    [TOKEN_TYPE.STRING] : function (token: Token, context: ScriptContext) {
        context.scope.stack.push(token.value)
    },
    [TOKEN_TYPE.KEY] : function (token: Token, context: ScriptContext) {
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
        this.runtime = new ScriptRuntime(processors)
        this.global = new ScriptContext()
        this.global.set_value("print", (...args) => console.log.apply(null, args))
        this.global.set_value("run", (list: FunctionList) => list && list())
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
