declare class Reducer<T extends any> {
    reduces: ReduceItem[];
    input(item: any): void;
}
declare class ReduceItem {
}

export { ReduceItem, Reducer };
