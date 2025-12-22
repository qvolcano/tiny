'use strict';

// // 单小便捷灵活的脚本引擎基础
// export interface Token {
//     type: number;
//     value: any;
// }
// export interface TokenReader {
//     type: number;
//     start: string;
//     check: (char: string) => boolean;
//     convert?: Function;
//     single?: boolean;
//     mode?: number;
// }
// export enum TOKEN_TYPE {
//     NUMBER,
//     STRING,
//     KEY,
//     LP,
//     RP,
//     COM,
//     DEFAULT
// }
// export class ScriptScope {
//     values:{[key:string]:any} = {}
//     parent?: ScriptScope
//     stack: any[] = []
//     constructor(parent?: ScriptScope) {
//         this.parent = parent
//     }
//     set_value(key: string, value: any) {
//         this.values[key] = value
//     }
//     get_value(key: string) {
//         return this.values[key] || this.parent?.get_value(key)
//     }
// }
// export class ScriptContext {
//     parent?: ScriptContext
//     scope = new ScriptScope()
//     compileMode = false
//     constructor(parent?: ScriptContext, compileMode = false) {
//         this.parent = parent
//         this.compileMode = compileMode
//     }
//     down() {
//         this.scope = new ScriptScope(this.scope)
//     }
//     up() {
//         this.scope = this.scope.parent!
//     }
//     get_value(key: string) {
//         return this.scope.get_value(key) || this.parent?.get_value(key)
//     }
//     set_value(key: string, value: any) {
//         this.scope.set_value(key, value)
//     }
// }
// export function createOptimizedFunction(method: Function, stack: any[]): Function {
//     const allConstants = stack.every(arg => typeof arg !== 'function');
//     if (allConstants) {
//         const constantResult = method.apply(null, stack);
//         return function(...runtimeArgs: any[]) {
//             return constantResult;
//         };
//     }
//     return function(...runtimeArgs: any[]) {
//         const processedArgs = stack.map(arg => {
//             if (typeof arg === 'function') {
//                 return arg();
//             }
//             return arg;
//         });
//         const combinedArgs = [...processedArgs, ...runtimeArgs];
//         return method.apply(null, combinedArgs);
//     };
// }
// export abstract class BaseEngine {
//     protected serializer: any;
//     protected runtime: any;
//     constructor(tokens: TokenReader[], processors: { [key: number]: Function }) {
//         this.serializer = { read: (script: string) => new BaseReader(tokens, script) };
//         this.runtime = { process: (token: Token, context: any) => (processors[token.type] || processors[0])(token, context) };
//     }
// }
// class BaseReader {
//     content: string;
//     position = 0;
//     tokens: TokenReader[];
//     constructor(tokens: TokenReader[], content: string) {
//         this.tokens = tokens;
//         this.content = content;
//     }
//     read(): Token | null {
//         while (this.position < this.content.length) {
//             let char = this.content[this.position];
//             // 跳过空格
//             if (char === ' ') {
//                 this.position++;
//                 continue;
//             }
//             let reader = this.findReader(char);
//             if (!reader) {
//                 this.position++;
//                 continue;
//             }
//             let start = this.position;
//             if (reader.single) {
//                 this.position++;
//                 let value = char;
//                 if (reader.convert) value = reader.convert(value);
//                 return { type: reader.type, value };
//             }
//             // 处理字符串特殊情况
//             if (reader.mode === 1) {
//                 this.position++; // 跳过开始引号
//                 start = this.position;
//                 while (this.position < this.content.length && this.content[this.position] !== "'") {
//                     this.position++;
//                 }
//                 let value = this.content.substring(start, this.position);
//                 this.position++; // 跳过结束引号
//                 return { type: reader.type, value };
//             }
//             // 处理普通token
//             this.position++;
//             while (this.position < this.content.length && reader.check(this.content[this.position])) {
//                 this.position++;
//             }
//             let value = this.content.substring(start, this.position);
//             if (reader.convert) value = reader.convert(value);
//             return { type: reader.type, value };
//         }
//         return null;
//     }
//     private findReader(char: string): TokenReader | null {
//         return this.tokens.find(token => token.start.includes(char));
//     }
// }
class BaseEngine {
}

exports.BaseEngine = BaseEngine;
