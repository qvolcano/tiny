export class Task implements ITaskResult {
    resolves: Function[] = [];
    rejects: Function[] = [];
    then(fn: (result: any) => any): this {
        this.resolves.push(fn);
        return this;
    }

    catch(fn: () => any): this {
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

export interface ITaskResult {
    then(fn: (result: any) => any): this;
    catch(fn: () => any): this;
}