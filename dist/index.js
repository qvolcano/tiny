let TableList$1 = class TableList {
    constructor() {
        this._index = {};
        this._keys = [];
        this._values = [];
    }
    add(key, value) {
        this._index[key] = this._values.length;
        this._values.push(value);
        this._keys.push(key);
        return value;
    }
    remove(key) {
        let index = this._index[key];
        if (index != null) {
            let last = this._values.length - 1;
            let value = this._values[index];
            if (index < last) {
                this._values[index] = this._values[last];
                this._keys[index] = this._keys[last];
                this._index[this._keys[index]] = index;
            }
            this._values.length = last;
            this._keys.length = last;
            delete this._index[key];
            return value;
        }
    }
    get(key) {
        if (this._index[key] != null) {
            return this._values[this._index[key]];
        }
    }
    values() {
        return this._values;
    }
    keys() {
        return this._keys;
    }
};

class TagTableList {
    constructor() {
        this.tags = {};
    }
    add(tag, key, value) {
        if (this.tags[tag] == null) {
            this.tags[tag] = new TableList$1();
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

class BroadcastNode {
    constructor() {
        this.version = "";
    }
}

class ValueBroadcastNode {
    constructor() {
        this._nodeList = [];
        this._enabled = true;
        this._value = 0;
    }
    connnect(node) {
        if (this._nodeList.indexOf(node) == -1) {
            this._nodeList.push(node);
        }
    }
    disconnect(node) {
        let index = this._nodeList.indexOf(node);
        if (index != -1) {
            this._nodeList.splice(index, 1);
        }
    }
    broadcast(event) {
        this._onChange && this._onChange();
        for (let i of this._nodeList) {
            i.receive(event);
        }
    }
    receive(event) {
        let actived = 0;
        for (let i of this._nodeList) {
            if (i._enabled && i._value > 0) {
                actived += i._value;
            }
        }
        this.value = actived;
        this.broadcast(event);
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        this._enabled = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
}

/***auto-create-index***/

var index$o = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BroadcastNode: BroadcastNode,
    ValueBroadcastNode: ValueBroadcastNode
});

class Dict {
    constructor() {
        this._index = {};
        this._keys = [];
        this._values = [];
    }
    add(key, value) {
        this._index[key] = this._values.length;
        this._values.push(value);
        this._keys.push(key);
        return value;
    }
    remove(key) {
        let index = this._index[key];
        if (index != null) {
            let last = this._values.length - 1;
            let value = this._values[index];
            if (index < last) {
                this._values[index] = this._values[last];
                this._keys[index] = this._keys[last];
                this._index[this._keys[index]] = index;
            }
            this._values.length = last;
            this._keys.length = last;
            delete this._index[key];
            return value;
        }
    }
    get(key) {
        if (this._index[key] != null) {
            return this._values[this._index[key]];
        }
    }
    values() {
        return this._values;
    }
    keys() {
        return this._keys;
    }
}

class HashList {
    constructor(key = "hashCode") {
        this.key = key;
        this._values = [];
        this._keys = {};
    }
    add(value) {
        this._keys[value[this.key]] = this._values.push(value) - 1;
        return value;
    }
    get(key) {
        return this._values[this._keys[key]];
    }
    remove(key) {
        let index = this._keys[key];
        if (index >= 0) {
            let value = this._values[index];
            let len = this._values.length;
            if (index == len - 1) {
                this._values.length--;
            }
            else if (len > 1) {
                this._values[index] = this._values[len - 1];
                this._values.length = len - 1;
                this._keys[this._values[index][this.key]] = index;
            }
            else {
                this._values.length = 0;
            }
            delete this._keys[key];
            return value;
        }
    }
    clear() {
        this._values.length = 0;
        this._keys = {};
    }
    pop() {
        return this.remove(this._values[this._values.length - 1][this.key]);
    }
    values() {
        return this._values;
    }
    keys() {
        return Object.keys(this._keys);
    }
    get length() {
        return this._values.length;
    }
}

class LinkNode {
    constructor(value) {
        this.value = value;
    }
}

let Map$1 = class Map {
    constructor() {
        this._keyMap = {};
        this._size = 0;
    }
    set(key, value) {
        if (value) {
            if (this._keyMap[key] == null && value != null) {
                this._size++;
            }
            this._keyMap[key] = value;
        }
        else {
            this.delete(key);
        }
    }
    delete(key) {
        let value = this._keyMap[key];
        if (value) {
            delete this._keyMap[key];
            this._size--;
        }
        return value;
    }
    clear() {
        this._keyMap = {};
        this._size = 0;
    }
    get(key) {
        return this._keyMap[key];
    }
    has(key) {
        return key in this._keyMap;
    }
    get size() {
        return this._size;
    }
    keys() {
        let index = 0;
        let keys = Object.keys(this._keyMap);
        return {
            next: function () {
                return keys[index++];
            }
        };
    }
    values() {
        let index = 0;
        let map = this._keyMap;
        let keys = Object.keys(this._keyMap);
        return {
            next: function () {
                return map[keys[index++]];
            }
        };
    }
    forEach(callback) {
        for (let i in this._keyMap) {
            callback(this._keyMap[i]);
        }
    }
};

class Registry {
    constructor(onAdded, onRemoved) {
        this.onAdded = onAdded;
        this.onRemoved = onRemoved;
        this.values = {};
    }
    add(name, value) {
        this.remove(name);
        this.values[name] = value;
        this.onAdded && this.onAdded(this);
    }
    remove(name) {
        let old = this.values[name];
        if (old) {
            delete this.values[name];
            this.onRemoved && this.onRemoved(this);
        }
    }
    get(name) {
        return this.values[name];
    }
}

class SingletonFactory {
    constructor(autoCreate = false, autoRegister = false, creator) {
        this.autoCreate = autoCreate;
        this.autoRegister = autoRegister;
        this.creator = creator;
        this.table = {};
    }
    register(def) {
        if (def) {
            let key = def["name"];
            if (key) {
                this.table[key] = {
                    instance: null,
                    constructor: def,
                };
                if (this.autoCreate) {
                    this.get(def);
                }
            }
        }
    }
    get(def) {
        if (def) {
            let key = def.name;
            if (key) {
                let item = this.table[key];
                if (item) {
                    if (item.instance) {
                        return item.instance;
                    }
                    else {
                        let creator = this.creator || SingletonFactory.DEFAULT_CREATOR;
                        return item.instance = creator(item.constructor);
                    }
                }
                else {
                    if (this.autoRegister) {
                        this.register(def);
                        return this.get(def);
                    }
                }
            }
        }
    }
    forEach(callback) {
        for (let key in this.table) {
            let instance = this.get(this.table[key].constructor);
            instance && callback(instance);
        }
    }
    static DEFAULT_CREATOR(def) {
        return new def();
    }
}

class TableList {
    constructor() {
        this._index = {};
        this._keys = [];
        this._values = [];
    }
    add(key, value) {
        this._index[key] = this._values.length;
        this._values.push(value);
        this._keys.push(key);
        return value;
    }
    remove(key) {
        let index = this._index[key];
        if (index != null) {
            let last = this._values.length - 1;
            let value = this._values[index];
            if (index < last) {
                this._values[index] = this._values[last];
                this._keys[index] = this._keys[last];
                this._index[this._keys[index]] = index;
            }
            this._values.length = last;
            this._keys.length = last;
            delete this._index[key];
            return value;
        }
    }
    get(key) {
        if (this._index[key] != null) {
            return this._values[this._index[key]];
        }
    }
    values() {
        return this._values;
    }
    keys() {
        return this._keys;
    }
}

class SingletonList {
    constructor(factory) {
        this.items = new TableList();
        this.factory = factory || function (type) { return new type; };
    }
    add(type) {
        this.items.add(type.toString(), new type());
    }
    get(type) {
        return this.items.get(type.toString());
    }
    values() {
        return this.items.values();
    }
}

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

class SyncDict {
}

let Table$1 = class Table {
    // constructor(name: TValue, value: TValue[]| ({ [key: TValue]: TValue }))
    // constructor(table: { name: TValue, value: (TValue[]) | ({ [key: TValue]: TValue }) })
    constructor(...args) {
        if (args.length == 1) {
            this.name = args[0].name;
            this.value = args[0].name;
        }
        else {
            this.name = args[0];
            this.value = args[1];
        }
    }
    get(id) {
        if (this.value instanceof Array) ;
        else {
            return this.value[id];
        }
    }
    forEach(fn) {
        for (let i in this.value) {
            fn(this.value[i]);
        }
    }
    add(key, value) {
        throw new Error("Method not implemented.");
    }
    remove(key) {
        throw new Error("Method not implemented.");
    }
};

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

/***auto-create-index***/

var index$n = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Dict: Dict,
    HashList: HashList,
    LinkNode: LinkNode,
    Map: Map$1,
    Registry: Registry,
    SingletonFactory: SingletonFactory,
    SingletonList: SingletonList,
    SingletonMap: SingletonMap,
    SyncDict: SyncDict,
    Table: Table$1,
    TableList: TableList,
    TagDict: TagDict
});

