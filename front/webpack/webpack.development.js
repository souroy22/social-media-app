const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    host: 'localhost',
    port: '3000',
    compress: true,
    historyApiFallback: true
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ],
}
