import { ScriptEngine } from "../ScriptEngine";
import { TinyScriptContext } from "./TinyScriptContext";

export class TinyScriptEngine extends ScriptEngine{
    reander=new TinyTokenReader([
        {begin:"'",end:"'",type:TinyTokenType.STRING},
        {begin:'"',end:'"',type:TinyTokenType.STRING},
        {begin:'+',end:'',type:TinyTokenType.ADD},
        {begin:'-',end:'',type:TinyTokenType.SUB},
        {begin:'*',end:'',type:TinyTokenType.MUP},
        {begin:'/',end:'',type:TinyTokenType.EXP},
        {begin:'>',end:'',type:TinyTokenType.BIG},
        {begin:'<',end:'',type:TinyTokenType.MIN},
        {begin:'(',end:'',type:TinyTokenType.LK},
        {begin:')',end:'',type:TinyTokenType.RK},
        {begin:'0123456789',end:'0123456789.',type:TinyTokenType.NUM},
        {begin:' ',end:'',type:TinyTokenType.SP},
        {begin:'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_',end:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_",type:TinyTokenType.VAR},
    ]);
    eval(script:string,context:TinyScriptContext):any{
        let runtime=new TinyScriptRuntime();
        let reander=this.reander;
        reander.load(script);
        runtime.start(context);
        let token:Token|null;
        while(token=reander.read()){
            runtime.input(token);
        }
        return context.get("@return");
    }
}

export class TinyScriptRuntime{
    context!: TinyScriptContext;
    stack=[];
    stackScope=1;
    start(context: TinyScriptContext) {
    }
    input(token:Token){
        let scope=1
        switch(token.type){
            case TinyTokenType.STRING:
                // if(this.context.get(2,))
                // this.context.put(token.value)
        }
    }
    output(){

    }
}
export enum TinyTokenType{
    STRING,
    ADD,
    SUB,
    MUP,
    EXP,
    BIG,
    MIN,
    LK,
    RK,
    NUM,
    SP,
    VAR,
}
export type TinyTokenReaderRule={begin:any,end:any,type:any}
export class TinyTokenReader{
    curRule!:TinyTokenReaderRule
    content!: string;
    rules:TinyTokenReaderRule[]
    position!:number;
    constructor(rules:TinyTokenReaderRule[]){
        this.rules=rules;
    }
    public load(content:string){
        this.content=content;
    }

    public read():Token|null{
        let tokenType;
        let buffer="";
        let content=this.content;
        let length=content.length;
        let curRule:TinyTokenReaderRule|null = null;
        for(let i=this.position;i<length;i++){
            if(curRule==null){
                for(let l of this.rules){
                    if(l.begin.indexOf(content[i])>=0){
                        curRule=l;
                    }
                }
            }

            if(curRule){
                if(curRule.end.indexOf(i)>=0){
                    buffer=buffer.concat(content[i]);
                }else{
                    tokenType=curRule.type;
                }
            }
            if(tokenType){
                buffer="";
                tokenType="";
                return {value:buffer,type:tokenType};
            }
        }
        return null;
    }
}

export interface Token{
    type:number|string;
    value:string;
}