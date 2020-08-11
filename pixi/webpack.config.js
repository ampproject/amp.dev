const path = require('path');
const ClosurePlugin = require('closure-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = (env, argv) => {
  const template = path.join(__dirname, 'src/pixi.hbs');

  return {
    entry: path.join(__dirname, 'src/pixi.js'),
    output: {
      filename: 'static/pixi/pixi.[name].[hash].js',
      chunkFilename: 'pixi.[name].[chunkhash].bundle.js',
      sourceMapFilename: 'pixi.[name].map',
      publicPath: '/',
    },
    optimization: {
      minimizer: [new ClosurePlugin({mode: 'STANDARD'}, {})],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template,
        filename: './pixi.html',
        inject: false,
      }),
      new FileManagerPlugin({
        onEnd: {
          copy: [
            {
              source: './dist/pixi.html',
              destination: '../frontend/templates/views/partials/pixi.j2',
            },
            {
              source: './dist/static/pixi/*.js',
              destination: '../dist/static/pixi/',
            },
          ],
        },
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {minimize: false},
            },
          ],
        },
      ],
    },
  };
};
