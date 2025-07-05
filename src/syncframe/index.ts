export class FrameStack {
    private frames: FrameData[] = [];
    pushFrame(frame: FrameData) {
        this.frames.push(frame);
    }

    getFrame(index: number): FrameData {
        return this.frames[index];
    }
}

export type FrameData = {
    time: number;
    data: any;
}

export class SyncFrame {

}

export class SyncManager {
}