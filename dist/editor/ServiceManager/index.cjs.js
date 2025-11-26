'use strict';

var tslib_es6 = require('../../node_modules/tslib/tslib.es6/index.cjs.js');
var EventHandler = require('../../event/EventHandler/index.cjs.js');

/**
 * Manager for handling editor services
 */
class ServiceManager {
    constructor() {
        this.services = new Map();
        /**
         * Event fired when a service is registered
         */
        this.onServiceRegistered = new EventHandler.EventHandler();
        /**
         * Event fired when a service is started
         */
        this.onServiceStarted = new EventHandler.EventHandler();
        /**
         * Event fired when a service is stopped
         */
        this.onServiceStopped = new EventHandler.EventHandler();
    }
    /**
     * Register a service
     */
    registerService(service) {
        if (this.services.has(service.id)) {
            return false;
        }
        this.services.set(service.id, service);
        this.onServiceRegistered.emmit(service);
        return true;
    }
    /**
     * Unregister a service
     */
    unregisterService(id) {
        if (!this.services.has(id)) {
            return false;
        }
        const service = this.services.get(id);
        if (service.isRunning()) {
            service.dispose();
            this.onServiceStopped.emmit(service);
        }
        this.services.delete(id);
        return true;
    }
    /**
     * Get a service by id
     */
    getService(id) {
        return this.services.get(id);
    }
    /**
     * Start a service
     */
    startService(id) {
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
            const service = this.services.get(id);
            if (!service || service.isRunning()) {
                return false;
            }
            const result = yield service.init();
            if (result) {
                this.onServiceStarted.emmit(service);
            }
            return result;
        });
    }
    /**
     * Stop a service
     */
    stopService(id) {
        const service = this.services.get(id);
        if (!service || !service.isRunning()) {
            return false;
        }
        service.dispose();
        this.onServiceStopped.emmit(service);
        return true;
    }
    /**
     * Start all services
     */
    startAllServices() {
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
            for (const service of this.services.values()) {
                if (!service.isRunning()) {
                    const result = yield service.init();
                    if (result) {
                        this.onServiceStarted.emmit(service);
                    }
                }
            }
        });
    }
    /**
     * Stop all services
     */
    stopAllServices() {
        for (const service of this.services.values()) {
            if (service.isRunning()) {
                service.dispose();
                this.onServiceStopped.emmit(service);
            }
        }
    }
}

exports.ServiceManager = ServiceManager;
