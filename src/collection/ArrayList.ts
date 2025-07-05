class ArrayList<T>{
    private _source: T[];
    constructor(source: T[] = []) {
        this._source = source;
    }
    public get(index: number): T {
        return this._source[index];
    }

    public find<TName extends keyof T>(key: TName, condition: T[TName]): T|undefined {
        for (let item of this._source) {
            if (item[key] == condition) {
                return item;
            }
        }
    }

    public forEach(callback: (args:T) => void) {
        this._source.forEach(callback);
    }
}