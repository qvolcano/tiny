'use strict';

class ScriptScope {
    constructor(parent) {
        this.values = {};
        this.type = 0;
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
        this.scope = new ScriptScope(parent === null || parent === void 0 ? void 0 : parent.scope);
    }
    down() {
        let silent = this.scope.silent;
        this.scope = new ScriptScope(this.scope);
        this.scope.silent = silent;
    }
    up() {
        this.scope = this.scope.parent;
    }
    get_value(key) {
        var _a;
        return this.scope.get_value(key) || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.get_value(key));
    }
    set_value(key, value) {
        this.scope.set_value(key, value);
    }
}
exports.TOKEN_TYPE = void 0;
(function (TOKEN_TYPE) {
    TOKEN_TYPE[TOKEN_TYPE["NUMBER"] = 0] = "NUMBER";
    TOKEN_TYPE[TOKEN_TYPE["STRING"] = 1] = "STRING";
    TOKEN_TYPE[TOKEN_TYPE["KEY"] = 2] = "KEY";
    TOKEN_TYPE[TOKEN_TYPE["LP"] = 3] = "LP";
    TOKEN_TYPE[TOKEN_TYPE["RP"] = 4] = "RP";
    TOKEN_TYPE[TOKEN_TYPE["COM"] = 5] = "COM";
    TOKEN_TYPE[TOKEN_TYPE["LB"] = 6] = "LB";
    TOKEN_TYPE[TOKEN_TYPE["RB"] = 7] = "RB";
    TOKEN_TYPE[TOKEN_TYPE["DEFAULT"] = 8] = "DEFAULT";
})(exports.TOKEN_TYPE || (exports.TOKEN_TYPE = {}));
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
                let shouldSkip = this.last_position == position;
                if (this.reader.mode == 1) {
                    // 跳过开始引号，并在结束引号时返回内容（支持空串与 1 字符）
                    if (shouldSkip) {
                        let nextPosition = position + 1;
                        if (nextPosition < length && this.content.charAt(nextPosition) === this.reader.start) {
                            let type = this.reader.type;
                            this.last_position = nextPosition + 1;
                            this.position = nextPosition + 1;
                            this.reader = null;
                            return { value: "", type: type };
                        }
                        // 跳过开始引号
                        this.last_position = position + 1;
                        position = position + 1;
                        continue;
                    }
                    else {
                        let start = this.last_position;
                        let end = position;
                        let value = this.content.substring(start, end);
                        if (this.reader.convert) {
                            value = this.reader.convert(value);
                        }
                        let type = this.reader.type;
                        position = position + 1;
                        this.last_position = position;
                        this.position = position;
                        this.reader = null;
                        return { value: value, type: type };
                    }
                }
                if (shouldSkip) {
                    position = position + 1;
                }
                let start = this.last_position;
                let end = position;
                let value = this.content.substring(start, end);
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
        (this.processors[token.type] || this.processors[exports.TOKEN_TYPE.DEFAULT])(token, context);
    }
}
class ScriptEngine {
    constructor(global) {
    }
    eval(script, ...args) {
    }
    compile(script, ...args) {
    }
    setContext(context) {
    }
}
class ScriptMachine extends ScriptRuntime {
    constructor() {
        super(...arguments);
        this.processors = {
            ["down"]: (context, ...args) => { },
            ["up"]: (context, ...args) => { },
            ["call"]: (context, ...args) => { }
        };
    }
}
class RegexpScriptReder {
    constructor(serializer, content, regexp) {
        this.serializer = serializer;
        this.content = content;
        this.position = 0;
        this.regexp = regexp;
    }
    read() {
        let match = this.regexp.exec(this.content.substring(this.position));
        if (match) {
            let value = match[0];
            let type = match[1];
            this.position += value.length;
            return { value: value, type: type };
        }
    }
}
class SimpleRegexpScriptSerializer extends ScriptSerializer {
    super(regexp) {
        this.regexp = regexp;
    }
    createReader(script) {
        let stream = new RegexpScriptReder(this, script, this.regexp);
        return stream;
    }
}

exports.RegexpScriptReder = RegexpScriptReder;
exports.ScriptContext = ScriptContext;
exports.ScriptEngine = ScriptEngine;
exports.ScriptMachine = ScriptMachine;
exports.ScriptRender = ScriptRender;
exports.ScriptRuntime = ScriptRuntime;
exports.ScriptScope = ScriptScope;
exports.ScriptSerializer = ScriptSerializer;
exports.SimpleRegexpScriptSerializer = SimpleRegexpScriptSerializer;
