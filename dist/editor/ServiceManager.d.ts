import { EventHandler } from '../event/EventHandler';
/**
 * Interface for editor services
 */
export interface IService {
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
export declare class ServiceManager {
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
