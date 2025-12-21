import { JassScriptEngine } from "./index";

function assertEqual(actual: any, expected: any, message: string) {
    if (actual !== expected) {
        throw new Error(`${message} expected=${expected} actual=${actual}`);
    }
}

const engine = new JassScriptEngine();
const calls: string[] = [];

engine.global.set_value("f1", (value: any) => {
    calls.push(`f1:${value}`);
});
engine.global.set_value("f2", (value: any) => {
    calls.push(`f2:${value}`);
});

engine.eval("run([f1(2),f2(1)])");
assertEqual(calls.join(","), "f1:2,f2:1", "function list run");

calls.length = 0;
engine.eval("if(0,[f1(1)],[f2(2)])");
assertEqual(calls.join(","), "f2:2", "if branch false");

calls.length = 0;
engine.eval("if(1,[f1(3)],[f2(4)])");
assertEqual(calls.join(","), "f1:3", "if branch true");

calls.length = 0;
const compiled = engine.compile("run([f1(5),f2(6)])");
compiled();
assertEqual(calls.join(","), "f1:5,f2:6", "compile run");
