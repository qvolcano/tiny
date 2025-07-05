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
export class ServiceManager {
    private services: Map<string, IService> = new Map<string, IService>();
    
    /**
     * Event fired when a service is registered
     */
    public readonly onServiceRegistered = new EventHandler<IService>();
    
    /**
     * Event fired when a service is started
     */
    public readonly onServiceStarted = new EventHandler<IService>();
    
    /**
     * Event fired when a service is stopped
     */
    public readonly onServiceStopped = new EventHandler<IService>();
    
    /**
     * Register a service
     */
    public registerService(service: IService): boolean {
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
    public unregisterService(id: string): boolean {
        if (!this.services.has(id)) {
            return false;
        }
        
        const service = this.services.get(id)!;
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
    public getService<T extends IService>(id: string): T | undefined {
        return this.services.get(id) as T | undefined;
    }
    
    /**
     * Start a service
     */
    public async startService(id: string): Promise<boolean> {
        const service = this.services.get(id);
        if (!service || service.isRunning()) {
            return false;
        }
        
        const result = await service.init();
        if (result) {
            this.onServiceStarted.emmit(service);
        }
        return result;
    }
    
    /**
     * Stop a service
     */
    public stopService(id: string): boolean {
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
    public async startAllServices(): Promise<void> {
        for (const service of this.services.values()) {
            if (!service.isRunning()) {
                const result = await service.init();
                if (result) {
                    this.onServiceStarted.emmit(service);
                }
            }
        }
    }
    
    /**
     * Stop all services
     */
    public stopAllServices(): void {
        for (const service of this.services.values()) {
            if (service.isRunning()) {
                service.dispose();
                this.onServiceStopped.emmit(service);
            }
        }
    }
}