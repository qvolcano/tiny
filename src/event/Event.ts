export class Event {
    $setTarget(currentTarget: any) {
        this.$currentTarget = currentTarget
    }
    public type: string = "";
    public data: any;
    public target: any;
    $currentTarget: any;
}