const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const dependencies = require('./sharedDependencies').dependencies;

const devConfig = {
  mode: 'development',
  output: {
    clean: true,
    publicPath: 'http://localhost:8080/'
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 8080,
    historyApiFallback: true,
    compress: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8082/remoteEntry.js',
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        }
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
