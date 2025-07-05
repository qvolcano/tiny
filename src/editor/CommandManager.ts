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
export class CommandManager {
    private commands: Map<string, ICommand> = new Map<string, ICommand>();
    
    public readonly onCommandRegistered = new EventHandler<ICommand>();
    public readonly onCommandExecuted = new EventHandler<ICommand>();
    
    public registerCommand(command: ICommand): boolean {
        if (this.commands.has(command.id)) {
            return false;
        }
        
        this.commands.set(command.id, command);
        this.onCommandRegistered.emmit(command);
        return true;
    }
    
    public unregisterCommand(id: string): boolean {
        if (!this.commands.has(id)) {
            return false;
        }
        
        this.commands.delete(id);
        return true;
    }
    
    public getCommand(id: string): ICommand | undefined {
        return this.commands.get(id);
    }
    
    public executeCommand(id: string, ...args: any[]): boolean {
        const command = this.commands.get(id);
        if (!command || !command.canExecute()) {
            return false;
        }
        
        try {
            const result = command.execute(...args);
            if (result) {
                this.onCommandExecuted.emmit(command);
            }
            return result;
        } catch (error) {
            console.error(`执行命令 ${id} 时发生错误:`, error);
            return false;
        }
    }

    public async executeWithResult(id: string, ...args: any[]): Promise<{ success: boolean; error?: any }> {
        const command = this.commands.get(id);
        if (!command || !command.canExecute()) {
            return { success: false };
        }
        
        try {
            const result = command.execute(...args);
            if (result) {
                this.onCommandExecuted.emmit(command);
            }
            return { success: result };
        } catch (error) {
            console.error(`执行命令 ${id} 时发生错误:`, error);
            return { success: false, error };
        }
    }
}