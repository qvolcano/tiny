import { TagDict } from "../collection";
export declare class Context {
    components: TagDict<string | number>;
    static entity_id: number;
    constructor();
    createEntity(): number;
    addComponent(entity: number, type: number, component: Object): void;
    removeComponent(entity: number, type: number): void;
    getComponent(entity: number, type: number): Object;
    getComponents(type: number): Object[];
}