let Context$1 = class Context {
    constructor() {
        this.tags = {};
    }
    addComponent(entity, type, component) {
        if (this.tags[type] == null) {
            this.tags[type] = new TableList();
        }
        return this.tags[type].add(entity, component);
    }
    removeComponent(entity, type) {
        if (this.tags[type] != null) {
            return this.tags[type].remove(entity);
        }
        return undefined;
    }
    getComponent(entity, type) {
        if (this.tags[type] != null) {
            return this.tags[type].get(entity);
        }
    }
    getComponents(type) {
        if (this.tags[type] != null) {
            return this.tags[type].values();
        }
        return [];
    }
    getComponentsByEntity(entity) {
        let list = [];
        for (let i in this.tags) {
            let com = this.getComponent(entity, Number(i));
            if (com != null) {
                list.push(com);
            }
        }
        return list;
    }
};

/***auto-create-index***/

var index$m = /*#__PURE__*/Object.freeze({
    __proto__: null
});

class Context {
    constructor() {
        this.tags = {};
    }
    addComponent(entity, type, component) {
        if (this.tags[type] == null) {
            this.tags[type] = new TableList();
        }
        this.tags[type].add(entity, component);
    }
    removeComponent(entity, type) {
        if (this.tags[type] != null) {
            this.tags[type].remove(entity);
        }
    }
    getComponent(entity, type) {
        if (this.tags[type] == null) {
            return this.tags[type].get(entity);
        }
    }
    getComponents(type) {
        return this.tags[type].values();
    }
    getComponentsByEntity(entity) {
        let list = [];
        for (let i in this.tags) {
            let com = this.getComponent(entity, Number(i));
            if (com != null) {
                list.push(com);
            }
        }
        return list;
    }
}

/***auto-create-index***/

var index$l = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Context: Context
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class EventHandler {
    constructor() {
        this.listeners = [];
        this.emmiting = false;
    }
    on(listener, caller) {
        this.off(listener, caller);
        if (this.emmiting) {
            this.listeners = this.listeners.concat();
        }
        this.listeners.push(listener, caller, false);
    }
    once(listener, caller) {
        this.off(listener, caller);
        if (this.emmiting) {
            this.listeners = this.listeners.concat();
        }
        this.listeners.push(listener, caller, true);
    }
    off(listener, caller) {
        let index = this.get(listener, caller);
        if (index != -1) {
            this.listeners.splice(index, 1);
            return true;
        }
        return false;
    }
    has(listener, caller) {
        return this.get(listener, caller) != -1;
    }
    get(listener, caller) {
        let start_index = 0;
        while (start_index = this.listeners.indexOf(listener, start_index), start_index != -1) {
            if (start_index != -1 && this.listeners[start_index + 3] == caller) {
                this.listeners.splice(start_index, 1);
                return start_index;
            }
        }
        return -1;
    }
    emmit(event) {
        let listeners = this.listeners;
        let len = listeners.length;
        for (let i = 0; i < len; i += 3) {
            listeners[i](listeners[i + 1]);
            if (listeners[i + 3]) {
                this.off(listeners[i], listeners[i + 1]);
            }
        }
    }
}

/**
 * 资源状态
 */
var ResourceState;
(function (ResourceState) {
    /** 未加载 */
    ResourceState[ResourceState["UNLOADED"] = 0] = "UNLOADED";
    /** 加载中 */
    ResourceState[ResourceState["LOADING"] = 1] = "LOADING";
    /** 已加载 */
    ResourceState[ResourceState["LOADED"] = 2] = "LOADED";
    /** 加载失败 */
    ResourceState[ResourceState["ERROR"] = 3] = "ERROR";
})(ResourceState || (ResourceState = {}));
/**
 * 资源管理器
 * 轻量级的资源管理中间层，负责资源的生命周期管理和基础事件通知
 */
class ResourceManager {
    constructor() {
        this.resources = new Map();
        this.loaders = new Map();
        // 事件处理器
        this.onResourceLoaded = new EventHandler();
        this.onResourceError = new EventHandler();
    }
    /**
     * 注册资源加载器
     * @param loader 资源加载器
     */
    registerLoader(loader) {
        this.loaders.set(loader.getResourceType(), loader);
    }
    /**
     * 加载资源
     * @param url 资源URL
     * @param type 资源类型
     */
    load(url, type) {
        return __awaiter(this, void 0, void 0, function* () {
            // 检查资源是否已存在
            let resourceInfo = this.resources.get(url);
            if (resourceInfo) {
                if (resourceInfo.state === ResourceState.LOADED) {
                    resourceInfo.refCount++;
                    return resourceInfo.data;
                }
                else if (resourceInfo.state === ResourceState.ERROR) {
                    throw resourceInfo.error;
                }
            }
            // 获取对应的加载器
            const loader = this.loaders.get(type);
            if (!loader) {
                throw new Error(`未找到类型为 ${type} 的资源加载器`);
            }
            // 创建资源信息
            resourceInfo = {
                url,
                type,
                state: ResourceState.LOADING,
                refCount: 1
            };
            this.resources.set(url, resourceInfo);
            try {
                // 加载资源
                const resource = yield loader.load(url);
                resourceInfo.state = ResourceState.LOADED;
                resourceInfo.data = resource;
                // 触发加载完成事件
                this.onResourceLoaded.emmit({ url, resource });
                return resource;
            }
            catch (error) {
                resourceInfo.state = ResourceState.ERROR;
                resourceInfo.error = error;
                // 触发错误事件
                this.onResourceError.emmit({ url, error });
                throw error;
            }
        });
    }
    /**
     * 释放资源
     * @param url 资源URL
     */
    release(url) {
        const resourceInfo = this.resources.get(url);
        if (!resourceInfo || resourceInfo.state !== ResourceState.LOADED) {
            return;
        }
        resourceInfo.refCount--;
        if (resourceInfo.refCount <= 0) {
            // 调用加载器的释放方法
            const loader = this.loaders.get(resourceInfo.type);
            if (loader && loader.release) {
                loader.release(resourceInfo.data);
            }
            this.resources.delete(url);
        }
    }
    /**
     * 预加载资源
     * @param urls 资源URL数组
     * @param type 资源类型
     */
    preload(urls, type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(urls.map(url => this.load(url, type)));
        });
    }
    /**
     * 获取已加载的资源
     * @param url 资源URL
     */
    get(url) {
        const resourceInfo = this.resources.get(url);
        return resourceInfo && resourceInfo.state === ResourceState.LOADED ? resourceInfo.data : undefined;
    }
    /**
     * 检查资源是否已加载
     * @param url 资源URL
     */
    isLoaded(url) {
        const resourceInfo = this.resources.get(url);
        return (resourceInfo === null || resourceInfo === void 0 ? void 0 : resourceInfo.state) === ResourceState.LOADED;
    }
    /**
     * 清理所有资源
     */
    clear() {
        for (const [url] of this.resources) {
            this.release(url);
        }
    }
}

/**
 * 基础命令管理器，只负责命令的注册和执行
 */
class CommandManager {
    constructor() {
        this.commands = new Map();
        this.onCommandRegistered = new EventHandler();
        this.onCommandExecuted = new EventHandler();
    }
    registerCommand(command) {
        if (this.commands.has(command.id)) {
            return false;
        }
        this.commands.set(command.id, command);
        this.onCommandRegistered.emmit(command);
        return true;
    }
    unregisterCommand(id) {
        if (!this.commands.has(id)) {
            return false;
        }
        this.commands.delete(id);
        return true;
    }
    getCommand(id) {
        return this.commands.get(id);
    }
    executeCommand(id, ...args) {
        const command = this.commands.get(id);
        if (!command || !command.canExecute()) {
            return false;
        }
        try {
            const result = command.execute(...args);
            if (result) {
                this.onCommandExecuted.emmit(command);
            }
            return result;
        }
        catch (error) {
            console.error(`执行命令 ${id} 时发生错误:`, error);
            return false;
        }
    }
    executeWithResult(id, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.commands.get(id);
            if (!command || !command.canExecute()) {
                return { success: false };
            }
            try {
                const result = command.execute(...args);
                if (result) {
                    this.onCommandExecuted.emmit(command);
                }
                return { success: result };
            }
            catch (error) {
                console.error(`执行命令 ${id} 时发生错误:`, error);
                return { success: false, error };
            }
        });
    }
}

/**
 * Manager for handling editor services
 */
