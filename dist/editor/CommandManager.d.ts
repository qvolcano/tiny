import { EventHandler } from '../event/EventHandler';
export interface ICommand {
    id: string;
    name: string;
    execute(...args: any[]): boolean;
    canExecute(): boolean;
}
/**
 * 基础命令管理器，只负责命令的注册和执行
 */
export declare class CommandManager {
    private commands;
    readonly onCommandRegistered: EventHandler<ICommand>;
    readonly onCommandExecuted: EventHandler<ICommand>;
    registerCommand(command: ICommand): boolean;
    unregisterCommand(id: string): boolean;
    getCommand(id: string): ICommand | undefined;
    executeCommand(id: string, ...args: any[]): boolean;
    executeWithResult(id: string, ...args: any[]): Promise<{
        success: boolean;
        error?: any;
    }>;
}
