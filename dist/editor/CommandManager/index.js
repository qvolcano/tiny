import { __awaiter } from '../../node_modules/tslib/tslib.es6/index.js';
import { EventHandler } from '../../event/EventHandler/index.js';

/**
 * 基础命令管理器，只负责命令的注册和执行
 */
class CommandManager {
    constructor() {
        this.commands = new Map();
        this.onCommandRegistered = new EventHandler();
        this.onCommandExecuted = new EventHandler();
    }
    registerCommand(command) {
        if (this.commands.has(command.id)) {
            return false;
        }
        this.commands.set(command.id, command);
        this.onCommandRegistered.emmit(command);
        return true;
    }
    unregisterCommand(id) {
        if (!this.commands.has(id)) {
            return false;
        }
        this.commands.delete(id);
        return true;
    }
    getCommand(id) {
        return this.commands.get(id);
    }
    executeCommand(id, ...args) {
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
        }
        catch (error) {
            console.error(`执行命令 ${id} 时发生错误:`, error);
            return false;
        }
    }
    executeWithResult(id, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (error) {
                console.error(`执行命令 ${id} 时发生错误:`, error);
                return { success: false, error };
            }
        });
    }
}

export { CommandManager };
