import { __awaiter } from '../../node_modules/tslib/tslib.es6/index.js';
import { EventHandler } from '../../event/EventHandler/index.js';

/**
 * Manager for handling editor documents
 */
class DocumentManager {
    constructor() {
        this.documents = new Map();
        this.activeDocument = null;
        /**
         * Event fired when a document is opened
         */
        this.onDocumentOpened = new EventHandler();
        /**
         * Event fired when a document is closed
         */
        this.onDocumentClosed = new EventHandler();
        /**
         * Event fired when a document is saved
         */
        this.onDocumentSaved = new EventHandler();
        /**
         * Event fired when the active document changes
         */
        this.onActiveDocumentChanged = new EventHandler();
    }
    /**
     * Get a document by id
     */
    getDocument(id) {
        return this.documents.get(id);
    }
    /**
     * Get all documents
     */
    getAllDocuments() {
        return Array.from(this.documents.values());
    }
    /**
     * Get the active document
     */
    getActiveDocument() {
        return this.activeDocument;
    }
    /**
     * Set the active document
     */
    setActiveDocument(id) {
        if (id === null) {
            this.activeDocument;
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
    createDocument(resource, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            // This is a simplified implementation
            // In a real implementation, you would create the appropriate document type based on the resource
            const document = {
                id: `doc-${resource.id}`,
                resource,
                editor,
                open: () => __awaiter(this, void 0, void 0, function* () {
                    yield resource.load();
                    editor.setContent(resource);
                    return true;
                }),
                close: () => {
                    editor.dispose();
                },
                save: () => __awaiter(this, void 0, void 0, function* () {
                    // In a real implementation, you would save the content back to the resource
                    return true;
                }),
                isDirty: () => editor.isDirty()
            };
            this.documents.set(document.id, document);
            const result = yield document.open();
            if (result) {
                this.onDocumentOpened.emmit(document);
                this.setActiveDocument(document.id);
            }
            return result ? document : null;
        });
    }
    /**
     * Close a document
     */
    closeDocument(id) {
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
    saveDocument(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = this.documents.get(id);
            if (!document) {
                return false;
            }
            const result = yield document.save();
            if (result) {
                this.onDocumentSaved.emmit(document);
            }
            return result;
        });
    }
    /**
     * Close all documents
     */
    closeAllDocuments() {
        for (const document of this.documents.values()) {
            document.close();
            this.onDocumentClosed.emmit(document);
        }
        this.documents.clear();
        this.activeDocument = null;
        this.onActiveDocumentChanged.emmit(null);
    }
}

export { DocumentManager };