class ServiceManager {
    constructor() {
        this.services = new Map();
        /**
         * Event fired when a service is registered
         */
        this.onServiceRegistered = new EventHandler();
        /**
         * Event fired when a service is started
         */
        this.onServiceStarted = new EventHandler();
        /**
         * Event fired when a service is stopped
         */
        this.onServiceStopped = new EventHandler();
    }
    /**
     * Register a service
     */
    registerService(service) {
        if (this.services.has(service.id)) {
            return false;
        }
        this.services.set(service.id, service);
        this.onServiceRegistered.emmit(service);
        return true;
    }
    /**
     * Unregister a service
     */
    unregisterService(id) {
        if (!this.services.has(id)) {
            return false;
        }
        const service = this.services.get(id);
        if (service.isRunning()) {
            service.dispose();
            this.onServiceStopped.emmit(service);
        }
        this.services.delete(id);
        return true;
    }
    /**
     * Get a service by id
     */
    getService(id) {
        return this.services.get(id);
    }
    /**
     * Start a service
     */
    startService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = this.services.get(id);
            if (!service || service.isRunning()) {
                return false;
            }
            const result = yield service.init();
            if (result) {
                this.onServiceStarted.emmit(service);
            }
            return result;
        });
    }
    /**
     * Stop a service
     */
    stopService(id) {
        const service = this.services.get(id);
        if (!service || !service.isRunning()) {
            return false;
        }
        service.dispose();
        this.onServiceStopped.emmit(service);
        return true;
    }
    /**
     * Start all services
     */
    startAllServices() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const service of this.services.values()) {
                if (!service.isRunning()) {
                    const result = yield service.init();
                    if (result) {
                        this.onServiceStarted.emmit(service);
                    }
                }
            }
        });
    }
    /**
     * Stop all services
     */
    stopAllServices() {
        for (const service of this.services.values()) {
            if (service.isRunning()) {
                service.dispose();
                this.onServiceStopped.emmit(service);
            }
        }
    }
}

/**
 * Manager for handling editor events
 */
class EventManager {
    constructor() {
        this.eventHandlers = new Map();
    }
    /**
     * Register an event listener
     */
    on(eventType, listener, caller) {
        let handler = this.getOrCreateHandler(eventType);
        handler.on(listener, caller);
    }
    /**
     * Register a one-time event listener
     */
    once(eventType, listener, caller) {
        let handler = this.getOrCreateHandler(eventType);
        handler.once(listener, caller);
    }
    /**
     * Remove an event listener
     */
    off(eventType, listener, caller) {
        const handler = this.eventHandlers.get(eventType);
        if (!handler) {
            return false;
        }
        return handler.off(listener, caller);
    }
    /**
     * Check if an event listener exists
     */
    hasListener(eventType, listener, caller) {
        const handler = this.eventHandlers.get(eventType);
        if (!handler) {
            return false;
        }
        return handler.has(listener, caller);
    }
    /**
     * Emit an event
     */
    emit(event) {
        const handler = this.eventHandlers.get(event.type);
        if (!handler) {
            return true; // No listeners, event not handled
        }
        handler.emmit(event);
        return !event.canceled;
    }
    /**
     * Clear all event listeners
     */
    clearListeners(eventType) {
        if (eventType) {
            this.eventHandlers.delete(eventType);
        }
        else {
            this.eventHandlers.clear();
        }
    }
    /**
     * Get or create an event handler for a specific event type
     */
    getOrCreateHandler(eventType) {
        let handler = this.eventHandlers.get(eventType);
        if (!handler) {
            handler = new EventHandler();
            this.eventHandlers.set(eventType, handler);
        }
        return handler;
    }
}

/**
 * Manager for handling editor documents
 */
class DocumentManager {
    constructor() {
        this.documents = new Map();
        this.activeDocument = null;
        /**
         * Event fired when a document is opened
         */
        this.onDocumentOpened = new EventHandler();
        /**
         * Event fired when a document is closed
         */
        this.onDocumentClosed = new EventHandler();
        /**
         * Event fired when a document is saved
         */
        this.onDocumentSaved = new EventHandler();
        /**
         * Event fired when the active document changes
         */
        this.onActiveDocumentChanged = new EventHandler();
    }
    /**
     * Get a document by id
     */
    getDocument(id) {
        return this.documents.get(id);
    }
    /**
     * Get all documents
     */
    getAllDocuments() {
        return Array.from(this.documents.values());
    }
    /**
     * Get the active document
     */
    getActiveDocument() {
        return this.activeDocument;
    }
    /**
     * Set the active document
     */
    setActiveDocument(id) {
        if (id === null) {
            this.activeDocument;
            this.activeDocument = null;
            this.onActiveDocumentChanged.emmit(null);
            return true;
        }
        const document = this.documents.get(id);
        if (!document) {
            return false;
        }
        if (this.activeDocument !== document) {
            this.activeDocument = document;
            this.onActiveDocumentChanged.emmit(document);
        }
        return true;
    }
    /**
     * Create and open a document for a resource
     */
    createDocument(resource, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            // This is a simplified implementation
            // In a real implementation, you would create the appropriate document type based on the resource
            const document = {
                id: `doc-${resource.id}`,
                resource,
                editor,
                open: () => __awaiter(this, void 0, void 0, function* () {
                    yield resource.load();
                    editor.setContent(resource);
                    return true;
                }),
                close: () => {
                    editor.dispose();
                },
                save: () => __awaiter(this, void 0, void 0, function* () {
                    // In a real implementation, you would save the content back to the resource
                    return true;
                }),
                isDirty: () => editor.isDirty()
            };
            this.documents.set(document.id, document);
            const result = yield document.open();
            if (result) {
                this.onDocumentOpened.emmit(document);
                this.setActiveDocument(document.id);
            }
            return result ? document : null;
        });
    }
    /**
     * Close a document
     */
    closeDocument(id) {
        const document = this.documents.get(id);
        if (!document) {
            return false;
        }
        document.close();
        this.documents.delete(id);
        if (this.activeDocument === document) {
            this.activeDocument = null;
            this.onActiveDocumentChanged.emmit(null);
        }
        this.onDocumentClosed.emmit(document);
        return true;
    }
    /**
     * Save a document
     */
    saveDocument(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = this.documents.get(id);
            if (!document) {
                return false;
            }
            const result = yield document.save();
            if (result) {
                this.onDocumentSaved.emmit(document);
            }
            return result;
        });
    }
    /**
     * Close all documents
     */
    closeAllDocuments() {
        for (const document of this.documents.values()) {
            document.close();
            this.onDocumentClosed.emmit(document);
        }
        this.documents.clear();
        this.activeDocument = null;
        this.onActiveDocumentChanged.emmit(null);
    }
}

/**
 * Manager for handling editor triggers
 */
