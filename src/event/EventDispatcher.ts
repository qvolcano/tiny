import { Event } from "./Event";

export class EventDispatcher {
    private eventPool:Event[] = [];
    private listeners: { [key: string]: (Function | any)[] } = {};
    private $EventDispatcher: any;
    private notifyLevel = 0;

    constructor(target?: { [P in keyof EventDispatcher]: EventDispatcher[P] }) {
        this.$EventDispatcher = target;
    }
    public dispatchEvent(event: Event): boolean {
        event.$currentTarget = this.$EventDispatcher;
        event.$setTarget(event.$currentTarget);
        return this.$notifyListener(event);
    }

    private $notifyListener(event: Event): boolean {
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
        } else {
            return false;
        }
    }

    private insertListener(eventType:string, listener: Function, thisObj: any, isOnce: boolean) {
        let list = this.listeners[eventType];
        if (list == null) {
            list = this.listeners[eventType] = [];
        } else {
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

    public dispatchEventWith(eventType: string, data?: any): boolean {
        if (this.hasEventListener(eventType)) {
            let event = this.eventPool.pop() || new Event();
            event.type = eventType;
            event.data = data;
            let result = this.dispatchEvent(event);
            this.eventPool.push(event);
            return result;
        } else {
            return false;
        }
    }

    public once(eventType: string, listener: Function, thisObj?: any) {
        this.insertListener(eventType, listener, thisObj, true);
    }

    public addEventListener(eventType: string, listener: Function, thisObj?: any) {
        this.insertListener(eventType, listener, thisObj, false);
    }

    public removeEventListener(eventType: string, listener: Function, thisObj?: any) {
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

    public hasEventListener(eventType: string): boolean {
        let list = this.listeners[eventType];
        if (list && list.length) {
            return true;
        } else {
            return false;
        }
    }
}
