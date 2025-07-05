export class LinkNode<T = any> {
    next?:LinkNode<T>
    prev?:LinkNode<T>
    value?:T
    constructor(value?:T){
        this.value = value;
    }
}