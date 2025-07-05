import { EventHandler } from '../event/EventHandler';
import { IDocument } from './IDocument';
import { IResource } from './IResource';
import { IEditor } from './IEditor';

/**
 * Manager for handling editor documents
 */
export class DocumentManager {
    private documents: Map<string, IDocument> = new Map<string, IDocument>();
    private activeDocument: IDocument | null = null;
    
    /**
     * Event fired when a document is opened
     */
    public readonly onDocumentOpened = new EventHandler<IDocument>();
    
    /**
     * Event fired when a document is closed
     */
    public readonly onDocumentClosed = new EventHandler<IDocument>();
    
    /**
     * Event fired when a document is saved
     */
    public readonly onDocumentSaved = new EventHandler<IDocument>();
    
    /**
     * Event fired when the active document changes
     */
    public readonly onActiveDocumentChanged = new EventHandler<IDocument | null>();
    
    /**
     * Get a document by id
     */
    public getDocument(id: string): IDocument | undefined {
        return this.documents.get(id);
    }
    
    /**
     * Get all documents
     */
    public getAllDocuments(): IDocument[] {
        return Array.from(this.documents.values());
    }
    
    /**
     * Get the active document
     */
    public getActiveDocument(): IDocument | null {
        return this.activeDocument;
    }
    
    /**
     * Set the active document
     */
    public setActiveDocument(id: string | null): boolean {
        if (id === null) {
            const oldActive = this.activeDocument;
            this.activeDocument = null;
            this.onActiveDocumentChanged.emmit(null);
            return true;
        }
        
        const document = this.documents.get(id);
        if (!document) {
            return false;
        }
        
        if (this.activeDocument !== document) {
            this.activeDocument = document;
            this.onActiveDocumentChanged.emmit(document);
        }
        return true;
    }
    
    /**
     * Create and open a document for a resource
     */
    public async createDocument(resource: IResource, editor: IEditor): Promise<IDocument | null> {
        // This is a simplified implementation
        // In a real implementation, you would create the appropriate document type based on the resource
        const document: IDocument = {
            id: `doc-${resource.id}`,
            resource,
            editor,
            open: async () => {
                await resource.load();
                editor.setContent(resource);
                return true;
            },
            close: () => {
                editor.dispose();
            },
            save: async () => {
                // In a real implementation, you would save the content back to the resource
                return true;
            },
            isDirty: () => editor.isDirty()
        };
        
        this.documents.set(document.id, document);
        const result = await document.open();
        if (result) {
            this.onDocumentOpened.emmit(document);
            this.setActiveDocument(document.id);
        }
        return result ? document : null;
    }
    
    /**
     * Close a document
     */
    public closeDocument(id: string): boolean {
        const document = this.documents.get(id);
        if (!document) {
            return false;
        }
        
        document.close();
        this.documents.delete(id);
        
        if (this.activeDocument === document) {
            this.activeDocument = null;
            this.onActiveDocumentChanged.emmit(null);
        }
        
        this.onDocumentClosed.emmit(document);
        return true;
    }
    
    /**
     * Save a document
     */
    public async saveDocument(id: string): Promise<boolean> {
        const document = this.documents.get(id);
        if (!document) {
            return false;
        }
        
        const result = await document.save();
        if (result) {
            this.onDocumentSaved.emmit(document);
        }
        return result;
    }
    
    /**
     * Close all documents
     */
    public closeAllDocuments(): void {
        for (const document of this.documents.values()) {
            document.close();
            this.onDocumentClosed.emmit(document);
        }
        
        this.documents.clear();
        this.activeDocument = null;
        this.onActiveDocumentChanged.emmit(null);
    }
}