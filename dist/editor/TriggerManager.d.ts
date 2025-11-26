import { EventHandler } from '../event/EventHandler';
/**
 * Interface for editor triggers
 */
export interface ITrigger {
    /**
     * Unique identifier for the trigger
     */
    id: string;
    /**
     * Trigger type
     */
    type: string;
    /**
     * Condition for the trigger to fire
     */
    condition: (context: any) => boolean;
    /**
     * Action to execute when trigger fires
     */
    action: (context: any) => void;
    /**
     * Priority of the trigger (higher numbers execute first)
     */
    priority?: number;
    /**
     * Whether the trigger is enabled
     */
    enabled: boolean;
}
/**
 * Manager for handling editor triggers
 */
export declare class TriggerManager {
    private triggers;
    private triggersByType;
    /**
     * Event fired when a trigger is registered
     */
    readonly onTriggerRegistered: EventHandler<ITrigger>;
    /**
     * Event fired when a trigger is unregistered
     */
    readonly onTriggerUnregistered: EventHandler<ITrigger>;
    /**
     * Event fired when a trigger is executed
     */
    readonly onTriggerExecuted: EventHandler<ITrigger>;
    /**
     * Register a trigger
     */
    registerTrigger(trigger: ITrigger): boolean;
    /**
     * Unregister a trigger
     */
    unregisterTrigger(id: string): boolean;
    /**
     * Get a trigger by id
     */
    getTrigger(id: string): ITrigger | undefined;
    /**
     * Get triggers by type
     */
    getTriggersByType(type: string): ITrigger[];
    /**
     * Enable a trigger
     */
    enableTrigger(id: string): boolean;
    /**
     * Disable a trigger
     */
    disableTrigger(id: string): boolean;
    /**
     * Execute triggers of a specific type with the given context
     */
    executeTriggers(type: string, context: any): void;
    /**
     * Clear all triggers
     */
    clearTriggers(): void;
}
