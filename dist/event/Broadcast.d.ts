export declare class Broadcast<T = any> {
    listeners: any[];
    broadcasting: boolean;
    on(listener: (data: T) => void, thisObj?: any): void;
    once(listener: (data: T) => void, thisObj?: any): void;
    off(listener: (data: T) => void, thisObj?: any): boolean;
    broadcast(...data: any): void;
    private offAt;
}
