export declare class LinkNode<T = any> {
    next?: LinkNode<T>;
    prev?: LinkNode<T>;
    value?: T;
    constructor(value?: T);
}
