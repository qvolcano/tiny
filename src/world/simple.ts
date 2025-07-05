import { TableList } from "../collection";

export class Context{
    indexermap:TableList<string,Indexer>=new TableList();
    systemmap:TableList<string,System>=new TableList();
    addUnit(unit:number){
        for(let i of this.indexermap.values()){
            i.addUnit(unit)
        }
    }

    removeUnit(unit:number){
        for(let i of this.indexermap.values()){
            i.addUnit(unit)
        }
    }

    updateUnit(unit:number){
        for(let i of this.indexermap.values()){
            i.updateUnit(unit)
        }
    }

    addSystem(key:string,system:System){
        this.systemmap.add(key,system)
    }

    addIndexer(key:string , indexer:Indexer){
        this.indexermap.add(key,indexer)
    }

    getIndexer(key:string):Indexer|undefined{
        return this.indexermap.get(key)
    }

    update(){
        for(let i of this.systemmap.values()){
            i.update()
        }
    }
}

export interface Indexer{
    addUnit(unit:number):void
    removeUnit(unit:number):void
    updateUnit(unit:number):void
}

export interface System{
    update():void
}