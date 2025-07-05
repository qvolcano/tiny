class ScriptScope {
    constructor(parent) {
        this.values = {};
        this.silent = 0;
        this.stack = [];
        this.parent = parent;
    }
    set_value(key, value) {
        this.values[key] = value;
    }
    get_value(key) {
        var _a;
        return this.values[key] || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.get_value(key));
    }
}
class ScriptContext {
    constructor(parent) {
        this.parent = parent;
    }
    down() {
        this.scope = new ScriptScope(this.scope);
    }
    up() {
        this.scope = this.scope.parent;
    }
    get_value(key) {
        return this.scope.get_value(key);
    }
    set_value(key, value) {
        this.scope.set_value(key, value);
    }
}
const JassRuntimeProcessor = {
    [TOKEN_TYPE.DEFAULT](token, context) {
    },
    [TOKEN_TYPE.COM](token, context) {
        //context.silent++
    },
    [TOKEN_TYPE.STRING](token, context) {
        //context.set_value("")
    },
    [TOKEN_TYPE.NUMBER](token, context) {
        //context.set_value(token.value)
    }
};
var TOKEN_TYPE;
(function (TOKEN_TYPE) {
    TOKEN_TYPE[TOKEN_TYPE["NUMBER"] = 0] = "NUMBER";
    TOKEN_TYPE[TOKEN_TYPE["STRING"] = 1] = "STRING";
    TOKEN_TYPE[TOKEN_TYPE["KEY"] = 2] = "KEY";
    TOKEN_TYPE[TOKEN_TYPE["LP"] = 3] = "LP";
    TOKEN_TYPE[TOKEN_TYPE["RP"] = 4] = "RP";
    TOKEN_TYPE[TOKEN_TYPE["COM"] = 5] = "COM";
    TOKEN_TYPE[TOKEN_TYPE["DEFAULT"] = 6] = "DEFAULT";
})(TOKEN_TYPE || (TOKEN_TYPE = {}));
const BUILTIN_TOKEN_READER = {
    TOKEN_COM: {
        type: TOKEN_TYPE.COM,
        start: ",",
        check: (char) => false
    },
    TOKEN_LP: {
        type: TOKEN_TYPE.LP,
        start: "(",
        check: (char) => false
    },
    TOKEN_RP: {
        type: TOKEN_TYPE.RP,
        start: ")",
        check: (char) => false
    },
    TOKEN_NUMBER: {
        type: TOKEN_TYPE.NUMBER,
        start: "01234556789",
        convert: Number,
        check: (char) => char.charCodeAt(0) >= 45 && char.charCodeAt(0) <= 57,
        single: true
    },
    TOKEN_KEY: {
        type: TOKEN_TYPE.KEY,
        start: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        check: (char) => {
            return char.charCodeAt(0) >= 45 && char.charCodeAt(0) <= 128;
        },
        single: true
    }
};
class ScriptRender {
    constructor(serializer, content) {
        this.position = 0;
        this.last_position = 0;
        this.serializer = serializer;
        this.content = content;
    }
    read() {
        let length = this.content.length;
        let position = this.position;
        for (; position < length; position++) {
            let char = this.content.charAt(position);
            this.reader = this.reader || this.serializer.getReader(this.content, position);
            if (!this.reader.check(char)) {
                if (this.last_position == position) {
                    position = position + 1;
                }
                let end = position;
                let value = this.content.substring(this.last_position, end);
                if (this.reader.convert) {
                    value = this.reader.convert(value);
                }
                let type = this.reader.type;
                this.last_position = position;
                this.position = position;
                this.reader = null;
                return { value: value, type: type };
            }
        }
    }
}
class ScriptSerializer {
    constructor(tokens) {
        this.root = {};
        for (let i of tokens) {
            let node = this.root;
            for (let k of i.start) {
                if (!node[k]) {
                    node[k] = {};
                }
                node = node[k];
                if (i.single) {
                    node.value = i;
                    node = this.root;
                }
            }
            if (node != this.root) {
                node.value = i;
            }
        }
        this.root.default = tokens[0];
    }
    createReader(script) {
        let stream = new ScriptRender(this, script);
        return stream;
    }
    getReader(text, position) {
        let node = this.root;
        let length = text.length;
        for (; position < length; position++) {
            let char = text.charAt(position);
            if (node[char]) {
                node = node[char];
            }
        }
        return node.value || this.root.default;
    }
}
class ScriptRuntime {
    constructor(processors) {
        this.processors = processors;
    }
    input(token, context) {
        this.processors[token.type] || this.processors[TOKEN_TYPE.DEFAULT](token, context);
    }
}
class JassScriptEngine {
    constructor(global) {
        this.serializer = new ScriptSerializer([
            BUILTIN_TOKEN_READER.TOKEN_COM,
            BUILTIN_TOKEN_READER.TOKEN_LP,
            BUILTIN_TOKEN_READER.TOKEN_RP,
            BUILTIN_TOKEN_READER.TOKEN_NUMBER
        ]);
        this.runtime = new ScriptRuntime([
            JassRuntimeProcessor[TOKEN_TYPE.DEFAULT],
            JassRuntimeProcessor[TOKEN_TYPE.COM],
            JassRuntimeProcessor[TOKEN_TYPE.LP],
            JassRuntimeProcessor[TOKEN_TYPE.RP],
            JassRuntimeProcessor[TOKEN_TYPE.NUMBER],
            JassRuntimeProcessor[TOKEN_TYPE.STRING],
        ]);
        let _g = new ScriptContext(this.context);
        _g.scope = global;
        this.global.set_value("print", (...args) => console.log.apply(null, args));
    }
    eval(script) {
        let stream = this.serializer.createReader(script);
        let token = null;
        let context = new ScriptContext(this.context);
        while (token = stream.read()) {
            this.runtime.input(token, context);
        }
    }
    commpile(script, scriptScope) {
        let stream = this.serializer.createReader(script);
        let token = null;
        let context = new ScriptContext(this.context);
        while (token = stream.read()) {
            this.runtime.input(token, context);
        }
    }
    setContext(context) {
        this.context = context;
    }
}
//? compile 编译成function
//? scope隔离
//? 暂停继续

export { BUILTIN_TOKEN_READER, JassRuntimeProcessor, JassScriptEngine, ScriptContext, ScriptRender, ScriptRuntime, ScriptScope, ScriptSerializer, TOKEN_TYPE };
