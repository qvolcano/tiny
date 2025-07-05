class StackFlowContext {
    constructor() {
        this.bindingsList = [];
        if (this.runtime == null) {
            this.runtime = new StackRuntime();
            this.bindingsList[0] = new ValueBindings(builtin);
        }
    }
    eval(script, bindings) {
        if (typeof (script) == "string") {
            let tokens;
            // this.read_tokens(script);
            let last_toekn_is_word = false;
            for (let i of tokens) {
                if (i == "(") {
                    if (last_toekn_is_word) {
                        let word = this.runtime.pop();
                        this.runtime.down();
                        this.runtime.push(word);
                    }
                    else {
                        this.runtime.down();
                    }
                    last_toekn_is_word = false;
                }
                else if (i == ")") {
                    this.runtime.call();
                    last_toekn_is_word = false;
                }
                else if (i != ",") {
                    last_toekn_is_word = true;
                    if (bindings) {
                        this.runtime.push(bindings.get(i));
                    }
                    else {
                        this.runtime.push(i);
                    }
                }
            }
        }
    }
    get(key) {
        throw new Error("Method not implemented.");
    }
    getBindings(scope) {
        throw new Error("Method not implemented.");
    }
    getContext() {
        throw new Error("Method not implemented.");
    }
    getScriptContext(nn) {
        throw new Error("Method not implemented.");
    }
    put(key, value) {
        throw new Error("Method not implemented.");
    }
    setBindings(bindings, scope) {
        throw new Error("Method not implemented.");
    }
    setContext(ctxt) {
        throw new Error("Method not implemented.");
    }
    compile(script) {
        return function (...args) {
        };
    }
}
const builtin = {
    sum: function (...args) { return args.reduce((p, c) => p + c); },
    sub: function (...args) { return args.reduce((p, c) => p - c); },
    mul: function (...args) { return args.reduce((p, c) => p * c); },
    div: function (...args) { return args.reduce((p, c) => p / c); },
};
class ValueBindings {
    constructor(value) {
        this.value = value;
    }
    containsKey(key) {
        return this.value[key] != null;
    }
    get(key) {
        return this.value[key];
    }
    put(name, value) {
        this.value[name] = value;
    }
    putAll(toMerge) {
        for (let i in toMerge) {
            this.value[i] = toMerge[i];
        }
    }
    remove(key) {
        delete this.value[key];
    }
}
class StackRuntime {
    constructor() {
        this.stacks = [this.stack = []];
    }
    setBindings(bindings) {
        this.bindings = bindings;
    }
    push(value) {
        this.stack.push(value);
    }
    pop() {
        return this.stack.pop();
    }
    call() {
        if (this.stack[0] instanceof Function) {
            let ret = this.stack.call(this.stack[0]);
            this.up();
            this.push(ret);
        }
    }
    down() {
        this.stacks.push(this.stack = []);
    }
    up() {
        this.stacks.pop();
        this.stack = this.stacks[this.stacks.length - 1];
    }
}

export { StackFlowContext, StackRuntime };
