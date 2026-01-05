// 仅开发环境引入 electron-reload，实现主进程和前端热重载
if (process.env.NODE_ENV === 'development') {
  try {
    require('electron-reload')(
      __dirname,
      {
        electron: require(`${__dirname}/../../../node_modules/electron`),
        forceHardReset: true,
        hardResetMethod: 'exit',
        // 监听前端和主进程文件
        watchRenderer: true,
        // 监听的文件类型
        // files: [
        //   'dist/web/**/*',
        //   'src/electron/**/*',
        // ],
      }
    );
  } catch (e) {
    console.warn('electron-reload 加载失败', e);
  }
}
