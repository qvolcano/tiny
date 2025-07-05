export declare class ReliScriptEngine {
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
export declare class ReliTokenReader {
    private tokens;
    private posistion;
    load(script: string): void;
    read(): string;
    readAll(): string[];
}
