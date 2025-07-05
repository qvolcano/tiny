import { TableList } from "../collection"

export class Context{
    tags:{[key:number]:TableList<number,Object>} = {}
    addComponent(entity:number,type:number,component:Object){
        if(this.tags[type] == null){
            this.tags[type] = new TableList()
        }
        this.tags[type].add(entity,component)
    }

    removeComponent(entity:number,type:number){
        if(this.tags[type] != null){
            this.tags[type].remove(entity)
        }
    }

    getComponent(entity:number,type:number){
        if(this.tags[type]==null){
            return this.tags[type].get(entity)
        }
    }

    getComponents(type:number){
        return this.tags[type].values()
    }

    getComponentsByEntity(entity:number){
        let list = [];
        for(let i in this.tags){
            let com = this.getComponent(entity,Number(i))
            if(com!=null){
                list.push(com)
            }
        }
        return list
    }
}