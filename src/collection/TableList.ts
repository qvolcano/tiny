export class TableList<TKey extends string | number, TValue> {
    private _index: { [key: string | number]: number } = {};
    private _keys: TKey[] = [];
    private _values: TValue[] = [];
    add(key: TKey, value: TValue) {
        this._index[key] = this._values.length;
        this._values.push(value);
        this._keys.push(key);
        return value;
    }

    remove(key: TKey) {
        let index = this._index[key];
        if (index != null) {
            let last = this._values.length - 1;
            let value = this._values[index];

            if (index < last) {
                this._values[index] = this._values[last];
                this._keys[index] = this._keys[last];
                this._index[this._keys[index]] = index;
            }

            this._values.length = last;
            this._keys.length = last;
            delete this._index[key];

            return value;
        }
    }

    get(key: TKey): TValue | undefined {
        if (this._index[key] != null) {
            return this._values[this._index[key]];
        }
    }

    values() {
        return this._values;
    }

    keys() {
        return this._keys
    }

}