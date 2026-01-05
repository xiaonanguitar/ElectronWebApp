# Electron 热更新开发说明

1. 前端热更新：
   - 运行 `npm run dev:web`，webpack-dev-server 启动，前端代码变动自动刷新。
   - Electron 主进程可加载 http://localhost:3000 进行开发（需调整 main.js 加载 URL）。

2. 主进程热重载：
   - 已集成 electron-reload，运行 `npm run dev:electron`，主进程和 dist/web 变动会自动重启 Electron。

3. 推荐开发流程：
   - 开两个终端：
     1. `npm run dev:web`（前端热更新）
     2. `npm run dev:electron`（主进程热重载，前端需重新 build:web 后生效）

4. 进阶：如需 Electron 直接加载 dev server（http://localhost:3000），可在 main.js 中判断开发环境并用 `mainWindow.loadURL('http://localhost:3000')`。

如需自动并行运行，可用 concurrently 优化脚本。
