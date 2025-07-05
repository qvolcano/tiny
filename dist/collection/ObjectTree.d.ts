export default class ObjectTree {
    name: string;
    $parent: this | undefined;
    $children: this[];
    addChild(child: this): this;
    removeChild(child: this): this | undefined;
    getChildAt(index: number): this;
    getChildByName(name: string): this;
    get numChildren(): number;
    get parent(): this | undefined;
    static getChildByPath<T extends ObjectTree>(target: T, path: string): T;
}
