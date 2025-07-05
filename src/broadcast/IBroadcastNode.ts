export interface IBroadcastNode {
    connnect(node: IBroadcastNode):void;
    disconnect(node: IBroadcastNode):void;
    broadcast(event: any):void;
    receive(event: any):void;
}