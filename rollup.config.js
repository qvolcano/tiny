import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { glob } from 'glob';
import path from 'path';
import { dts } from 'rollup-plugin-dts';


// 使用 glob 同步的方式找到 'src' 下每个子目录的 'index.ts' 文件
const inputModules = glob.sync('src/*/index.ts').reduce((inputs, inputPath) => {
  // 获取模块名称，即子目录的名称
  const moduleName = path.basename(path.dirname(inputPath));
  // 将每个模块名称映射到对应的入口文件
  inputs[moduleName] = inputPath;
  return inputs;
}, {});
console.log(inputModules)

const config = [
  {
    input: "src/index.ts",
    output: [{
      format: 'cjs',
      dir: 'dist',
      entryFileNames: '[name].cjs.js', // 每个模块输出到对应的子目录中
    }, {
      format: 'esm',
      dir: 'dist',
      entryFileNames: '[name].js', // 每个模块输出到对应的子目录中
    }],
    plugins: [
      babel({
        exclude: 'node_modules/**', // 排除不需要转译的目录
        presets: ['@babel/preset-env'] // 使用 ES5 相关的预设
      }),
      nodeResolve(), commonjs(), typescript({ target: "es6", module: "ESNext", importHelpers: false, declaration: false })],
    // 根据需要添加外部依赖
    external: []
  },
  // {
  //   input: "src/index.ts",
  //   plugins: [dts()],
  //   output: {
  //     format: 'esm',
  //     dir: 'dist',
  //     entryFileNames: '[name].d.ts', // 每个模块输出到对应的子目录中
  //   },
  //   external: ["tslib"]
  // },

  {
    input: inputModules,
    output: [{
      format: 'cjs',
      dir: 'dist',
      entryFileNames: '[name]/index.cjs.js', // 每个模块输出到对应的子目录中
      preserveModules: true,
      preserveModulesRoot: 'src',
    }, {
      format: 'esm',
      dir: 'dist',
      entryFileNames: '[name]/index.js', // 每个模块输出到对应的子目录中
      preserveModules: true,
      preserveModulesRoot: 'src',
    }],
    plugins: [
      babel({
        exclude: 'node_modules/**', // 排除不需要转译的目录
        presets: ['@babel/preset-env'] // 使用 ES5 相关的预设
      }),
      nodeResolve(), commonjs(), typescript({ target: "es6", module: "ESNext", importHelpers: false, declaration: true })],
    // 根据需要添加外部依赖
    external: []
  },
  {
    input: inputModules,
    plugins: [dts()],
    output: {
      format: 'esm',
      dir: 'dist',
      entryFileNames: '[name]/index.d.ts', // 每个模块输出到对应的子目录中
      // preserveModules: true,
      preserveModulesRoot: 'src',

    },
    external: ["tslib"]

  },

]

// for (let i in inputModules){
//   config.push(
//     {
//       input: inputModules[i],
//       output: [{
//         format: 'cjs',
//         dir: 'dist',
//         entryFileNames: i + '/index.cjs.js', // 每个模块输出到对应的子目录中
//       }, {
//         format: 'esm',
//         dir: 'dist',
//         entryFileNames: i + '/index.js', // 每个模块输出到对应的子目录中
//       }],
//       plugins: [
//         babel({
//           exclude: 'node_modules/**', // 排除不需要转译的目录
//           presets: ['@babel/preset-env'] // 使用 ES5 相关的预设
//         }),
//         nodeResolve(), commonjs(), typescript({ target: "es6", module: "ESNext", importHelpers: false, declaration: true })],
//       // 根据需要添加外部依赖
//       external: []
//     },
//   )
// }

export default config
