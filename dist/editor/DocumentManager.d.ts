import { EventHandler } from '../event/EventHandler';
import { IDocument } from './IDocument';
import { IResource } from './IResource';
import { IEditor } from './IEditor';
/**
 * Manager for handling editor documents
 */
export declare class DocumentManager {
    private documents;
    private activeDocument;
    /**
     * Event fired when a document is opened
     */
    readonly onDocumentOpened: EventHandler<IDocument>;
    /**
     * Event fired when a document is closed
     */
    readonly onDocumentClosed: EventHandler<IDocument>;
    /**
     * Event fired when a document is saved
     */
    readonly onDocumentSaved: EventHandler<IDocument>;
    /**
     * Event fired when the active document changes
     */
    readonly onActiveDocumentChanged: EventHandler<IDocument>;
    /**
     * Get a document by id
     */
    getDocument(id: string): IDocument | undefined;
    /**
     * Get all documents
     */
    getAllDocuments(): IDocument[];
    /**
     * Get the active document
     */
    getActiveDocument(): IDocument | null;
    /**
     * Set the active document
     */
    setActiveDocument(id: string | null): boolean;
    /**
     * Create and open a document for a resource
     */
    createDocument(resource: IResource, editor: IEditor): Promise<IDocument | null>;
    /**
     * Close a document
     */
    closeDocument(id: string): boolean;
    /**
     * Save a document
     */
    saveDocument(id: string): Promise<boolean>;
    /**
     * Close all documents
     */
    closeAllDocuments(): void;
}
