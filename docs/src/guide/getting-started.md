# 快速开始 {#getting-started}

## 安装 {#installation}

### 前置准备 {#prerequisites}

- [Node.js](https://nodejs.org/) 20 及以上版本。

node-napcat-ts 使用 `pnpm` 作为默认包管理工具,

原则上兼容市面上大部分包管理器但不保证不出问题。

::: code-group

```sh [pnpm]
pnpm add node-napcat-ts
```

:::

::: tip 注意

node-napcat-ts 是仅 ESM 的软件包。不要使用 `require()` 导入它，并确保最新的 `package.json` 包含 `"type": "module"`，或者更改相关文件的文件扩展名，例如 `config.js` 到 `.mjs`/`.mts`。

此外，在异步 CJS 上下文中，可以使用 `await import('node-napcat-ts')` 代替。

:::
