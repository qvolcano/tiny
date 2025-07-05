import { TableList } from "../collection";
export declare class Context {
    tags: {
        [key: number]: TableList<number, Object>;
    };
    addComponent(entity: number, type: number, component: Object): void;
    removeComponent(entity: number, type: number): void;
    getComponent(entity: number, type: number): Object;
    getComponents(type: number): Object[];
    getComponentsByEntity(entity: number): any[];
}
