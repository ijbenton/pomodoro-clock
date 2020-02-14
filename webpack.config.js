const path = require('path');

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/app.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
};
