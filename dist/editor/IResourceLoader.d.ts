/**
 * Interface for resource loaders
 */
export interface IResourceLoader {
    /**
     * Load a resource from the given path
     * @param path The path to the resource
     * @param type The type of the resource
     * @param id Optional id for the resource, if not provided, the path will be used
     */
    loadResource(path: string, type: string, id?: string): Promise<any>;
    /**
     * Check if this loader can handle the given resource type
     * @param type The resource type to check
     */
    canHandle(type: string): boolean;
}
