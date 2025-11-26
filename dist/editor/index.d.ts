import { E as EventHandler } from '../EventHandler-8c6f33da.js';

/**
 * Interface for editor services
 */
interface IService {
    /**
     * Unique identifier for the service
     */
    id: string;
    /**
     * Service name
     */
    name: string;
    /**
     * Initialize the service
     */
    init(): Promise<boolean>;
    /**
     * Dispose service resources
     */
    dispose(): void;
    /**
     * Check if service is running
     */
    isRunning(): boolean;
}
/**
 * Manager for handling editor services
 */
declare class ServiceManager {
    private services;
    /**
     * Event fired when a service is registered
     */
    readonly onServiceRegistered: EventHandler<IService>;
    /**
     * Event fired when a service is started
     */
    readonly onServiceStarted: EventHandler<IService>;
    /**
     * Event fired when a service is stopped
     */
    readonly onServiceStopped: EventHandler<IService>;
    /**
     * Register a service
     */
    registerService(service: IService): boolean;
    /**
     * Unregister a service
     */
    unregisterService(id: string): boolean;
    /**
     * Get a service by id
     */
    getService<T extends IService>(id: string): T | undefined;
    /**
     * Start a service
     */
    startService(id: string): Promise<boolean>;
    /**
     * Stop a service
     */
    stopService(id: string): boolean;
    /**
     * Start all services
     */
    startAllServices(): Promise<void>;
    /**
     * Stop all services
     */
    stopAllServices(): void;
}

/**
 * 资源加载器接口
 */
interface IResourceLoader {
    /**
     * 加载资源
     * @param url 资源路径
     * @returns 加载的资源
     */
    load(url: string): Promise<any>;
    /**
     * 释放资源
     * @param resource 要释放的资源
     */
    release?(resource: any): void;
    /**
     * 获取该加载器支持的资源类型
     */
    getResourceType(): string;
}
/**
 * 资源管理器
 * 轻量级的资源管理中间层，负责资源的生命周期管理和基础事件通知
 */
declare class ResourceManager {
    private resources;
    private loaders;
    readonly onResourceLoaded: EventHandler<{
        url: string;
        resource: any;
    }>;
    readonly onResourceError: EventHandler<{
        url: string;
        error: any;
    }>;
    /**
     * 注册资源加载器
     * @param loader 资源加载器
     */
    registerLoader(loader: IResourceLoader): void;
    /**
     * 加载资源
     * @param url 资源URL
     * @param type 资源类型
     */
    load(url: string, type: string): Promise<any>;
    /**
     * 释放资源
     * @param url 资源URL
     */
    release(url: string): void;
    /**
     * 预加载资源
     * @param urls 资源URL数组
     * @param type 资源类型
     */
    preload(urls: string[], type: string): Promise<void>;
    /**
     * 获取已加载的资源
     * @param url 资源URL
     */
    get(url: string): any | undefined;
    /**
     * 检查资源是否已加载
     * @param url 资源URL
     */
    isLoaded(url: string): boolean;
    /**
     * 清理所有资源
     */
    clear(): void;
}

interface ICommand {
    id: string;
    name: string;
    execute(...args: any[]): boolean;
    canExecute(): boolean;
}
/**
 * 基础命令管理器，只负责命令的注册和执行
 */
declare class CommandManager {
    private commands;
    readonly onCommandRegistered: EventHandler<ICommand>;
    readonly onCommandExecuted: EventHandler<ICommand>;
    registerCommand(command: ICommand): boolean;
    unregisterCommand(id: string): boolean;
    getCommand(id: string): ICommand | undefined;
    executeCommand(id: string, ...args: any[]): boolean;
    executeWithResult(id: string, ...args: any[]): Promise<{
        success: boolean;
        error?: any;
    }>;
}

/**
 * Interface for editor events
 */
