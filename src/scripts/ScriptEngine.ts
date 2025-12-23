
export class ScriptScope {
    values = {}
    parent: ScriptScope
    type = 0
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
    scope: ScriptScope
    constructor(parent?: ScriptContext) {
        this.parent = parent
        this.scope = new ScriptScope(parent?.scope)
    }

    down() {
        let silent = this.scope.silent
        this.scope = new ScriptScope(this.scope)
        this.scope.silent = silent
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
export type Token = { value: any, type: any }

export type TokenReader = {
    type: TOKEN_TYPE,
    check: (char: string) => boolean,
    mode?: number
    start: string,
    convert?: Function
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
                let shouldSkip = this.last_position == position
                if (this.reader.mode == 1) {
                    // 跳过开始引号，并在结束引号时返回内容（支持空串与 1 字符）
                    if (shouldSkip) {
                        let nextPosition = position + 1
                        if (nextPosition < length && this.content.charAt(nextPosition) === this.reader.start) {
                            let type = this.reader.type
                            this.last_position = nextPosition + 1
                            this.position = nextPosition + 1
                            this.reader = null
                            return { value: "", type: type }
                        }
                        // 跳过开始引号
                        this.last_position = position + 1
                        position = position + 1
                        continue
                    } else {
                        let start = this.last_position
                        let end = position
                        let value: any = this.content.substring(start, end)
                        if (this.reader.convert) {
                            value = this.reader.convert(value)
                        }
                        let type = this.reader.type
                        position = position + 1
                        this.last_position = position
                        this.position = position
                        this.reader = null
                        return { value: value, type: type }
                    }
                }
                if (shouldSkip) {
                    position = position + 1
                }
                let start = this.last_position
                let end = position
                let value: any = this.content.substring(start, end)
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

    createReader(script): { read(): Token } {
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



export class ScriptEngine {
    constructor(global?: ScriptScope) {

    }
    eval(script: string, ...args: any[]) {

    }

    compile(script: string, ...args: any[]) {

    }
    setContext(context: ScriptContext) {
    }
}

export class ScriptMachine extends ScriptRuntime {

    processors: { [key: string]: Function } = {

        ["down"]: (context: ScriptContext, ...args: any[]) => { },
        ["up"]: (context: ScriptContext, ...args: any[]) => { },
        ["call"]: (context: ScriptContext, ...args: any[]) => { }
    }
}

export class RegexpScriptReder {
    regexp: RegExp
    content: string
    serializer: ScriptSerializer
    position: number
    constructor(serializer: ScriptSerializer, content: string, regexp: RegExp) {
        this.serializer = serializer;
        this.content = content;
        this.position = 0;
        this.regexp = regexp;
    }
    read(): Token {
        let match = this.regexp.exec(this.content.substring(this.position))
        if (match) {
            let value = match[0]
            let type = match[1]
            this.position += value.length
            return { value: value, type: type }
        }
    }
}
export class SimpleRegexpScriptSerializer extends ScriptSerializer {
    regexp: RegExp
    super(regexp: RegExp) {
        this.regexp = regexp;
    }

    createReader(script: string) {
        let stream = new RegexpScriptReder(this, script, this.regexp);
        return stream
    }
}
