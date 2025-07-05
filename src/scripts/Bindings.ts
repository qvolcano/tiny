export interface Bindings{
    containsKey(key:any):void
    get(key:any):void
    put( name:string, value:any):void
    putAll( toMerge:{[key:string]:{name:string, value:any}}):void
    remove(key:any):void
}