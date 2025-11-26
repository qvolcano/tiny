export { E as EventHandler } from '../EventHandler-8c6f33da.js';

declare class Action {
    listeners: Function[];
    add(fn: Function): void;
    call(): void;
}

declare class Broadcast<T = any> {
    listeners: any[];
    broadcasting: boolean;
    on(listener: (data: T) => void, thisObj?: any): void;
    once(listener: (data: T) => void, thisObj?: any): void;
    off(listener: (data: T) => void, thisObj?: any): boolean;
    broadcast(...data: any): void;
    private offAt;
}

declare class Event {
    $setTarget(currentTarget: any): void;
    type: string;
    data: any;
    target: any;
    $currentTarget: any;
}

declare class EventDispatcher {
    private eventPool;
    private listeners;
    private $EventDispatcher;
    private notifyLevel;
    constructor(target?: {
        [P in keyof EventDispatcher]: EventDispatcher[P];
    });
    dispatchEvent(event: Event): boolean;
    private $notifyListener;
    private insertListener;
    dispatchEventWith(eventType: string, data?: any): boolean;
    once(eventType: string, listener: Function, thisObj?: any): void;
    addEventListener(eventType: string, listener: Function, thisObj?: any): void;
    removeEventListener(eventType: string, listener: Function, thisObj?: any): void;
    hasEventListener(eventType: string): boolean;
}

declare class EventEmitter<T = any> {
    on<K extends keyof T>(event: K, listener: (payload: T[K]) => any): this;
    once<K extends keyof T>(event: K, listener: (payload: T[K]) => any): this;
    off<K extends keyof T>(evt: K | string, listener?: Function): this;
    emit<K extends keyof T>(evt: K | string, ...args: any[]): boolean;
}

export { Action, Broadcast, Event, EventDispatcher, EventEmitter };
