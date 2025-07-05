'use strict';

class Event {
    constructor() {
        this.type = "";
    }
    $setTarget(currentTarget) {
        this.$currentTarget = currentTarget;
    }
}

exports.Event = Event;
