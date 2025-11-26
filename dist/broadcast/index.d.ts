declare class BroadcastNode {
    version: string;
}

interface IBroadcastNode {
    connnect(node: IBroadcastNode): void;
    disconnect(node: IBroadcastNode): void;
    broadcast(event: any): void;
    receive(event: any): void;
}

declare class ValueBroadcastNode implements IBroadcastNode {
    _nodeList: ValueBroadcastNode[];
    _enabled: boolean;
    _value: number;
    _onChange?: Function;
    connnect(node: ValueBroadcastNode): void;
    disconnect(node: ValueBroadcastNode): void;
    broadcast(event: any): void;
    receive(event: any): void;
    get enabled(): boolean;
    set enabled(value: boolean);
    get value(): number;
    set value(value: number);
}

export { BroadcastNode, IBroadcastNode, ValueBroadcastNode };
