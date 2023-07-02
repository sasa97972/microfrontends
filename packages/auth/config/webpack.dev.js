const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const dependencies = require('./sharedDependencies').dependencies;

const devConfig = {
  mode: 'development',
  output: {
    clean: true,
    publicPath: 'http://localhost:8082/'
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 8082,
    historyApiFallback: true,
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/'
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
