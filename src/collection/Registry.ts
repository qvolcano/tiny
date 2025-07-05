export class Registry<T extends {context:T["context"]}>{
    private values:{[key:string]:T}={}
    constructor(private onAdded?:(item:any)=>void,private onRemoved?:(item:any)=>void){

    }

    add(name:string,value:T){
        this.remove(name);
        this.values[name]=value;
        this.onAdded&&this.onAdded(this);
    }

    remove(name:string){
        let old = this.values[name];
        if(old){
            delete this.values[name];
            this.onRemoved&&this.onRemoved(this);
        }
    }

    get(name:string):T{
        return this.values[name]
    }
}