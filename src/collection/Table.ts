import { ITable } from "./ITable";

export class Table<TKey, TValue> implements ITable<TKey, TValue>{
    name: string;
    value: any;

    // constructor(name: TValue, value: TValue[]| ({ [key: TValue]: TValue }))
    // constructor(table: { name: TValue, value: (TValue[]) | ({ [key: TValue]: TValue }) })
    constructor(...args: any[]) {
        if (args.length == 1) {
            this.name = args[0].name;
            this.value = args[0].name;
        } else {
            this.name = args[0];
            this.value = args[1];
        }
    }

    get(id: TKey): TValue | undefined {
        if (this.value instanceof Array) {

        } else {
            return this.value[id as any];
        }
    }

    forEach(fn: (item: TValue) => void): void {
        for (let i in this.value) {
            fn(this.value[i]);
        }
    }

    add(key: TKey, value: TValue): void {
        throw new Error("Method not implemented.");
    }
    remove(key: TKey): void {
        throw new Error("Method not implemented.");
    }
}

