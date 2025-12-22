const assert = (condition, message) => {
    if (!condition) {
        throw new Error(message);
    }
};
const jassModuleUrl = new URL("../dist/scripts/jass/index/index.js", import.meta.url);
const jassModule = await import(jassModuleUrl.href);
assert(jassModule && typeof jassModule.JassScriptEngine === "function", "未找到 JassScriptEngine 导出");
const engine = new jassModule.JassScriptEngine();
engine.eval("print('jass test: hello')");
// var fn = engine.compile("print(1,2,3,4,5,6,7,8,9,10)")
engine.eval("run([print('jass test: a'),print('jass test: b')])");
export {};
// console.log(fn)
// fn()
// console.log("jass test: OK")
