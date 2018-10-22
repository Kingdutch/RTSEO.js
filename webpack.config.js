const path = require('path');

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'rtseo.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules\/(?!yoastseo\/)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
