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
    entry: path.join(__dirname, 'src/ui/PageExperience.js'),
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
      new webpack.DefinePlugin({
        IS_DEVELOPMENT: isDevelopment,
        API_ENDPOINT_LINTER: JSON.stringify(config[mode].API_ENDPOINT_LINTER),
        API_ENDPOINT_SAFE_BROWSING: JSON.stringify(
          config[mode].API_ENDPOINT_SAFE_BROWSING
        ),
        API_ENDPOINT_PAGE_SPEED_INSIGHTS: JSON.stringify(
          config[mode].API_ENDPOINT_PAGE_SPEED_INSIGHTS
        ),
        API_ENDPOINT_MOBILE_FRIENDLINESS: JSON.stringify(
          config[mode].API_ENDPOINT_MOBILE_FRIENDLINESS
        ),
        AMP_DEV_PIXI_APIS_KEY: JSON.stringify(
          process.env.AMP_DEV_PIXI_APIS || ''
        ),
      }),
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
