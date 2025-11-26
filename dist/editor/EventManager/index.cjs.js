'use strict';

var EventHandler = require('../../event/EventHandler/index.cjs.js');

/**
 * Manager for handling editor events
 */
class EventManager {
    constructor() {
        this.eventHandlers = new Map();
    }
    /**
     * Register an event listener
     */
    on(eventType, listener, caller) {
        let handler = this.getOrCreateHandler(eventType);
        handler.on(listener, caller);
    }
    /**
     * Register a one-time event listener
     */
    once(eventType, listener, caller) {
        let handler = this.getOrCreateHandler(eventType);
        handler.once(listener, caller);
    }
    /**
     * Remove an event listener
     */
    off(eventType, listener, caller) {
        const handler = this.eventHandlers.get(eventType);
        if (!handler) {
            return false;
        }
        return handler.off(listener, caller);
    }
    /**
     * Check if an event listener exists
     */
    hasListener(eventType, listener, caller) {
        const handler = this.eventHandlers.get(eventType);
        if (!handler) {
            return false;
        }
        return handler.has(listener, caller);
    }
    /**
     * Emit an event
     */
    emit(event) {
        const handler = this.eventHandlers.get(event.type);
        if (!handler) {
            return true; // No listeners, event not handled
        }
        handler.emmit(event);
        return !event.canceled;
    }
    /**
     * Clear all event listeners
     */
    clearListeners(eventType) {
        if (eventType) {
            this.eventHandlers.delete(eventType);
        }
        else {
            this.eventHandlers.clear();
        }
    }
    /**
     * Get or create an event handler for a specific event type
     */
    getOrCreateHandler(eventType) {
        let handler = this.eventHandlers.get(eventType);
        if (!handler) {
            handler = new EventHandler.EventHandler();
            this.eventHandlers.set(eventType, handler);
        }
        return handler;
    }
}

exports.EventManager = EventManager;
