const path = require('path');
const webpack = require('webpack');
const ClosurePlugin = require('closure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
    node: {
      global: false,
    },
    optimization: {
      minimizer: [
        new ClosurePlugin({mode: 'STANDARD'}, {}),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          critical: {
            name: 'critical',
            test: /\.critical\.s?css$/,
            chunks: 'all',
            enforce: true,
          },
          main: {
            name: 'main',
            test: /^(?!.*\.critical).*\.s?css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        global: '(typeof globalThis ? globalThis : self)',
      }),
      new CopyWebpackPlugin({
        patterns: [{from: path.join(__dirname, 'static/')}],
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: devMode ? '[id].css' : '[name].[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template,
        filename: './index.html',
        inlineSource: 'critical..+$',
        gaTrackingId: config.gaTrackingId,
      }),
      new HtmlWebpackPlugin({
        template,
        filename: './embed.html',
        inlineSource: 'critical..+$',
        gaTrackingId: config.gaTrackingId,
        embed: true,
      }),
      new HtmlWebpackPlugin({
        template,
        filename: './validator.html',
        inlineSource: 'critical..+$',
        gaTrackingId: config.gaTrackingId,
        validator: true,
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: ['main'],
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
          test: /\.(png|jpg|svg)$/,
          loader: 'url-loader',
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {loader: 'css-loader', options: {sourceMap: true}},
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.join(__dirname, '../frontend/scss')],
                },
                sourceMap: true,
              },
            },
          ],
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
