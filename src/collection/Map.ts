export class Map<TKey extends string | number, TValue>{
    private _keyMap: { [key: string | number]: TValue } = {};
    private _size = 0;
    set(key: TKey, value: TValue) {
        if(value){
            if (this._keyMap[key] == null && value != null) {
                this._size++;
            }
            this._keyMap[key] = value;
        }else{
            this.delete(key);
        }
    }

    delete(key: TKey) {
        let value = this._keyMap[key];
        if (value) {
            delete this._keyMap[key];
            this._size--;
        }
        return value;
    }

    clear() {
        this._keyMap = {};
        this._size = 0;
    }

    get(key: TKey): TValue {
        return this._keyMap[key];
    }

    has(key: TKey): boolean {
        return key in this._keyMap;
    }

    get size() {
        return this._size;
    }

    keys(): { next: () => TKey } {
        let index = 0;
        let keys = Object.keys(this._keyMap) as TKey[];
        return {
            next: function () {
                return keys[index++];
            }
        }
    }

    values(): { next: () => TValue } {
        let index = 0;
        let map = this._keyMap;
        let keys = Object.keys(this._keyMap);
        return {
            next: function () {
                return map[keys[index++]];
            }
        }
    }

    forEach(callback: (value: TValue) => void) {
        for (let i in this._keyMap) {
            callback(this._keyMap[i]);
        }
    }

}