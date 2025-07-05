import { EventHandler } from '../event/EventHandler';

/**
 * Interface for editor plugins
 */
export interface IPlugin {
    /**
     * Unique identifier for the plugin
     */
    id: string;
    
    /**
     * Plugin name
     */
    name: string;
    
    /**
     * Plugin version
     */
    version: string;
    
    /**
     * Initialize the plugin
     */
    init(): Promise<boolean>;
    
    /**
     * Dispose plugin resources
     */
    dispose(): void;
    
    /**
     * Check if plugin is enabled
     */
    isEnabled(): boolean;
    
    /**
     * Enable the plugin
     */
    enable(): Promise<boolean>;
    
    /**
     * Disable the plugin
     */
    disable(): Promise<boolean>;
}

/**
 * Manager for handling editor plugins
 */
export class PluginManager {
    private plugins: Map<string, IPlugin> = new Map<string, IPlugin>();
    
    /**
     * Event fired when a plugin is registered
     */
    public readonly onPluginRegistered = new EventHandler<IPlugin>();
    
    /**
     * Event fired when a plugin is unregistered
     */
    public readonly onPluginUnregistered = new EventHandler<IPlugin>();
    
    /**
     * Event fired when a plugin is enabled
     */
    public readonly onPluginEnabled = new EventHandler<IPlugin>();
    
    /**
     * Event fired when a plugin is disabled
     */
    public readonly onPluginDisabled = new EventHandler<IPlugin>();
    
    /**
     * Register a plugin
     */
    public registerPlugin(plugin: IPlugin): boolean {
        if (this.plugins.has(plugin.id)) {
            return false;
        }
        
        this.plugins.set(plugin.id, plugin);
        this.onPluginRegistered.emmit(plugin);
        return true;
    }
    
    /**
     * Unregister a plugin
     */
    public unregisterPlugin(id: string): boolean {
        const plugin = this.plugins.get(id);
        if (!plugin) {
            return false;
        }
        
        if (plugin.isEnabled()) {
            plugin.disable();
            this.onPluginDisabled.emmit(plugin);
        }
        
        plugin.dispose();
        this.plugins.delete(id);
        this.onPluginUnregistered.emmit(plugin);
        return true;
    }
    
    /**
     * Get a plugin by id
     */
    public getPlugin(id: string): IPlugin | undefined {
        return this.plugins.get(id);
    }
    
    /**
     * Get all plugins
     */
    public getAllPlugins(): IPlugin[] {
        return Array.from(this.plugins.values());
    }
    
    /**
     * Enable a plugin
     */
    public async enablePlugin(id: string): Promise<boolean> {
        const plugin = this.plugins.get(id);
        if (!plugin || plugin.isEnabled()) {
            return false;
        }
        
        const result = await plugin.enable();
        if (result) {
            this.onPluginEnabled.emmit(plugin);
        }
        return result;
    }
    
    /**
     * Disable a plugin
     */
    public async disablePlugin(id: string): Promise<boolean> {
        const plugin = this.plugins.get(id);
        if (!plugin || !plugin.isEnabled()) {
            return false;
        }
        
        const result = await plugin.disable();
        if (result) {
            this.onPluginDisabled.emmit(plugin);
        }
        return result;
    }
    
    /**
     * Initialize all plugins
     */
    public async initializePlugins(): Promise<void> {
        for (const plugin of this.plugins.values()) {
            await plugin.init();
        }
    }
    
    /**
     * Dispose all plugins
     */
    public disposePlugins(): void {
        for (const plugin of this.plugins.values()) {
            if (plugin.isEnabled()) {
                plugin.disable();
                this.onPluginDisabled.emmit(plugin);
            }
            plugin.dispose();
        }
    }
}