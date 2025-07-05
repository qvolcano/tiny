export interface ISheet<TRow>{
    get(index: number): TRow
    find<TKey extends keyof TRow>(keyName: TKey, keyValue: TRow[TKey]): TRow 
    findAll<TKey extends keyof TRow>(keyName: TKey, keyValue: TRow[TKey]): ReadonlyArray<TRow>
    get lengeh():number
}