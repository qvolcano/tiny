import { EventHandler } from '../event/EventHandler';

/**
 * Interface for editor events
 */
export interface IEvent {
    /**
     * Event type
     */
    type: string;
    
    /**
     * Event source
     */
    source: any;
    
    /**
     * Event data
     */
    data?: any;
    
    /**
     * Whether the event can be canceled
     */
    cancelable?: boolean;
    
    /**
     * Whether the event is canceled
     */
    canceled?: boolean;
}

/**
 * Manager for handling editor events
 */
export class EventManager {
    private eventHandlers: Map<string, EventHandler<IEvent>> = new Map<string, EventHandler<IEvent>>();
    
    /**
     * Register an event listener
     */
    public on(eventType: string, listener: (event: IEvent) => void, caller?: any): void {
        let handler = this.getOrCreateHandler(eventType);
        handler.on(listener, caller);
    }
    
    /**
     * Register a one-time event listener
     */
    public once(eventType: string, listener: (event: IEvent) => void, caller?: any): void {
        let handler = this.getOrCreateHandler(eventType);
        handler.once(listener, caller);
    }
    
    /**
     * Remove an event listener
     */
    public off(eventType: string, listener: (event: IEvent) => void, caller?: any): boolean {
        const handler = this.eventHandlers.get(eventType);
        if (!handler) {
            return false;
        }
        
        return handler.off(listener, caller);
    }
    
    /**
     * Check if an event listener exists
     */
    public hasListener(eventType: string, listener: (event: IEvent) => void, caller?: any): boolean {
        const handler = this.eventHandlers.get(eventType);
        if (!handler) {
            return false;
        }
        
        return handler.has(listener, caller);
    }
    
    /**
     * Emit an event
     */
    public emit(event: IEvent): boolean {
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
    public clearListeners(eventType?: string): void {
        if (eventType) {
            this.eventHandlers.delete(eventType);
        } else {
            this.eventHandlers.clear();
        }
    }
    
    /**
     * Get or create an event handler for a specific event type
     */
    private getOrCreateHandler(eventType: string): EventHandler<IEvent> {
        let handler = this.eventHandlers.get(eventType);
        if (!handler) {
            handler = new EventHandler<IEvent>();
            this.eventHandlers.set(eventType, handler);
        }
        return handler;
    }
}