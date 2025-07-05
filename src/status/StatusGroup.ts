import { IStatus } from "./IStatus";

export class StatusGroup {
    public name: String = "";
    private statusMap: { [key: string]: IStatus } = {};
    private currentStatus?: IStatus;
    constructor(public context?: any) {

    }
    register(status: IStatus) {
        this.statusMap[status.name] = status;
    }

    setStatus(key: string): void {
        let status = this.statusMap[key];
        if (this.currentStatus) {
            this.currentStatus.close();
        }
        this.currentStatus = status;
        if (status) {
            status.open();
        }
    }
}

