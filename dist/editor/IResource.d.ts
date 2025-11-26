/**
 * Interface for resources managed by ResourceManager
 */
export interface IResource {
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
