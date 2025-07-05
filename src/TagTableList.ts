import { TableList } from "./TableList"

export class TagTableList<T extends string|number>{
    tags:{[key:string|number]:TableList<T,Object>} = {}
    add(tag:T,key:T,value:Object){
        if(this.tags[tag] == null){
            this.tags[tag] = new TableList()
        }
        this.tags[tag].add(key,value)
    }

    remove(tag:T,key:T){
        if(this.tags[tag] != null){
            this.tags[tag].remove(key)
        }
    }

    removeByKey(key:T){
        for(let i in this.tags){
            this.tags[i].remove(key)
        }
    }

    get(tag:T,key:T){
        if(this.tags[tag]==null){
            return this.tags[tag].get(key)
        }
    }

    getTagValues(tag:T){
        return this.tags[tag].values()
    }

    getKeyValues(key:T){
        let list = [];
        for(let i in this.tags){
            let com = this.get(key,i as any)
            if(com!=null){
                list.push(com)
            }
        }
        return list
    }
} 