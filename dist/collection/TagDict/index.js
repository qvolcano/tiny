import { Dict } from '../Dict/index.js';

class TagDict {
    constructor() {
        this.tags = {};
    }
    add(tag, key, value) {
        if (this.tags[tag] == null) {
            this.tags[tag] = new Dict();
        }
        this.tags[tag].add(key, value);
    }
    remove(tag, key) {
        if (this.tags[tag] != null) {
            this.tags[tag].remove(key);
        }
    }
    removeByKey(key) {
        for (let i in this.tags) {
            this.tags[i].remove(key);
        }
    }
    get(tag, key) {
        if (this.tags[tag] == null) {
            return this.tags[tag].get(key);
        }
    }
    getTagValues(tag) {
        return this.tags[tag].values();
    }
    getKeyValues(key) {
        let list = [];
        for (let i in this.tags) {
            let com = this.get(key, i);
            if (com != null) {
                list.push(com);
            }
        }
        return list;
    }
}

export { TagDict };
