import { SingletonMap, TableList } from "../collection";
import { Type } from "../lobby/system";

export class World<T> {
    indexerMap:SingletonMap<Indexer<T>> = new SingletonMap()
    indexerList:TableList<string,Indexer<T>> = new TableList();
    systems:Map<string,System> = new Map();
    addUnit(unit:T):T{
        for(let i of this.indexerList.values()){
            i.addUnit(i);
        }
        return unit;
    }

    removeUnit(unit:T):T{
        for(let i of this.indexerList.values()){
            i.removeUnit(i);
        }
        return unit;
    }


    updateUnit(unit:T):void{
        for(let i of this.indexerList.values()){
            i.updateUnit(i);
        }
    }

    
    addIndexer<K extends Indexer<T>>(type:Type<K>):void{
        this.indexerList.add(type.name,new type);
    }

    getIndexer<K extends Indexer<T>>(type:Type<K>):K|undefined{
        return this.indexerMap.get(type) as K
    }

    addSystem(key:string, system:System){
        this.systems.set(key,system);
        system.context = this;
    }


}

export interface IUnit{

}

export interface Indexer<T> {
    addUnit(unit:any):T
    updateUnit(unit:any):void
    removeUnit(unit:any):T
    getUnit(key:any):T|undefined
    getUnits(key:any):T[]|undefined
}

export class ComponentIndexer implements Indexer<Object>{
    addUnit(unit: any): Object {
        throw new Error("Method not implemented.");
    }
    removeUnit(unit: any): Object {
        throw new Error("Method not implemented.");
    }
    getUnit(key: any): Object | undefined {
        throw new Error("Method not implemented.");
    }
    getUnits(key: any): Object[] | undefined {
        throw new Error("Method not implemented.");
    }

    updateUnit(unit:any):void{
        let component
    }

}

export interface System {
    context?:World<any>;
}