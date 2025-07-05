export interface IServerConnect {
    push(message: any): void;
    flush(): void;

}