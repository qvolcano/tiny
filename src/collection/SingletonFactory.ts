import { DefintionKey } from './../definition/DefintionKey';
export class SingletonFactory<T>{
    private table: { [key: string]: { instance: T | null, constructor: DefintionKey<T> } } = {};
    constructor(public autoCreate: boolean = false, public autoRegister = false, public creator?: (def:any) => T) {
        
    }
    register<T>(def: DefintionKey<T>): void{
        if(def){
            let key = def["name"];
            if(key){
                this.table[key] = {
                    instance: null,
                    constructor: def as any,
                }
                if (this.autoCreate) {
                    this.get(def);
                }
            }
        }
    }
    get<T>(def: DefintionKey<T>): T|undefined {
        if(def){
            let key = def.name;
            if(key){
                let item = this.table[key];
                if (item) {
                    if (item.instance) {
                        return item.instance as any;
                    } else {
                        let creator = this.creator || SingletonFactory.DEFAULT_CREATOR;
                        return item.instance =creator(item.constructor) as any;
                    }
                } else {
                    
                    if (this.autoRegister) {
                        this.register(def);
                        return this.get(def);
                    }
                }
            }
        }
    }
    forEach(callback: (item: T) => void) {
        for (let key in this.table) {
            let instance = this.get(this.table[key].constructor);
            instance&&callback(instance);
        }
    }

    static DEFAULT_CREATOR<T>(def:DefintionKey<T>):T {
        return new (def as any)();
    }
}