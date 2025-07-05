export type DefintionKey<T> = {
    name?: string;
    data?: T;
    prototype: T &{name:string};
}