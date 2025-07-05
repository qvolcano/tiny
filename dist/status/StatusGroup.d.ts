import { IStatus } from "./IStatus";
export declare class StatusGroup {
    context?: any;
    name: String;
    private statusMap;
    private currentStatus?;
    constructor(context?: any);
    register(status: IStatus): void;
    setStatus(key: string): void;
}