class TriggerManager {
    constructor() {
        this.triggers = new Map();
        this.triggersByType = new Map();
        /**
         * Event fired when a trigger is registered
         */
        this.onTriggerRegistered = new EventHandler();
        /**
         * Event fired when a trigger is unregistered
         */
        this.onTriggerUnregistered = new EventHandler();
        /**
         * Event fired when a trigger is executed
         */
        this.onTriggerExecuted = new EventHandler();
    }
    /**
     * Register a trigger
     */
    registerTrigger(trigger) {
        if (this.triggers.has(trigger.id)) {
            return false;
        }
        this.triggers.set(trigger.id, trigger);
        // Add to type map
        let typeList = this.triggersByType.get(trigger.type);
        if (!typeList) {
            typeList = [];
            this.triggersByType.set(trigger.type, typeList);
        }
        // Insert based on priority
        const priority = trigger.priority || 0;
        let inserted = false;
        for (let i = 0; i < typeList.length; i++) {
            const existingPriority = typeList[i].priority || 0;
            if (priority > existingPriority) {
                typeList.splice(i, 0, trigger);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            typeList.push(trigger);
        }
        this.onTriggerRegistered.emmit(trigger);
        return true;
    }
    /**
     * Unregister a trigger
     */
    unregisterTrigger(id) {
        const trigger = this.triggers.get(id);
        if (!trigger) {
            return false;
        }
        this.triggers.delete(id);
        // Remove from type map
        const typeList = this.triggersByType.get(trigger.type);
        if (typeList) {
            const index = typeList.findIndex(t => t.id === id);
            if (index !== -1) {
                typeList.splice(index, 1);
            }
            if (typeList.length === 0) {
                this.triggersByType.delete(trigger.type);
            }
        }
        this.onTriggerUnregistered.emmit(trigger);
        return true;
    }
    /**
     * Get a trigger by id
     */
    getTrigger(id) {
        return this.triggers.get(id);
    }
    /**
     * Get triggers by type
     */
    getTriggersByType(type) {
        return this.triggersByType.get(type) || [];
    }
    /**
     * Enable a trigger
     */
    enableTrigger(id) {
        const trigger = this.triggers.get(id);
        if (!trigger) {
            return false;
        }
        trigger.enabled = true;
        return true;
    }
    /**
     * Disable a trigger
     */
    disableTrigger(id) {
        const trigger = this.triggers.get(id);
        if (!trigger) {
            return false;
        }
        trigger.enabled = false;
        return true;
    }
    /**
     * Execute triggers of a specific type with the given context
     */
    executeTriggers(type, context) {
        const triggers = this.triggersByType.get(type);
        if (!triggers) {
            return;
        }
        for (const trigger of triggers) {
            if (trigger.enabled && trigger.condition(context)) {
                trigger.action(context);
                this.onTriggerExecuted.emmit(trigger);
            }
        }
    }
    /**
     * Clear all triggers
     */
    clearTriggers() {
        this.triggers.clear();
        this.triggersByType.clear();
    }
}

/**
 * Manager for handling editor plugins
 */
class PluginManager {
    constructor() {
        this.plugins = new Map();
        /**
         * Event fired when a plugin is registered
         */
        this.onPluginRegistered = new EventHandler();
        /**
         * Event fired when a plugin is unregistered
         */
        this.onPluginUnregistered = new EventHandler();
        /**
         * Event fired when a plugin is enabled
         */
        this.onPluginEnabled = new EventHandler();
        /**
         * Event fired when a plugin is disabled
         */
        this.onPluginDisabled = new EventHandler();
    }
    /**
     * Register a plugin
     */
    registerPlugin(plugin) {
        if (this.plugins.has(plugin.id)) {
            return false;
        }
        this.plugins.set(plugin.id, plugin);
        this.onPluginRegistered.emmit(plugin);
        return true;
    }
    /**
     * Unregister a plugin
     */
    unregisterPlugin(id) {
        const plugin = this.plugins.get(id);
        if (!plugin) {
            return false;
        }
        if (plugin.isEnabled()) {
            plugin.disable();
            this.onPluginDisabled.emmit(plugin);
        }
        plugin.dispose();
        this.plugins.delete(id);
        this.onPluginUnregistered.emmit(plugin);
        return true;
    }
    /**
     * Get a plugin by id
     */
    getPlugin(id) {
        return this.plugins.get(id);
    }
    /**
     * Get all plugins
     */
    getAllPlugins() {
        return Array.from(this.plugins.values());
    }
    /**
     * Enable a plugin
     */
    enablePlugin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const plugin = this.plugins.get(id);
            if (!plugin || plugin.isEnabled()) {
                return false;
            }
            const result = yield plugin.enable();
            if (result) {
                this.onPluginEnabled.emmit(plugin);
            }
            return result;
        });
    }
    /**
     * Disable a plugin
     */
    disablePlugin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const plugin = this.plugins.get(id);
            if (!plugin || !plugin.isEnabled()) {
                return false;
            }
            const result = yield plugin.disable();
            if (result) {
                this.onPluginDisabled.emmit(plugin);
            }
            return result;
        });
    }
    /**
     * Initialize all plugins
     */
    initializePlugins() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const plugin of this.plugins.values()) {
                yield plugin.init();
            }
        });
    }
    /**
     * Dispose all plugins
     */
    disposePlugins() {
        for (const plugin of this.plugins.values()) {
            if (plugin.isEnabled()) {
                plugin.disable();
                this.onPluginDisabled.emmit(plugin);
            }
            plugin.dispose();
        }
    }
}

/**
 * Editor module for handling editing functionality
 */
class ViewService {
    constructor() {
        this.id = 'view';
        this.name = 'View Service';
        this.running = false;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.running = true;
            return true;
        });
    }
    dispose() {
        this.running = false;
    }
    isRunning() {
        return this.running;
    }
}
/**
 * Main Editor class that integrates all manager components
 */
class Editor {
    constructor() {
        // Initialize all managers
        this.resourceManager = new ResourceManager();
        this.commandManager = new CommandManager();
        this.serviceManager = new ServiceManager();
        this.eventManager = new EventManager();
        this.documentManager = new DocumentManager();
        this.triggerManager = new TriggerManager();
        this.pluginManager = new PluginManager();
    }
    /**
     * Initialize the editor
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Initialize services
            const viewService = new ViewService();
            this.serviceManager.registerService(viewService);
            yield this.serviceManager.startService(viewService.id);
            // Initialize plugins
            yield this.pluginManager.initializePlugins();
        });
    }
    /**
     * Dispose editor resources
     */
    dispose() {
        // Close all documents
        this.documentManager.closeAllDocuments();
        // Dispose plugins
        this.pluginManager.disposePlugins();
        // Stop all services
        this.serviceManager.stopAllServices();
    }
}

var index$k = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Editor: Editor,
    ViewService: ViewService
});

let World$1 = class World {
    constructor() {
    }
    addUnit(unit) {
        this.context.addComponent(0, unit.id, unit);
    }
    removeUnit(unit) {
    }
    getUnit(id) {
        return this.context.getComponent(0, id);
    }
};
class Unit {
}

class Action {
    constructor() {
        this.listeners = [];
    }
    add(fn) {
        this.listeners.push(fn);
    }
    call() {
        for (let i of this.listeners) {
            i();
        }
    }
}

class Broadcast {
    constructor() {
        this.listeners = [];
        this.broadcasting = false;
    }
    on(listener, thisObj) {
        if (this.broadcasting) {
            this.listeners = this.listeners.concat();
        }
        this.off(listener, thisObj);
        this.listeners.push(listener, thisObj, false);
    }
    once(listener, thisObj) {
        if (this.broadcasting) {
            this.listeners = this.listeners.concat();
        }
        this.off(listener, thisObj);
        this.listeners.push(listener, thisObj, true);
    }
    off(listener, thisObj) {
        if (this.broadcasting) {
            this.listeners = this.listeners.concat();
        }
        let length = this.listeners.length;
        for (let i = length - 1; i >= 0; i -= 2) {
            if (this.listeners[i - 2] == listener && this.listeners[i] == thisObj) {
                this.offAt(i - 2);
                return true;
            }
        }
    }
    broadcast(...data) {
        this.broadcasting = true;
        let listeners = this.listeners;
        let length = listeners.length;
        let removes = null;
        for (let i = 0; i < length; i += 3) {
            listeners[i].apply(listeners[i + 1], data);
            if (listeners[i + 2]) {
                //once
                if (removes == null) {
                    removes = [];
                }
                removes.push(i);
            }
        }
        if (removes) {
            for (let i = removes.length - 1; i >= 0; i--) {
                this.offAt(i);
            }
        }
        this.broadcasting = false;
    }
    offAt(index) {
        let length = this.listeners.length;
        if (index != length) {
            this.listeners[index] = this.listeners[length];
            this.listeners[index + 1] = this.listeners[length + 1];
            this.listeners[index + 2] = this.listeners[length + 2];
        }
        this.listeners.length -= 3;
    }
}

class Event {
    constructor() {
        this.type = "";
    }
    $setTarget(currentTarget) {
        this.$currentTarget = currentTarget;
    }
}

class EventDispatcher {
    constructor(target) {
        this.eventPool = [];
        this.listeners = {};
        this.notifyLevel = 0;
        this.$EventDispatcher = target;
    }
    dispatchEvent(event) {
        event.$currentTarget = this.$EventDispatcher;
        event.$setTarget(event.$currentTarget);
        return this.$notifyListener(event);
    }
    $notifyListener(event) {
        if (event && this.hasEventListener(event.type)) {
            this.notifyLevel++;
            event.target = this;
            let eventType = event.type;
            let list = this.listeners[eventType];
            if (list != null) {
                let once = [];
                for (let i = 0, l = list.length; i < l; i += 3) {
                    list[i].call(list[i + 1], event);
                    if (list[i + 3]) {
                        once.push(i);
                    }
                }
                if (once.length) {
                    for (let i = once.length - 1; i >= 0; i++) {
                        list.splice(i, 1);
                    }
                }
            }
            this.notifyLevel--;
            return true;
        }
        else {
            return false;
        }
    }
    insertListener(eventType, listener, thisObj, isOnce) {
        let list = this.listeners[eventType];
        if (list == null) {
            list = this.listeners[eventType] = [];
        }
        else {
            let index = 0;
            do {
                index = list.indexOf(listener, index);
                if (index != -1 && list[index + 1] === thisObj && list[index + 3] === isOnce) {
                    return;
                }
            } while (index == -1);
        }
        if (this.notifyLevel != 0) {
            this.listeners[eventType] = list = list.concat();
        }
        list.push(listener, thisObj, isOnce);
    }
    dispatchEventWith(eventType, data) {
        if (this.hasEventListener(eventType)) {
            let event = this.eventPool.pop() || new Event();
            event.type = eventType;
            event.data = data;
            let result = this.dispatchEvent(event);
            this.eventPool.push(event);
            return result;
        }
        else {
            return false;
        }
    }
    once(eventType, listener, thisObj) {
        this.insertListener(eventType, listener, thisObj, true);
    }
    addEventListener(eventType, listener, thisObj) {
        this.insertListener(eventType, listener, thisObj, false);
    }
    removeEventListener(eventType, listener, thisObj) {
        let list = this.listeners[eventType];
        if (list) {
            let index = list.length;
            do {
                index = list.lastIndexOf(listener, index);
                if (index != -1 && (thisObj == null || list[index + 1] === thisObj)) {
                    list.splice(index, 3);
                }
            } while (index == -1);
        }
        if (this.notifyLevel) {
            this.listeners[eventType] = list = list.concat();
        }
    }
    hasEventListener(eventType) {
        let list = this.listeners[eventType];
        if (list && list.length) {
            return true;
        }
        else {
            return false;
        }
    }
}

