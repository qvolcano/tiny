'use strict';

var tslib_es6 = require('../node_modules/tslib/tslib.es6/index.cjs.js');
var ResourceManager = require('./ResourceManager/index.cjs.js');
var CommandManager = require('./CommandManager/index.cjs.js');
var ServiceManager = require('./ServiceManager/index.cjs.js');
var EventManager = require('./EventManager/index.cjs.js');
var DocumentManager = require('./DocumentManager/index.cjs.js');
var TriggerManager = require('./TriggerManager/index.cjs.js');
var PluginManager = require('./PluginManager/index.cjs.js');

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
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
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
        this.resourceManager = new ResourceManager.ResourceManager();
        this.commandManager = new CommandManager.CommandManager();
        this.serviceManager = new ServiceManager.ServiceManager();
        this.eventManager = new EventManager.EventManager();
        this.documentManager = new DocumentManager.DocumentManager();
        this.triggerManager = new TriggerManager.TriggerManager();
        this.pluginManager = new PluginManager.PluginManager();
    }
    /**
     * Initialize the editor
     */
    init() {
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
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

exports.Editor = Editor;
exports.ViewService = ViewService;
