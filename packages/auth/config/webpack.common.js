const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['swc-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
