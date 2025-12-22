# Repository Guidelines

## 项目结构与模块组织

- `src/`：TypeScript 源码；按“领域模块”分目录（如 `src/collection/`、`src/scripts/`、`src/trigger/`）。
- `src/index.ts`：聚合导出入口；各子模块通常通过 `src/<module>/index.ts` 暴露 API（文件头含 `/***auto-create-index***/`，多为自动生成）。
- `dist/`：构建产物（ESM/CJS + `*.d.ts`），仓库内会提交，用于发布与被下游直接引用。

## 构建、测试与本地开发命令

- 安装依赖：`npm ci`
- 构建（清理 + 生成 index + Rollup 打包 + 更新 exports/typesVersions）：`npx gulp`
- 仅重新生成索引文件：`npx gulp index`
- 仅打包：`npx gulp rollup`（等价于执行 `rollup -c`）
- `npm test`：当前未配置测试脚本（会直接退出失败）。
- `npm run bpush`：会执行 `gulp && git add && git commit && git push`，仅建议维护者在明确知情时使用。

## 代码风格与命名约定

- 语言：TypeScript（见 `tsconfig.json`），源码根目录为 `src/`，输出到 `dist/`。
- 缩进：仓库内多数文件使用 4 空格；命名遵循 `PascalCase`（类/类型）与 `camelCase`（变量/方法）。
- 索引导出：优先通过 `export * from "./Foo"` 或 `export * as module from "./module"`；不要手工编辑带 `auto-create-index` 的 `index.ts`，改动后运行 `npx gulp index`。

## 测试指南

- 当前无测试框架与覆盖率门槛；若新增测试，请同时补齐 `package.json` 的 `test` 脚本并在 PR 中说明选择（例如 Vitest/Jest）。

## 贡献工作流（建议）

- 修改 `src/` 后先运行 `npx gulp`，并检查 `dist/` 是否与变更一致（对外导出、类型定义、产物文件名）。
- 新增模块目录（例如 `src/foo/`）时，确保存在 `src/foo/index.ts` 并通过 `npx gulp index` 更新聚合导出。

## 提交与 Pull Request 指南

- 现有提交信息较短，常见为 `update` / `update_jass`；建议在此基础上补充范围：`update(<module>): <简述>`（例如 `update(collection): fix TableList remove`）。
- PR 建议包含：变更动机、影响模块（`src/<module>/`）、是否需要同步更新 `dist/`（如涉及对外 API/类型变更通常需要）。

## 配置与发布提示

- `gulp package` 会根据 `dist/index.d.ts` 自动重写 `package.json` 的 `exports`/`typesVersions`；发布前先跑一遍 `npx gulp`，避免导出表与类型映射不一致。
