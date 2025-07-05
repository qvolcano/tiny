class SingletonMap {
    constructor(factory) {
        this.maps = {};
        this.factory = factory || function (type) { return new type; };
    }
    register(type) {
        this.maps[type.toString()] = { instance: undefined, type: type };
    }
    add(key, instance) {
        this.maps[key] = { instance: instance, type: null };
    }
    get(type) {
        let info = this.maps[type.toString()];
        if (info) {
            if (info.instance) {
                return info.instance;
            }
            else {
                if (info.type) {
                    info.instance = this.factory(info.type);
                    return info.instance;
                }
            }
        }
    }
}

export { SingletonMap };
