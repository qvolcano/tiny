import { Type } from "../lobby/system/Type";

export class SingletonMap<T>{
    private maps: { [key: string]: { instance: T|undefined, type: Type<T>|null } } = {};
    private factory: (type: Type<T>) => T;
    constructor(factory?: (type: Type<T>) => T) {
        this.factory = factory || function (type: Type<T>) { return new type };
    }

    register(type: Type<T>) {
        this.maps[type.toString()] = { instance: undefined, type: type };
    }

    add(key:string, instance:T){
        this.maps[key] = { instance: instance, type: null };
    }

    get(type: Type<T>): T|undefined {
        let info = this.maps[type.toString()];
        if (info) {
            if (info.instance) {
                return info.instance;
            } else {
                if (info.type){
                    info.instance = this.factory(info.type);
                    return info.instance;
                }
            }
        }
    }

}