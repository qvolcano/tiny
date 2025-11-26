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
export declare class EventManager {
    private eventHandlers;
    /**
     * Register an event listener
     */
    on(eventType: string, listener: (event: IEvent) => void, caller?: any): void;
    /**
     * Register a one-time event listener
     */
    once(eventType: string, listener: (event: IEvent) => void, caller?: any): void;
    /**
     * Remove an event listener
     */
    off(eventType: string, listener: (event: IEvent) => void, caller?: any): boolean;
    /**
     * Check if an event listener exists
     */
    hasListener(eventType: string, listener: (event: IEvent) => void, caller?: any): boolean;
    /**
     * Emit an event
     */
    emit(event: IEvent): boolean;
    /**
     * Clear all event listeners
     */
    clearListeners(eventType?: string): void;
    /**
     * Get or create an event handler for a specific event type
     */
    private getOrCreateHandler;
}
