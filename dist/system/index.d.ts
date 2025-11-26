type Type<T> = {
    name?: string;
} & (new (...args: any) => T);

export { Type };
