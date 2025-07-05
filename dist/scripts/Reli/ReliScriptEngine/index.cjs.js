'use strict';

var ReliBuildin = {
    "if": function (a) { return Boolean(a); },
    "not": function (a) { return !a; }, //逻辑反
    "and": function (a, b) { return a && b; }, //逻辑和
    "or": function (a, b) { return a || b; }, //逻辑与
    "mte": function (a, b) { return a >= b; }, //大于等于
    "lte": function (a, b) { return a <= b; }, //小于等于
    "lt": function (a, b) { return a < b; }, //小于
    "mt": function (a, b) { return a > b; }, //大于
    "sum": function (a, b) { return a + b; }, //加
    "imsub": function (a, b) { return a - b; }, //减
    "product": function (a, b) { return a * b; }, //乘
    "quotient": function (a, b) { return a / b; }, //除
    "pow": function (a, b) { return Math.pow(a, b); }, //次方
    "mod": function (a, b) { return a % b; }, //取模
};
class ReliScriptEngine {
    countFTokens(tokens, context, params) {
        let values = [];
        for (let i of tokens) {
            if (typeof context[i] == "function") {
                values.push(context[i].apply(null, values.splice(values.length - i.length)));
            }
            else if (params && params[i] != undefined) {
                values.push(params[i]);
            }
            else {
                values.push(Number(i));
            }
        }
        return values[0];
    }
    eval(script) {
        this.reader.load(script);
        let tokens = this.reader.readAll();
        return this.countFTokens(tokens, ReliBuildin);
    }
}
/**解释嵌套函数字符串为逆波兰
 * 例子: and(and(not(isCharge),mte(Strength,80)),and(mte(Wing,28),lt(Mount,32)))
 * 输出: isCharge,not,Strength,80,mte,and,Wing,28,mte,Mount,32,lt,and,and
 */
class ReliTokenReader {
    constructor() {
        this.posistion = 0;
    }
    load(script) {
        let ts = script.split(/((?=[\)\,])|\b)/g);
        let vl = [];
        let sl = [];
        for (let token of ts) {
            if (token != "") {
                if (token == ")") {
                    vl = vl.concat(sl.splice(sl.lastIndexOf("(") + 1));
                    sl.pop();
                    let r = sl.pop();
                    if (r) {
                        vl.push(r);
                    }
                }
                else if (token != ",") {
                    sl.push(token);
                }
            }
        }
        this.tokens = vl.concat(sl);
    }
    read() {
        return this.tokens[this.posistion++];
    }
    readAll() {
        return this.tokens;
    }
}

exports.ReliScriptEngine = ReliScriptEngine;
exports.ReliTokenReader = ReliTokenReader;