class EventEmitter {
    on(evt, listener) {
        return this;
    }
    once(evt, listener) {
        return this;
    }
    off(evt, listener) {
        return this;
    }
    emit(evt, ...args) {
        return false;
    }
}

/***auto-create-index***/

var index$j = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Action: Action,
    Broadcast: Broadcast,
    Event: Event,
    EventDispatcher: EventDispatcher,
    EventEmitter: EventEmitter,
    EventHandler: EventHandler
});

class Flow {
    constructor() {
        this.items = [];
    }
    add(item) {
    }
    remove(item) {
    }
    call(...args) {
        for (let i of this.items) {
            i(...args);
        }
    }
}

/***auto-create-index***/

var index$i = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Flow: Flow
});

class Lobby {
}
class Room {
}

var index$h = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Lobby: Lobby,
    Room: Room
});

class MapData {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

class MapModel {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.datas = [];
    }
    setup(width, height, datas) {
        this.datas = datas || [];
        this.width = width;
        this.height = height;
        let index = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                index++;
                this.datas[index] = datas ? datas[index] : new MapData();
            }
        }
    }
    getData(x, y) {
        return this.datas[x + y * this.height];
    }
    setData(x, y, data) {
        this.datas[x + y * this.height] = data;
    }
}

/***auto-create-index***/

var index$g = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MapData: MapData,
    MapModel: MapModel
});

class LargeUinit {
    compare(target) {
        let selfLen = this.values.length;
        let targetLen = target.values.length;
        if (selfLen > targetLen) {
            return 1;
        }
        else if (targetLen > selfLen) {
            return -1;
        }
        else {
            for (let i = this.values.length - 1; i >= 0; i++) {
                if (this.values[i] > target.values[i]) {
                    return 1;
                }
                else if (this.values[i] < target.values[i]) {
                    return -1;
                }
            }
        }
        return 0;
    }
    constructor() {
        this.values = [0];
        this.decimal = 10;
    }
    static create(value = 0) {
        let unit = new LargeUinit();
        unit.add(value);
        return unit;
    }
    static parseStr(str) {
        let value = new LargeUinit();
        for (let i = 0; i < str.length; i++) {
            value.values[i] = Number(str.charAt(i));
        }
        return value;
    }
    set(value, decimal = 0) {
        this.setUncheckValue(value, decimal);
    }
    add(value, decimal = 0) {
        this.setUncheckValue((this.values[decimal] || 0) + value, decimal);
    }
    addLarge(value) {
        let values = value.values;
        for (let i = 0, l = values.length; i < l; i++) {
            this.add(values[i], i);
        }
    }
    sub(value, decimal = 0) {
        this.setUncheckValue((this.values[decimal] || 0) - value, decimal);
    }
    subLarge(value) {
        let values = value.values;
        for (let i = 0, l = values.length; i < l; i++) {
            this.sub(values[i], i);
        }
    }
    setUncheckValue(value, decimal) {
        let decimalValue = this.decimal;
        if (value > 0) {
            if (this.values.length <= decimal) {
                for (let i = this.values.length; i < decimal; i++) {
                    this.values[i] = 0;
                }
            }
            if (decimalValue) {
                if (value >= decimalValue) {
                    let up_value = value / decimalValue >> 0;
                    let cur_value = value % decimalValue;
                    this.values[decimal] = cur_value;
                    this.add(up_value, decimal + 1);
                }
                else {
                    this.values[decimal] = value;
                }
            }
        }
    }
    getValues() {
        return this.values;
    }
    toString() {
        return this.values.toString();
    }
}

/***auto-create-index***/

var index$f = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LargeUinit: LargeUinit
});

let Model$1 = class Model {
};
// export class System {
//     context: any;
//     onStart() {
//     }
// }
// export class Context {
//     command(key: string, arag: any) {
//     }
//     message(type: string, data:any) {
//     }
// }
// export class ModelManager {
// }
// export class ViewModel extends Model {
// }
// export class ViewSystem extends System {
// }

class Queue {
    constructor(executor, autoStart = true) {
        this.executor = executor;
        this.autoStart = autoStart;
        this.itemList = [];
        this._running = false;
    }
    push(item) {
        this.itemList.push(item);
        if (this.autoStart && this._running == false) {
            this.start();
        }
    }
    start() {
        if (this._running == false) {
            this._running = true;
            this.next();
        }
    }
    stop() {
        if (this._running == true) {
            this._running = false;
        }
    }
    next() {
        if (this._running) {
            if (this.itemList.length) {
                let item = this.itemList.shift();
                if (item) {
                    let ret = this.executor(item);
                    if (ret instanceof Promise) {
                        let next = this.next.bind(this);
                        ret.then(next, next).catch(next);
                    }
                }
                else {
                    this.next();
                }
            }
            else {
                this.stop();
            }
        }
    }
}

class TaskQueue {
    constructor(executor) {
        this.maxTask = 2;
        this.numTask = 0;
        this.tasks = [];
        this.running = false;
        this.executorList = [];
        if (executor) {
            if (typeof executor == "function") {
                this.executorFactory = executor;
            }
            else {
                this.executorFactory = () => executor;
            }
        }
        else {
            this.executorFactory = () => { return { execute: (task) => typeof task == "function" ? task() : task }; };
        }
    }
    append(task) {
        this.tasks.push(task);
        this.next();
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.numTask < this.maxTask) {
                let task = this.tasks.shift();
                if (task) {
                    let executor = this.executorList.pop() || this.executorFactory();
                    this.numTask++;
                    if (executor) {
                        try {
                            yield executor.execute(task);
                            this.executorList.push(executor);
                            this.onTaskComplete();
                        }
                        catch (error) {
                            this.executorList.push(executor);
                            this.onTaskFail(error);
                        }
                    }
                }
                else {
                    this.onComplete();
                }
            }
        });
    }
    onComplete() {
    }
    onTaskFail(e) {
        this.numTask--;
        this.next();
    }
    onTaskComplete() {
        this.numTask--;
        this.next();
    }
}

/***auto-create-index***/

var index$e = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Queue: Queue,
    TaskQueue: TaskQueue
});

class Model {
}

class View {
}

/***auto-create-index***/

var index$d = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Model: Model,
    View: View
});

/***auto-create-index***/

var index$c = /*#__PURE__*/Object.freeze({
    __proto__: null
});

class Reducer {
    constructor() {
        this.reduces = [];
    }
    input(item) {
    }
}
class ReduceItem {
}

/***auto-create-index***/

var index$b = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ReduceItem: ReduceItem,
    Reducer: Reducer
});

class ScriptEngine {
}

class BlockScriptRuntime {
    evalBlock(block) {
    }
}
const builtin$1 = {
    "sum": (...args) => {
        return args.reduce((a, b) => a.valueOf() + b.valueOf(), 0);
    }
};

class rple {
    constructor() {
        this.grammars = [
            Word,
            Nums,
            LeftBracket,
            Bracket,
        ];
    }
    eval() {
    }
    compile(script) {
        this.readTokens(script);
        // for (let i of tokens) {
        //     context.call(i);
        // }
        // return null
        throw new Error;
    }
    readTokens(script) {
        let buffer = "";
        let tokens = [];
        let grammar = null;
        for (let i of script) {
            if (grammar) {
                if (grammar.match(i)) {
                    buffer = buffer.concat(i);
                }
                else {
                    tokens.push(buffer);
                }
            }
            else {
                for (let ig of this.grammars) {
                    if (ig.start(i)) {
                        grammar = ig;
                        buffer = i;
                        break;
                    }
                }
            }
        }
        return tokens;
    }
}
const Nums = {
    doted: false,
    start: function (char) {
        let code = char.charCodeAt(0);
        Nums.doted = false;
        return code >= 47 && code <= 57;
    },
    match: function (char) {
        let code = char.charCodeAt(0);
        if (code >= 47 && code <= 57) {
            return true;
        }
        else if (code == 46) {
            Nums.doted = true;
            return true;
        }
    }
};
const LeftBracket = {
    start: function (char) { return char == "("; },
    match: function (char) { return false; }
};
const Bracket = {
    start: function (char) { return char == "(" || char == ")" || char == ""; },
    match: function (char) { return false; }
};
const Word = {
    start: function (char) {
        let code = char.charCodeAt(0);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            return true;
        }
    },
    match: function (char) {
        let code = char.charCodeAt(0);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            return true;
        }
    }
};

