'use strict';

var tslib_es6 = require('../../node_modules/tslib/tslib.es6/index.cjs.js');
var EventHandler = require('../../event/EventHandler/index.cjs.js');

/**
 * Manager for handling editor plugins
 */
class PluginManager {
    constructor() {
        this.plugins = new Map();
        /**
         * Event fired when a plugin is registered
         */
        this.onPluginRegistered = new EventHandler.EventHandler();
        /**
         * Event fired when a plugin is unregistered
         */
        this.onPluginUnregistered = new EventHandler.EventHandler();
        /**
         * Event fired when a plugin is enabled
         */
        this.onPluginEnabled = new EventHandler.EventHandler();
        /**
         * Event fired when a plugin is disabled
         */
        this.onPluginDisabled = new EventHandler.EventHandler();
    }
    /**
     * Register a plugin
     */
    registerPlugin(plugin) {
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
    unregisterPlugin(id) {
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
    getPlugin(id) {
        return this.plugins.get(id);
    }
    /**
     * Get all plugins
     */
    getAllPlugins() {
        return Array.from(this.plugins.values());
    }
    /**
     * Enable a plugin
     */
    enablePlugin(id) {
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
            const plugin = this.plugins.get(id);
            if (!plugin || plugin.isEnabled()) {
                return false;
            }
            const result = yield plugin.enable();
            if (result) {
                this.onPluginEnabled.emmit(plugin);
            }
            return result;
        });
    }
    /**
     * Disable a plugin
     */
    disablePlugin(id) {
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
            const plugin = this.plugins.get(id);
            if (!plugin || !plugin.isEnabled()) {
                return false;
            }
            const result = yield plugin.disable();
            if (result) {
                this.onPluginDisabled.emmit(plugin);
            }
            return result;
        });
    }
    /**
     * Initialize all plugins
     */
    initializePlugins() {
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
            for (const plugin of this.plugins.values()) {
                yield plugin.init();
            }
        });
    }
    /**
     * Dispose all plugins
     */
    disposePlugins() {
        for (const plugin of this.plugins.values()) {
            if (plugin.isEnabled()) {
                plugin.disable();
                this.onPluginDisabled.emmit(plugin);
            }
            plugin.dispose();
        }
    }
}

exports.PluginManager = PluginManager;
