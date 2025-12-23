declare class BaseEngine {
}

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

declare class ScriptScope {
    values: {};
    parent: ScriptScope;
    type: number;
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
declare enum TOKEN_TYPE {
    NUMBER = 0,
    STRING = 1,
    KEY = 2,
    LP = 3,
    RP = 4,
    COM = 5,
    LB = 6,
    RB = 7,
    DEFAULT = 8
}
type Token = {
    value: any;
    type: any;
};
type TokenReader = {
    type: TOKEN_TYPE;
    check: (char: string) => boolean;
    mode?: number;
    start: string;
    convert?: Function;
};
declare class ScriptRender {
    serializer: ScriptSerializer;
    reader: TokenReader;
    content: string;
    position: number;
    last_position: number;
    constructor(serializer: ScriptSerializer, content: string);
    read(): {
        value: any;
        type: TOKEN_TYPE;
    };
}
declare class ScriptSerializer {
    root: any;
    constructor(tokens: any);
    createReader(script: any): {
        read(): Token;
    };
    getReader(text: string, position: number): any;
}
declare class ScriptRuntime {
    processors: {
        [key: string]: Function;
    };
    constructor(processors: any);
    input(token: any, context: any): void;
}
declare class ScriptEngine {
    constructor(global?: ScriptScope);
    eval(script: string, ...args: any[]): void;
    compile(script: string, ...args: any[]): void;
    setContext(context: ScriptContext): void;
}
declare class ScriptMachine extends ScriptRuntime {
    processors: {
        [key: string]: Function;
    };
}
declare class RegexpScriptReder {
    regexp: RegExp;
    content: string;
    serializer: ScriptSerializer;
    position: number;
    constructor(serializer: ScriptSerializer, content: string, regexp: RegExp);
    read(): Token;
}
declare class SimpleRegexpScriptSerializer extends ScriptSerializer {
    regexp: RegExp;
    super(regexp: RegExp): void;
    createReader(script: string): any;
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

declare const processors: {
    8: (token: Token, context: ScriptContext) => void;
    3: (_token: Token, context: ScriptContext) => void;
    4: (_token: Token, context: ScriptContext) => void;
    5: (_token: Token, _context: ScriptContext) => void;
    6: (_token: Token, context: ScriptContext) => void;
    7: (_token: Token, context: ScriptContext) => void;
    1: (token: Token, context: ScriptContext) => void;
    2: (token: Token, context: ScriptContext) => void;
};
declare const BUILTIN_TOKEN_READER: {
    TOKEN_COM: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
    };
    TOKEN_LB: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
    };
    TOKEN_RB: {
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
    };
    TOKEN_STRING_2: {
        type: TOKEN_TYPE;
        start: string;
        convert: StringConstructor;
        check: (char: string) => boolean;
        mode: number;
    };
    TOKEN_KEY: {
        type: TOKEN_TYPE;
        start: string;
        check: (char: string) => boolean;
        single: boolean;
    };
};
declare class JassScriptEngine {
    global: ScriptContext;
    serializer: ScriptSerializer;
    runtime: ScriptRuntime;
    context: ScriptContext;
    constructor(global?: ScriptScope);
    eval(script: string): any;
    compile(script: string): () => any;
    setContext(context: ScriptContext): void;
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

declare class TrickScriptEngine extends ScriptEngine {
    eval(script: string, params: any[], context: any & IScriptContext): any;
    compile(script: string, context: IScriptContext): Function | undefined;
    private _compile;
    private loadTokens;
    private input;
}

export { BUILTIN_TOKEN_READER, BaseEngine, Bindings, Block, BlockScriptRuntime, IScriptContext, JassScriptEngine, RegexpScriptReder, ReliScriptEngine, ReliTokenReader, ScriptContext, ScriptEngine, ScriptMachine, ScriptRender, ScriptRuntime, ScriptScope, ScriptSerializer, SimpleRegexpScriptSerializer, StackFlowContext, StackRuntime, TOKEN_TYPE, Token, TokenReader, TrickScriptEngine, builtin, processors, rple };
