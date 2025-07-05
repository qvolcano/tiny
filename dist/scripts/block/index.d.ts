export declare class BlockScriptRuntime {
    evalBlock(block: Block): void;
}
export declare const builtin: {
    sum: (...args: Block[]) => any;
};
export interface Block {
    mothed: string;
    params: Block[];
    valueOf(): any;
}
