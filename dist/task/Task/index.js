class Task {
    constructor() {
        this.resolves = [];
        this.rejects = [];
    }
    then(fn) {
        this.resolves.push(fn);
        return this;
    }
    catch(fn) {
        this.rejects.push(fn);
        return this;
    }
    resolve() {
        for (let i of this.resolves) {
            i();
        }
        this._reset();
    }
    reject() {
        for (let i of this.rejects) {
            i();
        }
        this._reset();
    }
    _reset() {
        this.resolves.length = 0;
        this.rejects.length = 0;
    }
}

export { Task };
