class BlockScriptRuntime {
    evalBlock(block) {
    }
}
const builtin = {
    "sum": (...args) => {
        return args.reduce((a, b) => a.valueOf() + b.valueOf(), 0);
    }
};

export { BlockScriptRuntime, builtin };
