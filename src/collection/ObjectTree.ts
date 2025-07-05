export default class ObjectTree {
    name: string = "";
    $parent: this|undefined;
    $children: this[] = [];
    addChild(child: this) {
        if (child.parent) {
            child.parent.removeChild(child);
        }
        child.$parent = this;
        this.$children.push(child);
        return child;
    }

    removeChild(child: this): this|undefined {
        let index = this.$children.indexOf(child);
        if (index >= 0) {
            return this.$children.splice(index, 1)[0];
        }
    }

    getChildAt(index: number): this {
        return this.$children[index];
    }

    getChildByName(name: string) {
        for (let i of this.$children) {
            if (i.name == name) {
                return i;
            }
        }
    }

    get numChildren(): number {
        return this.$children.length;
    }

    get parent(): this|undefined {
        return this.$parent;
    }

    static  getChildByPath<T extends ObjectTree>(target: T, path: string): T {
        let names = path.split(".");
        for (let i of names) {
            if (target) {
                target = target.getChildByName(i) as T;
            } else {
                break;
            }
        }
        return target;
    }
}