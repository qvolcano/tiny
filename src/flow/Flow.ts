export class Flow {
    private items: Function[] = []
    public add(item: Function) {

    }

    public remove(item: Function) {

    }

    public call(...args:any) {
        for (let i of this.items) {
            i(...args);
        }
    }
}