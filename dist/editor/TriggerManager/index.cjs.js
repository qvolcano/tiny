'use strict';

var EventHandler = require('../../event/EventHandler/index.cjs.js');

/**
 * Manager for handling editor triggers
 */
class TriggerManager {
    constructor() {
        this.triggers = new Map();
        this.triggersByType = new Map();
        /**
         * Event fired when a trigger is registered
         */
        this.onTriggerRegistered = new EventHandler.EventHandler();
        /**
         * Event fired when a trigger is unregistered
         */
        this.onTriggerUnregistered = new EventHandler.EventHandler();
        /**
         * Event fired when a trigger is executed
         */
        this.onTriggerExecuted = new EventHandler.EventHandler();
    }
    /**
     * Register a trigger
     */
    registerTrigger(trigger) {
        if (this.triggers.has(trigger.id)) {
            return false;
        }
        this.triggers.set(trigger.id, trigger);
        // Add to type map
        let typeList = this.triggersByType.get(trigger.type);
        if (!typeList) {
            typeList = [];
            this.triggersByType.set(trigger.type, typeList);
        }
        // Insert based on priority
        const priority = trigger.priority || 0;
        let inserted = false;
        for (let i = 0; i < typeList.length; i++) {
            const existingPriority = typeList[i].priority || 0;
            if (priority > existingPriority) {
                typeList.splice(i, 0, trigger);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            typeList.push(trigger);
        }
        this.onTriggerRegistered.emmit(trigger);
        return true;
    }
    /**
     * Unregister a trigger
     */
    unregisterTrigger(id) {
        const trigger = this.triggers.get(id);
        if (!trigger) {
            return false;
        }
        this.triggers.delete(id);
        // Remove from type map
        const typeList = this.triggersByType.get(trigger.type);
        if (typeList) {
            const index = typeList.findIndex(t => t.id === id);
            if (index !== -1) {
                typeList.splice(index, 1);
            }
            if (typeList.length === 0) {
                this.triggersByType.delete(trigger.type);
            }
        }
        this.onTriggerUnregistered.emmit(trigger);
        return true;
    }
    /**
     * Get a trigger by id
     */
    getTrigger(id) {
        return this.triggers.get(id);
    }
    /**
     * Get triggers by type
     */
    getTriggersByType(type) {
        return this.triggersByType.get(type) || [];
    }
    /**
     * Enable a trigger
     */
    enableTrigger(id) {
        const trigger = this.triggers.get(id);
        if (!trigger) {
            return false;
        }
        trigger.enabled = true;
        return true;
    }
    /**
     * Disable a trigger
     */
    disableTrigger(id) {
        const trigger = this.triggers.get(id);
        if (!trigger) {
            return false;
        }
        trigger.enabled = false;
        return true;
    }
    /**
     * Execute triggers of a specific type with the given context
     */
    executeTriggers(type, context) {
        const triggers = this.triggersByType.get(type);
        if (!triggers) {
            return;
        }
        for (const trigger of triggers) {
            if (trigger.enabled && trigger.condition(context)) {
                trigger.action(context);
                this.onTriggerExecuted.emmit(trigger);
            }
        }
    }
    /**
     * Clear all triggers
     */
    clearTriggers() {
        this.triggers.clear();
        this.triggersByType.clear();
    }
}

exports.TriggerManager = TriggerManager;
