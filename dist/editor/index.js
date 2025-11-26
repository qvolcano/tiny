import { __awaiter } from '../node_modules/tslib/tslib.es6/index.js';
import { ResourceManager } from './ResourceManager/index.js';
import { CommandManager } from './CommandManager/index.js';
import { ServiceManager } from './ServiceManager/index.js';
import { EventManager } from './EventManager/index.js';
import { DocumentManager } from './DocumentManager/index.js';
import { TriggerManager } from './TriggerManager/index.js';
import { PluginManager } from './PluginManager/index.js';

/**
 * Editor module for handling editing functionality
 */
class ViewService {
    constructor() {
        this.id = 'view';
        this.name = 'View Service';
        this.running = false;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.running = true;
            return true;
        });
    }
    dispose() {
        this.running = false;
    }
    isRunning() {
        return this.running;
    }
}
/**
 * Main Editor class that integrates all manager components
 */
class Editor {
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Initialize services
            const viewService = new ViewService();
            this.serviceManager.registerService(viewService);
            yield this.serviceManager.startService(viewService.id);
            // Initialize plugins
            yield this.pluginManager.initializePlugins();
        });
    }
    /**
     * Dispose editor resources
     */
    dispose() {
        // Close all documents
        this.documentManager.closeAllDocuments();
        // Dispose plugins
        this.pluginManager.disposePlugins();
        // Stop all services
        this.serviceManager.stopAllServices();
    }
}

export { Editor, ViewService };
