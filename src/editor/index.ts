/**
 * Editor module for handling editing functionality
 */


// Export interfaces
import { IResource } from './IResource';
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
import { SingletonFactory } from '../collection';


interface Injectable<T>{
    context:T
}

export function Injector<T,K = Object>(context:K){
    return function(constructor:new()=>T){
        let obj = new constructor() as any
        obj.context = context;
        return obj
    }
}


export class ViewService implements IService{
    id: string;
    name: string;
    init(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    dispose(): void {
        throw new Error('Method not implemented.');
    }
    isRunning(): boolean {
        throw new Error('Method not implemented.');
    }
    test(){

    }
}
/**
 * Main Editor class that integrates all manager components
 */
export class Editor {
    // Manager instances
    public readonly resourceManager: ResourceManager;
    public readonly commandManager: CommandManager;
    public readonly serviceManager: SingletonFactory<IService>;
    public readonly eventManager: EventManager;
    public readonly documentManager: DocumentManager;
    public readonly triggerManager: TriggerManager;
    public readonly pluginManager: PluginManager;
    
    constructor() {
        // Initialize all managers
        this.resourceManager = new ResourceManager();
        this.commandManager = new CommandManager();
        this.serviceManager = new SingletonFactory<IService>(true,true,Injector<IService>(this));
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
        this.serviceManager.get(ViewService).
        // Initialize plugins
        await this.pluginManager.initializePlugins();

        this.resourceManager.registerLoader("*", (resource: IResource) => {
            return resource.load();
        });
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