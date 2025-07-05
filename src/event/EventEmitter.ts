export class EventEmitter<T = any> {
    
    on<K extends keyof T>(event: K, listener: (payload: T[K]) => any): this;
    on(evt: string, listener: Function): this {
        return this
    }

    once<K extends keyof T>(event: K, listener: (payload: T[K]) => any): this;
    once(evt: string, listener: Function): this {
        return this
    }

    off<K extends keyof T>(evt: K | string, listener?: Function): this {
        return this
    }

    emit<K extends keyof T>(evt: K | string, ...args: any[]): boolean {
        return false
    }
}