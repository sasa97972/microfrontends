const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const skipDeps = ['@mui/icons-material', '@mui/material'];
const allDeps = require('../package.json').dependencies;
const dependencies = Object.keys(allDeps).reduce(
  (res, key) => {
    if (!skipDeps.includes(key)) {
      return {...res, key: allDeps[key]};
    }
    return res;
  },
  {}
);

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 8081,
    historyApiFallback: true,
    compress: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: allDeps.react,
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
