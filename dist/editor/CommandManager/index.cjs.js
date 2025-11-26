'use strict';

var tslib_es6 = require('../../node_modules/tslib/tslib.es6/index.cjs.js');
var EventHandler = require('../../event/EventHandler/index.cjs.js');

/**
 * 基础命令管理器，只负责命令的注册和执行
 */
class CommandManager {
    constructor() {
        this.commands = new Map();
        this.onCommandRegistered = new EventHandler.EventHandler();
        this.onCommandExecuted = new EventHandler.EventHandler();
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
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
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

exports.CommandManager = CommandManager;