var TOKEN_TYPE;
(function (TOKEN_TYPE) {
    TOKEN_TYPE[TOKEN_TYPE["NUMBER"] = 0] = "NUMBER";
    TOKEN_TYPE[TOKEN_TYPE["STRING"] = 1] = "STRING";
    TOKEN_TYPE[TOKEN_TYPE["KEY"] = 2] = "KEY";
    TOKEN_TYPE[TOKEN_TYPE["LP"] = 3] = "LP";
    TOKEN_TYPE[TOKEN_TYPE["RP"] = 4] = "RP";
    TOKEN_TYPE[TOKEN_TYPE["COM"] = 5] = "COM";
    TOKEN_TYPE[TOKEN_TYPE["DEFAULT"] = 6] = "DEFAULT";
})(TOKEN_TYPE || (TOKEN_TYPE = {}));
class ScriptScope {
    constructor(parent) {
        this.values = {};
        this.silent = 0;
        this.stack = [];
        this.parent = parent;
    }
    set_value(key, value) {
        this.values[key] = value;
    }
    get_value(key) {
        var _a;
        return this.values[key] || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.get_value(key));
    }
}
class ScriptContext {
    constructor(parent) {
        this.scope = new ScriptScope();
        this.parent = parent;
    }
    down() {
        this.scope = new ScriptScope(this.scope);
    }
    up() {
        this.scope = this.scope.parent;
    }
    get_value(key) {
        return this.scope.get_value(key) || this.parent.get_value(key);
    }
    set_value(key, value) {
        this.scope.set_value(key, value);
    }
}
const JassRuntimeProcessor = {
    [TOKEN_TYPE.DEFAULT]: function (token, context) {
        context.scope.stack.push(token.value);
    },
    [TOKEN_TYPE.LP]: function (token, context) {
        context.down();
    },
    [TOKEN_TYPE.RP]: function (token, context) {
        let stack = context.scope.stack;
        context.up();
        let mothed_name = context.scope.stack.pop();
        let mothed = context.get_value(mothed_name);
        mothed.apply(null, stack);
    },
    [TOKEN_TYPE.COM]: function (token, context) {
    },
    [TOKEN_TYPE.STRING]: function (token, context) {
        context.scope.stack.push(token.value);
    },
    [TOKEN_TYPE.KEY]: function (token, context) {
        context.scope.stack.push(token.value);
    }
};
const BUILTIN_TOKEN_READER = {
    TOKEN_COM: {
        type: TOKEN_TYPE.COM,
        start: ",",
        check: (char) => false
    },
    TOKEN_LP: {
        type: TOKEN_TYPE.LP,
        start: "(",
        check: (char) => false
    },
    TOKEN_RP: {
        type: TOKEN_TYPE.RP,
        start: ")",
        check: (char) => false
    },
    TOKEN_NUMBER: {
        type: TOKEN_TYPE.NUMBER,
        start: "01234556789",
        convert: Number,
        check: (char) => char.charCodeAt(0) >= 45 && char.charCodeAt(0) <= 57,
        single: true
    },
    TOKEN_STRING_1: {
        type: TOKEN_TYPE.STRING,
        start: "'",
        convert: String,
        check: (char) => char != "'",
        mode: 1,
        single: true
    },
    TOKEN_KEY: {
        type: TOKEN_TYPE.KEY,
        start: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        check: (char) => {
            return char.charCodeAt(0) >= 45 && char.charCodeAt(0) <= 128;
        },
        single: true
    }
};
class ScriptRender {
    constructor(serializer, content) {
        this.position = 0;
        this.last_position = 0;
        this.serializer = serializer;
        this.content = content;
    }
    read() {
        let length = this.content.length;
        let position = this.position;
        for (; position < length; position++) {
            let char = this.content.charAt(position);
            this.reader = this.reader || this.serializer.getReader(this.content, position);
            if (!this.reader.check(char)) {
                if (this.last_position == position) {
                    position = position + 1;
                }
                let start = this.last_position;
                let end = position;
                if (this.reader.mode == 1) {
                    if (position - this.last_position <= 1) {
                        this.last_position++;
                        continue;
                    }
                    else {
                        position++;
                    }
                }
                let value = this.content.substring(start, end);
                if (this.reader.convert) {
                    value = this.reader.convert(value);
                }
                let type = this.reader.type;
                this.last_position = position;
                this.position = position;
                this.reader = null;
                return { value: value, type: type };
            }
        }
    }
}
class ScriptSerializer {
    constructor(tokens) {
        this.root = {};
        for (let i of tokens) {
            let node = this.root;
            for (let k of i.start) {
                if (!node[k]) {
                    node[k] = {};
                }
                node = node[k];
                if (i.single) {
                    node.value = i;
                    node = this.root;
                }
            }
            if (node != this.root) {
                node.value = i;
            }
        }
        this.root.default = tokens[0];
    }
    createReader(script) {
        let stream = new ScriptRender(this, script);
        return stream;
    }
    getReader(text, position) {
        let node = this.root;
        let length = text.length;
        for (; position < length; position++) {
            let char = text.charAt(position);
            if (node[char]) {
                node = node[char];
            }
        }
        return node.value || this.root.default;
    }
}
class ScriptRuntime {
    constructor(processors) {
        this.processors = processors;
    }
    input(token, context) {
        (this.processors[token.type] || this.processors[TOKEN_TYPE.DEFAULT])(token, context);
    }
}
class JassScriptEngine {
    constructor(global) {
        this.serializer = new ScriptSerializer([
            BUILTIN_TOKEN_READER.TOKEN_KEY,
            BUILTIN_TOKEN_READER.TOKEN_COM,
            BUILTIN_TOKEN_READER.TOKEN_LP,
            BUILTIN_TOKEN_READER.TOKEN_RP,
            BUILTIN_TOKEN_READER.TOKEN_NUMBER,
            BUILTIN_TOKEN_READER.TOKEN_STRING_1
        ]);
        this.runtime = new ScriptRuntime(JassRuntimeProcessor);
        this.global = new ScriptContext();
        this.global.set_value("print", (...args) => console.log.apply(null, args));
    }
    eval(script) {
        let stream = this.serializer.createReader(script);
        let token = null;
        let context = new ScriptContext(this.global);
        while (token = stream.read()) {
            console.log(token);
            this.runtime.input(token, context);
        }
    }
    commpile(script, scriptScope) {
        let stream = this.serializer.createReader(script);
        let token = null;
        let context = new ScriptContext(this.context);
        while (token = stream.read()) {
            this.runtime.input(token, context);
        }
    }
    setContext(context) {
        this.context = context;
    }
}
//? compile 编译成function
//? scope隔离
//? 暂停继续
var engine = new JassScriptEngine();
engine.eval("print('test')");

var ReliBuildin = {
    "if": function (a) { return Boolean(a); },
    "not": function (a) { return !a; }, //逻辑反
    "and": function (a, b) { return a && b; }, //逻辑和
    "or": function (a, b) { return a || b; }, //逻辑与
    "mte": function (a, b) { return a >= b; }, //大于等于
    "lte": function (a, b) { return a <= b; }, //小于等于
    "lt": function (a, b) { return a < b; }, //小于
    "mt": function (a, b) { return a > b; }, //大于
    "sum": function (a, b) { return a + b; }, //加
    "imsub": function (a, b) { return a - b; }, //减
    "product": function (a, b) { return a * b; }, //乘
    "quotient": function (a, b) { return a / b; }, //除
    "pow": function (a, b) { return Math.pow(a, b); }, //次方
    "mod": function (a, b) { return a % b; }, //取模
};
class ReliScriptEngine {
    countFTokens(tokens, context, params) {
        let values = [];
        for (let i of tokens) {
            if (typeof context[i] == "function") {
                values.push(context[i].apply(null, values.splice(values.length - i.length)));
            }
            else if (params && params[i] != undefined) {
                values.push(params[i]);
            }
            else {
                values.push(Number(i));
            }
        }
        return values[0];
    }
    eval(script) {
        this.reader.load(script);
        let tokens = this.reader.readAll();
        return this.countFTokens(tokens, ReliBuildin);
    }
}
/**解释嵌套函数字符串为逆波兰
 * 例子: and(and(not(isCharge),mte(Strength,80)),and(mte(Wing,28),lt(Mount,32)))
 * 输出: isCharge,not,Strength,80,mte,and,Wing,28,mte,Mount,32,lt,and,and
 */
class ReliTokenReader {
    constructor() {
        this.posistion = 0;
    }
    load(script) {
        let ts = script.split(/((?=[\)\,])|\b)/g);
        let vl = [];
        let sl = [];
        for (let token of ts) {
            if (token != "") {
                if (token == ")") {
                    vl = vl.concat(sl.splice(sl.lastIndexOf("(") + 1));
                    sl.pop();
                    let r = sl.pop();
                    if (r) {
                        vl.push(r);
                    }
                }
                else if (token != ",") {
                    sl.push(token);
                }
            }
        }
        this.tokens = vl.concat(sl);
    }
    read() {
        return this.tokens[this.posistion++];
    }
    readAll() {
        return this.tokens;
    }
}

