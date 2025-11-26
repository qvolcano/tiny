/**
 * Interface for editor implementations
 */
export interface IEditor {
    /**
     * Unique identifier for the editor
     */
    id: string;
    /**
     * Editor type (text, image, etc.)
     */
    type: string;
    /**
     * Initialize the editor
     */
    init(): void;
    /**
     * Dispose editor resources
     */
    dispose(): void;
    /**
     * Set content to be edited
     */
    setContent(content: any): void;
    /**
     * Get current content
     */
    getContent(): any;
    /**
     * Undo last operation
     */
    undo(): boolean;
    /**
     * Redo last undone operation
     */
    redo(): boolean;
    /**
     * Check if editor has unsaved changes
     */
    isDirty(): boolean;
    /**
     * Focus the editor
     */
    focus(): void;
    /**
     * Blur the editor
     */
    blur(): void;
}
