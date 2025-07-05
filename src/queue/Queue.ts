export class Queue{
    private itemList:any[] = [];
    private _running = false;
    constructor(private executor:(item:any)=>void|Promise<void>,private autoStart:boolean=true) {
    }

    push(item:any) {
        this.itemList.push(item);
        if (this.autoStart && this._running == false) {
            this.start();
        }
    }

    protected start() {
        if (this._running == false) {
            this._running = true;
            this.next();
        }

    }

    protected stop() {
        if (this._running == true) {
            this._running = false;
        }
    }

    private next() {
        if (this._running) {
            if (this.itemList.length) {
                let item = this.itemList.shift();
                if (item) {
                    let ret = this.executor(item);
                    if (ret instanceof Promise) {
                        let next = this.next.bind(this);
                        ret.then(next, next).catch(next);
                    }
                } else {
                    this.next();
                }
            } else {
                this.stop();
            }
        }
    }
}