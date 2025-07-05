export type Type<T> = {
    name?: string;
} & (new (...args: any) => T)

