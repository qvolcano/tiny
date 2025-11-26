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
export declare class PluginManager {
    private plugins;
    /**
     * Event fired when a plugin is registered
     */
    readonly onPluginRegistered: EventHandler<IPlugin>;
    /**
     * Event fired when a plugin is unregistered
     */
    readonly onPluginUnregistered: EventHandler<IPlugin>;
    /**
     * Event fired when a plugin is enabled
     */
    readonly onPluginEnabled: EventHandler<IPlugin>;
    /**
     * Event fired when a plugin is disabled
     */
    readonly onPluginDisabled: EventHandler<IPlugin>;
    /**
     * Register a plugin
     */
    registerPlugin(plugin: IPlugin): boolean;
    /**
     * Unregister a plugin
     */
    unregisterPlugin(id: string): boolean;
    /**
     * Get a plugin by id
     */
    getPlugin(id: string): IPlugin | undefined;
    /**
     * Get all plugins
     */
    getAllPlugins(): IPlugin[];
    /**
     * Enable a plugin
     */
    enablePlugin(id: string): Promise<boolean>;
    /**
     * Disable a plugin
     */
    disablePlugin(id: string): Promise<boolean>;
    /**
     * Initialize all plugins
     */
    initializePlugins(): Promise<void>;
    /**
     * Dispose all plugins
     */
    disposePlugins(): void;
}
