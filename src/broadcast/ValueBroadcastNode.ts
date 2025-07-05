import { IBroadcastNode } from './IBroadcastNode';
export class ValueBroadcastNode implements IBroadcastNode {
    _nodeList: ValueBroadcastNode[] = [];
    _enabled: boolean = true;
    _value: number = 0;
    _onChange?: Function;

    connnect(node: ValueBroadcastNode) {
        if (this._nodeList.indexOf(node) == -1) {
            this._nodeList.push(node);
        }
    }
    disconnect(node: ValueBroadcastNode) {
        let index = this._nodeList.indexOf(node);
        if (index != -1) {
            this._nodeList.splice(index, 1);
        }
    }
    broadcast(event: any) {
        this._onChange && this._onChange();
        for (let i of this._nodeList) {
            i.receive(event);
        }
    }
    receive(event: any) {
        let actived = 0;
        for (let i of this._nodeList) {
            if (i._enabled && i._value > 0) {
                actived += i._value;
            }
        }
        this.value = actived;
        this.broadcast(event);
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(value: boolean) {
        this._enabled = value;
    }

    get value() {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

}