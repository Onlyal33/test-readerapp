const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [path.join(__dirname, 'src', 'index.js')],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Reader App',
      template: path.join(__dirname, 'public', 'template.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: 'babel-loader',
      },
    ],
  },
};
