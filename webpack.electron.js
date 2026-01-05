const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  target: 'electron-renderer',
  entry: path.resolve(__dirname, 'src/renderer/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist', 'web'),
    filename: 'bundle.js',
    publicPath: './'
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/renderer/index.html'),
      scriptLoading: 'blocking',
      publicPath: './', // 确保生成 index.html 里的 script src 为相对路径
    })
  ],
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
};