class StackFlowContext {
    constructor() {
        this.bindingsList = [];
        if (this.runtime == null) {
            this.runtime = new StackRuntime();
            this.bindingsList[0] = new ValueBindings(builtin);
        }
    }
    eval(script, bindings) {
        if (typeof (script) == "string") {
            let tokens;
            // this.read_tokens(script);
            let last_toekn_is_word = false;
            for (let i of tokens) {
                if (i == "(") {
                    if (last_toekn_is_word) {
                        let word = this.runtime.pop();
                        this.runtime.down();
                        this.runtime.push(word);
                    }
                    else {
                        this.runtime.down();
                    }
                    last_toekn_is_word = false;
                }
                else if (i == ")") {
                    this.runtime.call();
                    last_toekn_is_word = false;
                }
                else if (i != ",") {
                    last_toekn_is_word = true;
                    if (bindings) {
                        this.runtime.push(bindings.get(i));
                    }
                    else {
                        this.runtime.push(i);
                    }
                }
            }
        }
    }
    get(key) {
        throw new Error("Method not implemented.");
    }
    getBindings(scope) {
        throw new Error("Method not implemented.");
    }
    getContext() {
        throw new Error("Method not implemented.");
    }
    getScriptContext(nn) {
        throw new Error("Method not implemented.");
    }
    put(key, value) {
        throw new Error("Method not implemented.");
    }
    setBindings(bindings, scope) {
        throw new Error("Method not implemented.");
    }
    setContext(ctxt) {
        throw new Error("Method not implemented.");
    }
    compile(script) {
        return function (...args) {
        };
    }
}
const builtin = {
    sum: function (...args) { return args.reduce((p, c) => p + c); },
    sub: function (...args) { return args.reduce((p, c) => p - c); },
    mul: function (...args) { return args.reduce((p, c) => p * c); },
    div: function (...args) { return args.reduce((p, c) => p / c); },
};
class ValueBindings {
    constructor(value) {
        this.value = value;
    }
    containsKey(key) {
        return this.value[key] != null;
    }
    get(key) {
        return this.value[key];
    }
    put(name, value) {
        this.value[name] = value;
    }
    putAll(toMerge) {
        for (let i in toMerge) {
            this.value[i] = toMerge[i];
        }
    }
    remove(key) {
        delete this.value[key];
    }
}
class StackRuntime {
    constructor() {
        this.stacks = [this.stack = []];
    }
    setBindings(bindings) {
        this.bindings = bindings;
    }
    push(value) {
        this.stack.push(value);
    }
    pop() {
        return this.stack.pop();
    }
    call() {
        if (this.stack[0] instanceof Function) {
            let ret = this.stack.call(this.stack[0]);
            this.up();
            this.push(ret);
        }
    }
    down() {
        this.stacks.push(this.stack = []);
    }
    up() {
        this.stacks.pop();
        this.stack = this.stacks[this.stacks.length - 1];
    }
}

class TinyScriptContext {
    get(arg0) {
    }
}

class TinyScriptEngine extends ScriptEngine {
    constructor() {
        super(...arguments);
        this.reander = new TinyTokenReader([
            { begin: "'", end: "'", type: TinyTokenType.STRING },
            { begin: '"', end: '"', type: TinyTokenType.STRING },
            { begin: '+', end: '', type: TinyTokenType.ADD },
            { begin: '-', end: '', type: TinyTokenType.SUB },
            { begin: '*', end: '', type: TinyTokenType.MUP },
            { begin: '/', end: '', type: TinyTokenType.EXP },
            { begin: '>', end: '', type: TinyTokenType.BIG },
            { begin: '<', end: '', type: TinyTokenType.MIN },
            { begin: '(', end: '', type: TinyTokenType.LK },
            { begin: ')', end: '', type: TinyTokenType.RK },
            { begin: '0123456789', end: '0123456789.', type: TinyTokenType.NUM },
            { begin: ' ', end: '', type: TinyTokenType.SP },
            { begin: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_', end: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_", type: TinyTokenType.VAR },
        ]);
    }
    eval(script, context) {
        let runtime = new TinyScriptRuntime();
        let reander = this.reander;
        reander.load(script);
        runtime.start(context);
        let token;
        while (token = reander.read()) {
            runtime.input(token);
        }
        return context.get("@return");
    }
}
class TinyScriptRuntime {
    constructor() {
        this.stack = [];
        this.stackScope = 1;
    }
    start(context) {
    }
    input(token) {
        switch (token.type) {
            case TinyTokenType.STRING:
            // if(this.context.get(2,))
            // this.context.put(token.value)
        }
    }
    output() {
    }
}
var TinyTokenType;
(function (TinyTokenType) {
    TinyTokenType[TinyTokenType["STRING"] = 0] = "STRING";
    TinyTokenType[TinyTokenType["ADD"] = 1] = "ADD";
    TinyTokenType[TinyTokenType["SUB"] = 2] = "SUB";
    TinyTokenType[TinyTokenType["MUP"] = 3] = "MUP";
    TinyTokenType[TinyTokenType["EXP"] = 4] = "EXP";
    TinyTokenType[TinyTokenType["BIG"] = 5] = "BIG";
    TinyTokenType[TinyTokenType["MIN"] = 6] = "MIN";
    TinyTokenType[TinyTokenType["LK"] = 7] = "LK";
    TinyTokenType[TinyTokenType["RK"] = 8] = "RK";
    TinyTokenType[TinyTokenType["NUM"] = 9] = "NUM";
    TinyTokenType[TinyTokenType["SP"] = 10] = "SP";
    TinyTokenType[TinyTokenType["VAR"] = 11] = "VAR";
})(TinyTokenType || (TinyTokenType = {}));
class TinyTokenReader {
    constructor(rules) {
        this.rules = rules;
    }
    load(content) {
        this.content = content;
    }
    read() {
        let tokenType;
        let buffer = "";
        let content = this.content;
        let length = content.length;
        let curRule = null;
        for (let i = this.position; i < length; i++) {
            if (curRule == null) {
                for (let l of this.rules) {
                    if (l.begin.indexOf(content[i]) >= 0) {
                        curRule = l;
                    }
                }
            }
            if (curRule) {
                if (curRule.end.indexOf(i) >= 0) {
                    buffer = buffer.concat(content[i]);
                }
                else {
                    tokenType = curRule.type;
                }
            }
            if (tokenType) {
                buffer = "";
                tokenType = "";
                return { value: buffer, type: tokenType };
            }
        }
        return null;
    }
}

const BuildIn = {
    "+": function (...args) { return args.reduce((c, v) => Number(c) + Number(v)); },
    "-": function (...args) { return args.reduce((c, v) => Number(c) - Number(v)); },
    "*": function (...args) { return args.reduce((c, v) => Number(c) * Number(v)); },
    "/": function (...args) { return args.reduce((c, v) => Number(c) / Number(v)); },
};
class TrickScriptEngine extends ScriptEngine {
    eval(script, params, context) {
        let tokens = this.loadTokens(script);
        context = context || BuildIn;
        let fn = this._compile(tokens, context);
        if (fn) {
            return fn();
        }
    }
    compile(script, context) {
        let tokens = this.loadTokens(script);
        return this._compile(tokens, context);
    }
    _compile(tokens, context) {
        context = context || BuildIn;
        let token;
        let stack = [];
        while (token = tokens.shift()) {
            if (token) {
                switch (token) {
                    case "(":
                        let mothed_name = stack.pop();
                        let mothed = context[mothed_name] || BuildIn[mothed_name];
                        let mothed_stack = this._compile(tokens, context);
                        stack.push(function () {
                            let args = mothed_stack && mothed_stack();
                            args = args.map((v) => typeof v == "function" ? v() : v);
                            return mothed.apply(null, args);
                        });
                        break;
                    case ")":
                        return function () {
                            return stack;
                        };
                    case ",": break;
                    default:
                        stack.push(token);
                        break;
                }
            }
        }
    }
    loadTokens(script) {
        let tokens = [];
        let buffer = "";
        for (let i of script) {
            if (i == "(" || i == ")" || i == ",") {
                tokens.push(buffer, i);
                buffer = "";
            }
            else {
                buffer = buffer.concat(i);
            }
        }
        return tokens;
    }
    input(tokens) {
    }
}

/***auto-create-index***/

var index$a = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BUILTIN_TOKEN_READER: BUILTIN_TOKEN_READER,
    BlockScriptRuntime: BlockScriptRuntime,
    JassRuntimeProcessor: JassRuntimeProcessor,
    JassScriptEngine: JassScriptEngine,
    ReliScriptEngine: ReliScriptEngine,
    ReliTokenReader: ReliTokenReader,
    ScriptContext: ScriptContext,
    ScriptEngine: ScriptEngine,
    ScriptRender: ScriptRender,
    ScriptRuntime: ScriptRuntime,
    ScriptScope: ScriptScope,
    ScriptSerializer: ScriptSerializer,
    StackFlowContext: StackFlowContext,
    StackRuntime: StackRuntime,
    get TOKEN_TYPE () { return TOKEN_TYPE; },
    TinyScriptContext: TinyScriptContext,
    TinyScriptEngine: TinyScriptEngine,
    TinyScriptRuntime: TinyScriptRuntime,
    TinyTokenReader: TinyTokenReader,
    get TinyTokenType () { return TinyTokenType; },
    TrickScriptEngine: TrickScriptEngine,
    builtin: builtin$1,
    rple: rple
});

