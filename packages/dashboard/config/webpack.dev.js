const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const dependencies = require('./sharedDependencies').dependencies;

const devConfig = {
  mode: 'development',
  output: {
    clean: true,
    publicPath: 'http://localhost:8083/'
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 8083,
    historyApiFallback: true,
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/'
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
