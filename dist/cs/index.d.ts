import { T as TableList } from '../TableList-bbe6535b.js';

declare class Context {
    tags: {
        [key: number]: TableList<number, Object>;
    };
    addComponent(entity: number, type: number, component: Object): Object;
    removeComponent(entity: number, type: number): Object | undefined;
    getComponent(entity: number, type: number): Object;
    getComponents(type: number): Object[];
    getComponentsByEntity(entity: number): any[];
}

export { Context };
