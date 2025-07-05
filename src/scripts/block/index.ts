export class BlockScriptRuntime {
    evalBlock(block:Block){

    }
}

export const builtin = {
    "sum": (...args:Block[])=>{
        return args.reduce((a,b)=>a.valueOf()+b.valueOf(),0)
    }
}

export interface Block{
    mothed:string;
    params:Block[];
    valueOf():any
}