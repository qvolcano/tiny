export declare class EventEmitter<T = any> {
    on<K extends keyof T>(event: K, listener: (payload: T[K]) => any): this;
    once<K extends keyof T>(event: K, listener: (payload: T[K]) => any): this;
    off<K extends keyof T>(evt: K | string, listener?: Function): this;
    emit<K extends keyof T>(evt: K | string, ...args: any[]): boolean;
}
