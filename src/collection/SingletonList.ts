import { Type } from "../lobby/system/Type";
import { TableList } from "./TableList";

export class SingletonList<T>{
    private items: TableList<string,T> = new TableList();
    private factory: (type: Type<T>) => T;
    constructor(factory?: (type: Type<T>) => T) {
        this.factory = factory || function (type: Type<T>) { return new type };
    }

    add(type: Type<T>) {
        this.items.add(type.toString(), new type());
    }

    get(type: Type<T>): T|undefined {
        return this.items.get(type.toString());
    }

    values():T[]{
        return this.items.values();
    }
}