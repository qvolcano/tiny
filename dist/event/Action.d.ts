export declare class Action {
    listeners: Function[];
    add(fn: Function): void;
    call(): void;
}