interface IEvent {
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
declare class EventManager {
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

/**
 * Interface for editor implementations
 */
interface IEditor {
    /**
     * Unique identifier for the editor
     */
    id: string;
    /**
     * Editor type (text, image, etc.)
     */
    type: string;
    /**
     * Initialize the editor
     */
    init(): void;
    /**
     * Dispose editor resources
     */
    dispose(): void;
    /**
     * Set content to be edited
     */
    setContent(content: any): void;
    /**
     * Get current content
     */
    getContent(): any;
    /**
     * Undo last operation
     */
    undo(): boolean;
    /**
     * Redo last undone operation
     */
    redo(): boolean;
    /**
     * Check if editor has unsaved changes
     */
    isDirty(): boolean;
    /**
     * Focus the editor
     */
    focus(): void;
    /**
     * Blur the editor
     */
    blur(): void;
}

/**
 * Interface for resources managed by ResourceManager
 */
interface IResource {
    /**
     * Unique identifier for the resource
     */
    id: string;
    /**
     * Resource type
     */
    type: string;
    /**
     * Resource path or location
     */
    path: string;
    /**
     * Load the resource
     */
    load(): Promise<boolean>;
    /**
     * Unload the resource
     */
    unload(): void;
    /**
     * Check if resource is loaded
     */
    isLoaded(): boolean;
}

/**
 * Interface for document that wraps a resource
 */
interface IDocument {
    /**
     * Unique identifier for the document
     */
    id: string;
    /**
     * The resource this document wraps
     */
    resource: IResource;
    /**
     * The editor associated with this document
     */
    editor: IEditor;
    /**
     * Open the document
     */
    open(): Promise<boolean>;
    /**
     * Close the document
     */
    close(): void;
    /**
     * Save the document
     */
    save(): Promise<boolean>;
    /**
     * Check if document has unsaved changes
     */
    isDirty(): boolean;
}

/**
 * Manager for handling editor documents
 */
declare class DocumentManager {
    private documents;
    private activeDocument;
    /**
     * Event fired when a document is opened
     */
    readonly onDocumentOpened: EventHandler<IDocument>;
    /**
     * Event fired when a document is closed
     */
    readonly onDocumentClosed: EventHandler<IDocument>;
    /**
     * Event fired when a document is saved
     */
    readonly onDocumentSaved: EventHandler<IDocument>;
    /**
     * Event fired when the active document changes
     */
    readonly onActiveDocumentChanged: EventHandler<IDocument>;
    /**
     * Get a document by id
     */
    getDocument(id: string): IDocument | undefined;
    /**
     * Get all documents
     */
    getAllDocuments(): IDocument[];
    /**
     * Get the active document
     */
    getActiveDocument(): IDocument | null;
    /**
     * Set the active document
     */
    setActiveDocument(id: string | null): boolean;
    /**
     * Create and open a document for a resource
     */
    createDocument(resource: IResource, editor: IEditor): Promise<IDocument | null>;
    /**
     * Close a document
     */
    closeDocument(id: string): boolean;
    /**
     * Save a document
     */
    saveDocument(id: string): Promise<boolean>;
    /**
     * Close all documents
     */
    closeAllDocuments(): void;
}

/**
 * Interface for editor triggers
 */
interface ITrigger {
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
declare class TriggerManager {
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

/**
 * Interface for editor plugins
 */
interface IPlugin {
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
declare class PluginManager {
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

/**
 * Editor module for handling editing functionality
 */

declare class ViewService implements IService {
    readonly id = "view";
    readonly name = "View Service";
    private running;
    init(): Promise<boolean>;
    dispose(): void;
    isRunning(): boolean;
}
/**
 * Main Editor class that integrates all manager components
 */
declare class Editor {
    readonly resourceManager: ResourceManager;
    readonly commandManager: CommandManager;
    readonly serviceManager: ServiceManager;
    readonly eventManager: EventManager;
    readonly documentManager: DocumentManager;
    readonly triggerManager: TriggerManager;
    readonly pluginManager: PluginManager;
    constructor();
    /**
     * Initialize the editor
     */
    init(): Promise<void>;
    /**
     * Dispose editor resources
     */
    dispose(): void;
}

export { Editor, ViewService };
