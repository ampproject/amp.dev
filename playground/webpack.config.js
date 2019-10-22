/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ClosurePlugin = require('closure-webpack-plugin');
const config = require('../platform/config/shared.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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
      new CopyWebpackPlugin([{from: path.join(__dirname, 'static/')}]),
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
