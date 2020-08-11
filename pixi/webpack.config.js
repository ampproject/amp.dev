const path = require('path');
const ClosurePlugin = require('closure-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = require('../platform/config/shared.json');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';
  const template = path.join(__dirname, 'src/index.hbs');
  return {
    entry: path.join(__dirname, 'src/app.js'),
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[name].map',
      publicPath: '',
    },
    optimization: {
      minimizer: [
        new ClosurePlugin({mode: 'STANDARD'}, {}),
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{from: path.join(__dirname, 'static/')}],
      }),

      new HtmlWebpackPlugin({
        template,
        filename: './validator.html',
        inlineSource: 'critical..+$',
        gaTrackingId: config.gaTrackingId,
        validator: true,
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
