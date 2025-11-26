declare class FrameStack {
    private frames;
    pushFrame(frame: FrameData): void;
    getFrame(index: number): FrameData;
}
type FrameData = {
    time: number;
    data: any;
};
declare class SyncFrame {
}
declare class SyncManager {
}

export { FrameData, FrameStack, SyncFrame, SyncManager };
