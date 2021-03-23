/**
 * Copyright 2020 The AMPHTML Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const config = require('./config.js');
const {calculateHash} = require('@ampproject/toolbox-script-csp');

module.exports = (env, argv) => {
  const mode = argv.mode || 'production';
  const isDevelopment = mode == 'development';

  return {
    entry: {
      main: path.join(__dirname, 'src/ui/PageExperience.js'),
      cli: path.join(__dirname, 'src/Cli.js'),
    },
    output: {
      filename: isDevelopment
        ? 'pixi.[name].js'
        : 'pixi.[name].[contenthash].js',
      chunkFilename: isDevelopment
        ? 'pixi.[name].js'
        : 'pixi.[name].[chunkhash].bundle.js',
      sourceMapFilename: 'pixi.[name].map',
      publicPath: '/static/page-experience/',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: '2015',
            compress: {
              defaults: true,
              unsafe: true,
            },
          },
        }),
      ],
      concatenateModules: false,
    },
    devtool: isDevelopment ? 'cheap-module-source-map' : false,
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/ui/page-experience.hbs'),
        filename: './pixi.html',
        inject: false,
        templateParameters: (compilation, assets, assetTags, options) => {
          const js = Object.values(compilation.assets)[0].source();

          return {
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              files: assets,
              options,
            },
            cspHash: calculateHash(js),
          };
        },
      }),
      new webpack.DefinePlugin(config.createKeyMapping(mode)),
      new FileManagerPlugin({
        events: {
          onStart: {
            delete: [
              {
                source: '../dist/static/page-experience/',
                options: {
                  force: true,
                },
              },
            ],
          },
          onEnd: {
            copy: [
              {
                source: './dist/pixi.html',
                destination:
                  '../frontend/templates/views/partials/pixi/webpack.j2',
              },
              {
                source: './dist/*.js',
                destination: '../dist/static/page-experience/',
              },
              {
                source: './dist/*.map',
                destination: '../dist/static/page-experience/',
              },
            ],
          },
        },
      }),
      isDevelopment
        ? new WebpackBuildNotifierPlugin({
            title: 'amp.dev: Pixi',
            logo: path.join(process.cwd(), '../pages/static/img/favicon.png'),
          })
        : () => {},
    ],
    module: {
      rules: [
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

    devServer: {
      writeToDisk: true,
    },
  };
};
