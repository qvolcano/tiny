export declare class EventHandler<T> {
    private listeners;
    private emmiting;
    on(listener: (event: T) => void, caller?: any): void;
    once(listener: (event: T) => void, caller?: any): void;
    off(listener: (event: T) => void, caller?: any): boolean;
    has(listener: (event: T) => void, caller?: any): boolean;
    private get;
    emmit(event: T): void;
}
