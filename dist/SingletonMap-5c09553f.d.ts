type Type<T> = {
    name?: string;
} & (new (...args: any) => T);

declare class SingletonMap<T> {
    private maps;
    private factory;
    constructor(factory?: (type: Type<T>) => T);
    register(type: Type<T>): void;
    add(key: string, instance: T): void;
    get(type: Type<T>): T | undefined;
}

export { SingletonMap as S, Type as T };
