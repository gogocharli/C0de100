const path = require('path');

/*
Solution for multiple entry file from
https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config
*/
module.exports = {
  entry: {
    'src/Day-1/index': path.resolve(__dirname, 'src', 'Day-1', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/src/_data/', '/node_modules', '/postcss.config.js'],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};
