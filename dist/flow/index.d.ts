declare class Flow {
    private items;
    add(item: Function): void;
    remove(item: Function): void;
    call(...args: any): void;
}

export { Flow };
