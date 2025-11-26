interface Bindings {
    containsKey(key: any): void;
    get(key: any): void;
    put(name: string, value: any): void;
    putAll(toMerge: {
        [key: string]: {
            name: string;
            value: any;
        };
    }): void;
    remove(key: any): void;
}

interface IScriptContext {
    eval(tokens: any[]): void;
    eval(script: string): void;
    eval(script: string, bindings: Bindings): void;
    get(key: string): any;
    getBindings(scope: number): Bindings;
    getContext(): IScriptContext;
    getScriptContext(nn: Bindings): IScriptContext;
    put(key: string, value: any): void;
    setBindings(bindings: Bindings, scope: number): void;
    setContext(ctxt: IScriptContext): void;
}

declare class ScriptEngine {
}

declare class BlockScriptRuntime {
    evalBlock(block: Block): void;
}
declare const builtin: {
    sum: (...args: Block[]) => any;
};
interface Block {
    mothed: string;
    params: Block[];
    valueOf(): any;
}

declare class rple {
    grammars: {
        start: (char: string) => boolean;
        match: (char: string) => boolean;
    }[];
    eval(): void;
    compile(script: string): Function;
    readTokens(script: string): any[];
}

declare enum TOKEN_TYPE {
    NUMBER = 0,
    STRING = 1,
    KEY = 2,
    LP = 3,
    RP = 4,
    COM = 5,
    DEFAULT = 6
}
declare class ScriptScope {
    values: {};
    parent: ScriptScope;
    silent: number;
    stack: any[];
    constructor(parent?: ScriptScope);
    set_value(key: string, value: any): void;
    get_value(key: string): any;
}
declare class ScriptContext {
    parent: ScriptContext;
    scope: ScriptScope;
    constructor(parent?: ScriptContext);
    down(): void;
    up(): void;
    get_value(key: string): any;
    set_value(key: string, value: any): void;
}
declare const JassRuntimeProcessor: {
    6: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
    3: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
    4: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
    5: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
    1: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
    2: (token: {
        value: any;
        type: TOKEN_TYPE;
    }, context: ScriptContext) => void;
};
type TokenReader = {
    type: TOKEN_TYPE;
    check: (char: string) => boolean;
    mode?: number;
    start: string;
    convert?: Function;
};
declare const BUILTIN_TOKEN_READER: {
    TOKEN_COM: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
    };
    TOKEN_LP: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
    };
    TOKEN_RP: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
    };
    TOKEN_NUMBER: {
        type: TOKEN_TYPE;
        start: string;
        convert: NumberConstructor;
        check: (char: string) => boolean;
        single: boolean;
    };
    TOKEN_STRING_1: {
        type: TOKEN_TYPE;
        start: string;
        convert: StringConstructor;
        check: (char: string) => boolean;
        mode: number;
        single: boolean;
    };
    TOKEN_KEY: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
        single: boolean;
    };
};
declare class ScriptRender {
    serializer: ScriptSerializer;
    reader: TokenReader;
    content: string;
    position: number;
    last_position: number;
    constructor(serializer: ScriptSerializer, content: string);
    read(): {
        value: string;
        type: TOKEN_TYPE;
    };
}
declare class ScriptSerializer {
    root: any;
    constructor(tokens: any);
    createReader(script: any): ScriptRender;
    getReader(text: string, position: number): any;
}
declare class ScriptRuntime {
    processors: {
        [key: string]: Function;
    };
    constructor(processors: any);
    input(token: any, context: any): void;
}
declare class JassScriptEngine {
    global: ScriptContext;
    serializer: ScriptSerializer;
    runtime: ScriptRuntime;
    context: ScriptContext;
    constructor(global?: ScriptScope);
    eval(script: string): void;
    commpile(script: string, scriptScope: ScriptScope): void;
    setContext(context: ScriptContext): void;
}

declare class ReliScriptEngine {
    reader: ReliTokenReader;
    countFTokens(tokens: string[], context: any, params?: {
        [key: string]: any;
    }): number;
    eval(script: string): number;
}
/**解释嵌套函数字符串为逆波兰
 * 例子: and(and(not(isCharge),mte(Strength,80)),and(mte(Wing,28),lt(Mount,32)))
 * 输出: isCharge,not,Strength,80,mte,and,Wing,28,mte,Mount,32,lt,and,and
 */
declare class ReliTokenReader {
    private tokens;
    private posistion;
    load(script: string): void;
    read(): string;
    readAll(): string[];
}

declare class StackFlowContext implements IScriptContext {
    bindingsList: any;
    runtime: StackRuntime;
    constructor();
    eval(tokens: any[]): void;
    eval(script: string): void;
    eval(script: string, bindings: Bindings): void;
    get(key: string): void;
    getBindings(scope: number): Bindings;
    getContext(): IScriptContext;
    getScriptContext(nn: Bindings): IScriptContext;
    put(key: string, value: any): void;
    setBindings(bindings: Bindings, scope: number): void;
    setContext(ctxt: IScriptContext): void;
    compile(script: string): Function;
}
declare class StackRuntime {
    private bindings;
    private stacks;
    private stack;
    constructor();
    setBindings(bindings: Bindings): void;
    push(value: any): void;
    pop(): any;
    call(): void;
    down(): void;
    up(): void;
}

declare class TinyScriptContext {
    get(arg0: string): any;
}

declare class TinyScriptEngine extends ScriptEngine {
    reander: TinyTokenReader;
    eval(script: string, context: TinyScriptContext): any;
}
declare class TinyScriptRuntime {
    context: TinyScriptContext;
    stack: any[];
    stackScope: number;
    start(context: TinyScriptContext): void;
    input(token: Token): void;
    output(): void;
}
declare enum TinyTokenType {
    STRING = 0,
    ADD = 1,
    SUB = 2,
    MUP = 3,
    EXP = 4,
    BIG = 5,
    MIN = 6,
    LK = 7,
    RK = 8,
    NUM = 9,
    SP = 10,
    VAR = 11
}
type TinyTokenReaderRule = {
    begin: any;
    end: any;
    type: any;
};
declare class TinyTokenReader {
    curRule: TinyTokenReaderRule;
    content: string;
    rules: TinyTokenReaderRule[];
    position: number;
    constructor(rules: TinyTokenReaderRule[]);
    load(content: string): void;
    read(): Token | null;
}
interface Token {
    type: number | string;
    value: string;
}

declare class TrickScriptEngine extends ScriptEngine {
    eval(script: string, params: any[], context: any & IScriptContext): any;
    compile(script: string, context: IScriptContext): Function | undefined;
    private _compile;
    private loadTokens;
    private input;
}

export { BUILTIN_TOKEN_READER, Bindings, Block, BlockScriptRuntime, IScriptContext, JassRuntimeProcessor, JassScriptEngine, ReliScriptEngine, ReliTokenReader, ScriptContext, ScriptEngine, ScriptRender, ScriptRuntime, ScriptScope, ScriptSerializer, StackFlowContext, StackRuntime, TOKEN_TYPE, TinyScriptContext, TinyScriptEngine, TinyScriptRuntime, TinyTokenReader, TinyTokenReaderRule, TinyTokenType, Token, TokenReader, TrickScriptEngine, builtin, rple };
