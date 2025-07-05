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
export class TriggerManager {
    private triggers: Map<string, ITrigger> = new Map<string, ITrigger>();
    private triggersByType: Map<string, ITrigger[]> = new Map<string, ITrigger[]>();
    
    /**
     * Event fired when a trigger is registered
     */
    public readonly onTriggerRegistered = new EventHandler<ITrigger>();
    
    /**
     * Event fired when a trigger is unregistered
     */
    public readonly onTriggerUnregistered = new EventHandler<ITrigger>();
    
    /**
     * Event fired when a trigger is executed
     */
    public readonly onTriggerExecuted = new EventHandler<ITrigger>();
    
    /**
     * Register a trigger
     */
    public registerTrigger(trigger: ITrigger): boolean {
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
    public unregisterTrigger(id: string): boolean {
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
    public getTrigger(id: string): ITrigger | undefined {
        return this.triggers.get(id);
    }
    
    /**
     * Get triggers by type
     */
    public getTriggersByType(type: string): ITrigger[] {
        return this.triggersByType.get(type) || [];
    }
    
    /**
     * Enable a trigger
     */
    public enableTrigger(id: string): boolean {
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
    public disableTrigger(id: string): boolean {
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
    public executeTriggers(type: string, context: any): void {
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
    public clearTriggers(): void {
        this.triggers.clear();
        this.triggersByType.clear();
    }
}