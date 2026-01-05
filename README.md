# 货物管理 (Web + Electron)

简易货物管理应用，提供 **查询** 与 **添加** 功能。前端使用 React，打包工具为 Webpack 5，后端使用 Express。Web 与 Electron 共用一套前端代码，使用环境变量 `TARGET` 区分打包方案。

## 特性
- 查询货物（可按 ID、名称、单价区间过滤）
- 添加货物（ID 唯一）
- 前端与 Electron 共用同一套 React 代码

---

## 目录结构
```
src/
  server/           # Express API
  renderer/         # React 前端
  electron/         # electron 主进程
webpack.web.js
webpack.electron.js
package.json
README.md
```

## 开发
1. 安装依赖

   npm install

2. 启动 API 服务（开发）

   npm run dev:server

3. 启动前端开发服务器（自动代理 API）

   npm run dev:web

在浏览器打开 http://localhost:3000 即可。

## 打包为 Web 应用（静态）

1. 构建前端：

   npm run build:web

2. 以生产模式启动服务（会读取 `dist/web`）：

   npm run start:web

服务默认监听 3001，打开 http://localhost:3001

## 打包为 Electron 桌面应用

构建 Electron 打包版会先构建前端资源（输出到 `dist/web`），然后使用 `electron-builder` 打包：

  npm run build:electron

打包后会生成平台相关的安装包或可执行文件（取决于系统）。开发时直接运行：

  npm run dev:electron

(此脚本会先构建前端资源然后启动 Electron)

注意：Electron 启动时会在程序内部启动 Express API（监听默认端口 3001），因此无须额外启动服务器。

## 实现要点
- 前端代码通过环境变量 `TARGET` 检测是否是 electron 环境（在 Electron 下将请求基础路径设置为 `http://localhost:3001`）
- Web 开发使用 `webpack-dev-server`，并设置了 proxy 将 `/api` 转发到开发 API 服务
- Electron 主进程会 `require('../server')` 并调用 `startServer()`，以在桌面端嵌入 API 服务，前端直接加载打包好的 `dist/web/index.html`

## API
- GET /api/goods  支持 query: id, name, minPrice, maxPrice
- GET /api/goods/:id
- POST /api/goods  body: { id, name, price }

---

如需帮助或扩展（如持久化存储、更多字段、编辑/删除等），我可以继续实现。