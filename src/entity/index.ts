import { Context } from "../cs";

export class World{
    context:Context
    
    constructor(){

    }

    addUnit(unit:Unit){
        this.context.addComponent(0, unit.id,unit)
    }

    removeUnit(unit:Unit){
        
    }

    getUnit(id:number){
        return this.context.getComponent(0,id)
    }

}


export class Unit{
    id:number
}