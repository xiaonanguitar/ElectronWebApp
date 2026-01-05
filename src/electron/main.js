require('./dev-reload');
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { startServer } = require('../server');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  if (process.env.NODE_ENV === 'development') {
    // 开发环境加载 webpack-dev-server
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // 生产环境加载本地文件
    const indexHtml = path.resolve(__dirname, '../../dist/web/index.html');
    mainWindow.loadFile(indexHtml);
  }
}

app.whenReady().then(() => {
  // Start API server (embedded)
  startServer();
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
