class Event {
    constructor() {
        this.type = "";
    }
    $setTarget(currentTarget) {
        this.$currentTarget = currentTarget;
    }
}

export { Event };
