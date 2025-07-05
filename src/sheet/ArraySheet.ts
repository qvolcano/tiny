
export class ArraySheet<TRow> {
    private source: TRow[];
    private _length: number;
    constructor(source: TRow[]) {
        this.source = source;
        this._length = source.length;
    }

    get(index: number): TRow {
        return this.source[index];
    }

    find<TKey extends keyof TRow>(keyName: TKey, keyValue: TRow[TKey]): TRow {
        return this.source.filter(v => v[keyName] === keyValue)[0];
    }
    findAll<TKey extends keyof TRow>(keyName: TKey, keyValue: TRow[TKey]): ReadonlyArray<TRow> {
        return this.source.filter(v => v[keyName] === keyValue);
    }

    get lengeh() {
        return this._length;
    }
}