/***auto-create-index***/

var index$9 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

class ArraySheet {
    constructor(source) {
        this.source = source;
        this._length = source.length;
    }
    get(index) {
        return this.source[index];
    }
    find(keyName, keyValue) {
        return this.source.filter(v => v[keyName] === keyValue)[0];
    }
    findAll(keyName, keyValue) {
        return this.source.filter(v => v[keyName] === keyValue);
    }
    get lengeh() {
        return this._length;
    }
}

/***auto-create-index***/

var index$8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ArraySheet: ArraySheet
});

class ScriptStatus {
    constructor(name, onOpen, onClose) {
        this.name = name;
        this.onOpen = onOpen;
        this.onClose = onClose;
    }
    open() {
        this.onOpen && this.onOpen();
    }
    close() {
        this.onClose && this.onClose();
    }
}

class StatusGroup {
    constructor(context) {
        this.context = context;
        this.name = "";
        this.statusMap = {};
    }
    register(status) {
        this.statusMap[status.name] = status;
    }
    setStatus(key) {
        let status = this.statusMap[key];
        if (this.currentStatus) {
            this.currentStatus.close();
        }
        this.currentStatus = status;
        if (status) {
            status.open();
        }
    }
}

/***auto-create-index***/

var index$7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ScriptStatus: ScriptStatus,
    StatusGroup: StatusGroup
});

class FrameStack {
    constructor() {
        this.frames = [];
    }
    pushFrame(frame) {
        this.frames.push(frame);
    }
    getFrame(index) {
        return this.frames[index];
    }
}
class SyncFrame {
}
class SyncManager {
}

/***auto-create-index***/

var index$6 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

class Table {
    // constructor(name: TValue, value: TValue[]| ({ [key: TValue]: TValue }))
    // constructor(table: { name: TValue, value: (TValue[]) | ({ [key: TValue]: TValue }) })
    constructor(...args) {
        if (args.length == 1) {
            this.name = args[0].name;
            this.value = args[0].name;
        }
        else {
            this.name = args[0];
            this.value = args[1];
        }
    }
    get(id) {
        if (this.value instanceof Array) ;
        else {
            return this.value[id];
        }
    }
    forEach(fn) {
        for (let i in this.value) {
            fn(this.value[i]);
        }
    }
    add(key, value) {
        throw new Error("Method not implemented.");
    }
    remove(key) {
        throw new Error("Method not implemented.");
    }
}

/***auto-create-index***/

var index$5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Table: Table
});

class Job {
    then(result) {
    }
    resolve() {
    }
    reject() {
    }
}

class Task {
    constructor() {
        this.resolves = [];
        this.rejects = [];
    }
    then(fn) {
        this.resolves.push(fn);
        return this;
    }
    catch(fn) {
        this.rejects.push(fn);
        return this;
    }
    resolve() {
        for (let i of this.resolves) {
            i();
        }
        this._reset();
    }
    reject() {
        for (let i of this.rejects) {
            i();
        }
        this._reset();
    }
    _reset() {
        this.resolves.length = 0;
        this.rejects.length = 0;
    }
}

/***auto-create-index***/

var index$4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Job: Job,
    Task: Task
});

class ValueTrigger {
    constructor() {
        this.TRIGGER_ID = 0;
        this.trigger_list = {};
        this.valueStack = {};
    }
    addTrigger(conditions, check) {
        let trigger_id = this.TRIGGER_ID++;
        let trigger_mask = 0xffffff;
        let nodes = [];
        for (let i = 0; i < conditions.length; i++) {
            let valueStack = this.valueStack[conditions[i].key];
            trigger_mask ^= 1 << i;
            let node = new LinkNode([trigger_id, i]);
            if (valueStack.conditions.next) {
                valueStack.conditions.next.prev = node;
                node.next = valueStack.conditions.next;
            }
            node.prev = valueStack.conditions;
            valueStack.conditions.next = node;
            nodes.push(node);
        }
        this.trigger_list[trigger_id] = { mask: trigger_mask, conditions: conditions, conditionodes: nodes };
        check && this.checkTrigger(trigger_id);
        return trigger_id;
    }
    removeTrigger(id) {
        for (let i of this.trigger_list[id].conditions) {
            if (i.prev) {
                i.prev.next = i.next;
            }
        }
        delete this.trigger_list[id];
    }
    registerValue(key, defaultValue = 0, comparator = ValueTrigger.NumberComparator) {
        this.valueStack[key] = { value: defaultValue, comparator: comparator, conditions: new LinkNode };
    }
    setValue(key, value) {
        let valueStack = this.valueStack[key];
        valueStack.value = value;
        let node = valueStack.conditions.next;
        while (node && node.value) {
            let trigger_id = node.value[0];
            let condition = this.trigger_list[trigger_id].conditions[node.value[1]];
            this.setTriggerMask(trigger_id, valueStack.comparator(value, condition.value) << node.value[1] != 0, node.value[1]);
            node = node.next;
        }
    }
    setTriggerMask(id, pass, index) {
        let trigger = this.trigger_list[id];
        let oldMask = trigger.mask;
        let newMask = 0;
        if (pass) {
            newMask = oldMask | (1 << (index));
        }
        else {
            newMask = oldMask & ~(1 << (index));
        }
        trigger.mask = newMask;
        if (oldMask != newMask && (oldMask == 0xffffff || newMask == 0xffffff)) {
            this.trigger(id, newMask == 0xffffff);
        }
    }
    checkTrigger(id) {
        let trigger = this.trigger_list[id];
        let conditions = trigger.conditions;
        for (let i = 0; i < conditions.length; i++) {
            let valueStack = this.valueStack[conditions[i].key];
            this.setTriggerMask(id, valueStack.comparator(valueStack.value, conditions[i].value) << i != 0, i);
        }
    }
    trigger(id, pass) {
        this.onTrigger && this.onTrigger(id, pass);
    }
    static NumberComparator(a, b) {
        return a == b ? 1 : 0;
    }
}

/***auto-create-index***/

var index$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ValueTrigger: ValueTrigger
});

/***auto-create-index***/

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

class WindowLoader {
}

/***auto-create-index***/

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    WindowLoader: WindowLoader
});

class World {
    constructor() {
        this.indexerMap = new SingletonMap();
        this.indexerList = new TableList();
        this.systems = new Map();
    }
    addUnit(unit) {
        for (let i of this.indexerList.values()) {
            i.addUnit(i);
        }
        return unit;
    }
    removeUnit(unit) {
        for (let i of this.indexerList.values()) {
            i.removeUnit(i);
        }
        return unit;
    }
    updateUnit(unit) {
        for (let i of this.indexerList.values()) {
            i.updateUnit(i);
        }
    }
    addIndexer(type) {
        this.indexerList.add(type.name, new type);
    }
    getIndexer(type) {
        return this.indexerMap.get(type);
    }
    addSystem(key, system) {
        this.systems.set(key, system);
        system.context = this;
    }
}
class ComponentIndexer {
    addUnit(unit) {
        throw new Error("Method not implemented.");
    }
    removeUnit(unit) {
        throw new Error("Method not implemented.");
    }
    getUnit(key) {
        throw new Error("Method not implemented.");
    }
    getUnits(key) {
        throw new Error("Method not implemented.");
    }
    updateUnit(unit) {
    }
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ComponentIndexer: ComponentIndexer,
    World: World
});

export { Context$1 as Context, FrameStack, Model$1 as Model, SyncFrame, SyncManager, TableList$1 as TableList, TagTableList, Unit, World$1 as World, index$o as broadcast, index$n as collection, index$m as definition, index$l as ecs, index$k as editor, index$j as event, index$i as flow, index$h as lobby, index$g as map, index$f as math, index$d as mvc, index$e as queue, index$b as reducer, index$c as scene, index$a as scripts, index$9 as services, index$8 as sheet, index$7 as status, index$6 as system, index$5 as table, index$4 as task, index$3 as trigger, index$2 as view, index$1 as window, index as world };
