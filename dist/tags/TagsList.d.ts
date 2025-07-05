declare class TagsList {
    items: Map<number, number>;
    setTag(item: number, tag: number): void;
    getTags(item: number): number;
    getItem(tags: number): number;
}
