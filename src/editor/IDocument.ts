import { IEditor } from "./IEditor";
import { IResource } from "./IResource";

/**
 * Interface for document that wraps a resource
 */
export interface IDocument {
    /**
     * Unique identifier for the document
     */
    id: string;
    
    /**
     * The resource this document wraps
     */
    resource: IResource; // Will be typed as IResource when imported
    
    /**
     * The editor associated with this document
     */
    editor: IEditor; // Will be typed as IEditor when imported
    
    /**
     * Open the document
     */
    open(): Promise<boolean>;
    
    /**
     * Close the document
     */
    close(): void;
    
    /**
     * Save the document
     */
    save(): Promise<boolean>;
    
    /**
     * Check if document has unsaved changes
     */
    isDirty(): boolean;
}