class FrameStack {
    constructor() {
        this.frames = [];
    }
    pushFrame(frame) {
        this.frames.push(frame);
    }
    getFrame(index) {
        return this.frames[index];
    }
}
class SyncFrame {
}
class SyncManager {
}

export { FrameStack, SyncFrame, SyncManager };
