import assert from "node:assert/strict"

const moduleUrl = new URL("./dist/scripts/jass/index/index.js", import.meta.url)
const jassModule = await import(moduleUrl.href)

const { JassScriptEngine } = jassModule
assert.equal(typeof JassScriptEngine, "function", "未找到 JassScriptEngine 导出；请先运行 npx gulp 构建 dist")

const tests = []
const test = (name, fn) => tests.push({ name, fn })

test("基础调用", () => {
    const engine = new JassScriptEngine()
    engine.global.set_value("add", (a, b) => a + b)
    assert.equal(engine.eval("add(1,2)"), 3)
})

test("嵌套调用", () => {
    const engine = new JassScriptEngine()
    engine.global.set_value("add", (a, b) => a + b)
    assert.equal(engine.eval("add(1,add(2,3))"), 6)
})

test("run + 列表(调用)", () => {
    const engine = new JassScriptEngine()
    const log = []
    engine.global.set_value("push", (v) => log.push(v))
    engine.eval("run([push('a'),push('b')])")
    assert.deepEqual(log, ["a", "b"])
})

test("run + 列表(函数)", () => {
    const engine = new JassScriptEngine()
    const log = []
    engine.global.set_value("fa", () => log.push("a"))
    engine.global.set_value("fb", () => log.push("b"))
    engine.eval("run([fa,fb])")
    assert.deepEqual(log, ["a", "b"])
})

test("ifdo 用户实现（只执行选中分支）", () => {
    const engine = new JassScriptEngine()
    const log = []
    engine.global.set_value("push", (v) => log.push(v))
    engine.global.set_value("ifdo", (cond, a, b) => (cond ? a : b).forEach((fn) => fn()))
    engine.eval("ifdo(0,[push('a')],[push('b')])")
    assert.deepEqual(log, ["b"])
})

test("列表只能是函数（遇到非函数应报错）", () => {
    const engine = new JassScriptEngine()
    assert.throws(() => engine.eval("run([1])"))
})

test("compile 可复用", () => {
    const engine = new JassScriptEngine()
    engine.global.set_value("add", (a, b) => a + b)
    const fn = engine.compile("add(7,8)")
    assert.equal(fn(), 15)
    assert.equal(fn(), 15)
})

test("双引号字符串", () => {
    const engine = new JassScriptEngine()
    const log = []
    engine.global.set_value("push", (v) => log.push(v))
    engine.eval("push(\"x\")")
    assert.deepEqual(log, ["x"])
})

let failed = 0
for (const t of tests) {
    try {
        const result = t.fn()
        if (result && typeof result.then === "function") {
            await result
        }
        console.log("[通过]", t.name)
    } catch (err) {
        failed++
        console.error("[失败]", t.name)
        console.error(err?.stack || err)
    }
}

if (failed) {
    process.exitCode = 1
    console.error(`共失败 ${failed} 个用例`)
} else {
    console.log(`全部通过（${tests.length}）`)
}
