import { Event } from "./Event";
export declare class EventDispatcher {
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
