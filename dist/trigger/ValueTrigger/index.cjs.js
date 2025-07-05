'use strict';

var LinkNode = require('../../collection/LinkNode/index.cjs.js');

class ValueTrigger {
    constructor() {
        this.TRIGGER_ID = 0;
        this.trigger_list = {};
        this.valueStack = {};
    }
    addTrigger(conditions, check) {
        let trigger_id = this.TRIGGER_ID++;
        let trigger_mask = 0xffffff;
        let nodes = [];
        for (let i = 0; i < conditions.length; i++) {
            let valueStack = this.valueStack[conditions[i].key];
            trigger_mask ^= 1 << i;
            let node = new LinkNode.LinkNode([trigger_id, i]);
            if (valueStack.conditions.next) {
                valueStack.conditions.next.prev = node;
                node.next = valueStack.conditions.next;
            }
            node.prev = valueStack.conditions;
            valueStack.conditions.next = node;
            nodes.push(node);
        }
        this.trigger_list[trigger_id] = { mask: trigger_mask, conditions: conditions, conditionodes: nodes };
        check && this.checkTrigger(trigger_id);
        return trigger_id;
    }
    removeTrigger(id) {
        for (let i of this.trigger_list[id].conditions) {
            if (i.prev) {
                i.prev.next = i.next;
            }
        }
        delete this.trigger_list[id];
    }
    registerValue(key, defaultValue = 0, comparator = ValueTrigger.NumberComparator) {
        this.valueStack[key] = { value: defaultValue, comparator: comparator, conditions: new LinkNode.LinkNode };
    }
    setValue(key, value) {
        let valueStack = this.valueStack[key];
        valueStack.value = value;
        let node = valueStack.conditions.next;
        while (node && node.value) {
            let trigger_id = node.value[0];
            let condition = this.trigger_list[trigger_id].conditions[node.value[1]];
            this.setTriggerMask(trigger_id, valueStack.comparator(value, condition.value) << node.value[1] != 0, node.value[1]);
            node = node.next;
        }
    }
    setTriggerMask(id, pass, index) {
        let trigger = this.trigger_list[id];
        let oldMask = trigger.mask;
        let newMask = 0;
        if (pass) {
            newMask = oldMask | (1 << (index));
        }
        else {
            newMask = oldMask & ~(1 << (index));
        }
        trigger.mask = newMask;
        if (oldMask != newMask && (oldMask == 0xffffff || newMask == 0xffffff)) {
            this.trigger(id, newMask == 0xffffff);
        }
    }
    checkTrigger(id) {
        let trigger = this.trigger_list[id];
        let conditions = trigger.conditions;
        for (let i = 0; i < conditions.length; i++) {
            let valueStack = this.valueStack[conditions[i].key];
            this.setTriggerMask(id, valueStack.comparator(valueStack.value, conditions[i].value) << i != 0, i);
        }
    }
    trigger(id, pass) {
        this.onTrigger && this.onTrigger(id, pass);
    }
    static NumberComparator(a, b) {
        return a == b ? 1 : 0;
    }
}

exports.ValueTrigger = ValueTrigger;
