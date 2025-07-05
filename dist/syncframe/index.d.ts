export declare class FrameStack {
    private frames;
    pushFrame(frame: FrameData): void;
    getFrame(index: number): FrameData;
}
export type FrameData = {
    time: number;
    data: any;
};
export declare class SyncFrame {
}
export declare class SyncManager {
}
