import { Event } from '../Event/index.js';

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

export { EventDispatcher };
