/**
 * Editor module for handling editing functionality
 */


import { IDocument } from './IDocument';
import { IEditor } from './IEditor';
import { ICommand } from './CommandManager';
import { IService } from './ServiceManager';
import { IEvent } from './EventManager';
import { ITrigger } from './TriggerManager';
import { IPlugin } from './PluginManager';

// Export managers
import { ResourceManager } from './ResourceManager';
import { CommandManager } from './CommandManager';
import { ServiceManager } from './ServiceManager';
import { EventManager } from './EventManager';
import { DocumentManager } from './DocumentManager';
import { TriggerManager } from './TriggerManager';
import { PluginManager } from './PluginManager';


export class ViewService implements IService{
    public readonly id = 'view';
    public readonly name = 'View Service';
    private running = false;

    async init(): Promise<boolean> {
        this.running = true;
        return true;
    }

    dispose(): void {
        this.running = false;
    }

    isRunning(): boolean {
        return this.running;
    }
}
/**
 * Main Editor class that integrates all manager components
 */
export class Editor {
    // Manager instances
    public readonly resourceManager: ResourceManager;
    public readonly commandManager: CommandManager;
    public readonly serviceManager: ServiceManager;
    public readonly eventManager: EventManager;
    public readonly documentManager: DocumentManager;
    public readonly triggerManager: TriggerManager;
    public readonly pluginManager: PluginManager;
    
    constructor() {
        // Initialize all managers
        this.resourceManager = new ResourceManager();
        this.commandManager = new CommandManager();
        this.serviceManager = new ServiceManager();
        this.eventManager = new EventManager();
        this.documentManager = new DocumentManager();
        this.triggerManager = new TriggerManager();
        this.pluginManager = new PluginManager();
    }
    
    /**
     * Initialize the editor
     */
    public async init(): Promise<void> {
        // Initialize services
        const viewService = new ViewService();
        this.serviceManager.registerService(viewService);
        await this.serviceManager.startService(viewService.id);
        // Initialize plugins
        await this.pluginManager.initializePlugins();
    }
    
    /**
     * Dispose editor resources
     */
    public dispose(): void {
        // Close all documents
        this.documentManager.closeAllDocuments();
        
        // Dispose plugins
        this.pluginManager.disposePlugins();
        
        // Stop all services
        this.serviceManager.stopAllServices();
    }
}
