const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(__dirname, 'src/renderer/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist', 'web'),
    filename: 'bundle.js',
    publicPath: '/'
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
      template: path.resolve(__dirname, 'src/renderer/index.html')
    })
  ],
  devServer: {
    static: { directory: path.resolve(__dirname, 'dist', 'web') },
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
};