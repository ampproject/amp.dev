const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';

  return {
    entry: path.join(__dirname, 'amp-dev.js'),
    output: {
      filename: 'static/[name].[contenthash].js',
      chunkFilename: 'static/[name].[chunkhash].bundle.js',
      sourceMapFilename: 'static/[name].map',
      publicPath: isDevelopment ? 'http://localhost:8090/' : '/',
      path: path.join(process.cwd(), 'dist'),
    },
    optimization: {
      minimizer: isDevelopment ? [] : [new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        cacheGroups: {
          main: {
            name: 'main',
            test: /^(?!.*\.critical).*\.s?css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      concatenateModules: false,
    },
    devtool: isDevelopment ? 'inline-source-map' : false,
    resolve: {
      alias: {
        '@amp-dev/scss': path.resolve(__dirname, 'scss'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'amp-dev.ejs',
        filename: './base.html',
        inlineSource: 'critical..+.css$',
        inject: false,
        isDevelopment,
      }),
      new SVGSpritemapPlugin(path.join(process.cwd(), '/static/**/*.svg'), {
        sprite: {
          prefix: false,
          idify: (filename) => {
            return filename.replace(/-\d*x\d*/, '');
          },
          generate: {
            title: false,
          },
        },
        output: {
          svgo: {
            plugins: [
              {
                removeAttrs: {},
              },
            ],
          },
          filename: 'static/sprite.svg',
        },
      }),
      new MiniCssExtractPlugin({
        filename:
          'static/frontend/' +
          (isDevelopment ? '[name].css' : '[name].[contenthash].css'),
        chunkFilename:
          'static/frontend/' +
          (isDevelopment ? '[id].css' : '[name].[contenthash].css'),
      }),
      new FileManagerPlugin({
        events: {
          onEnd: {
            copy: [
              {
                source: './dist/base.html',
                destination: '../pages/views/2021/',
              },
              {
                source: './dist/static/sprite.svg',
                destination: '../dist/static/frontend/sprite.svg',
              },
              {
                source: './static/img/**/*',
                destination: '../dist/static/frontend/img',
              },
            ],
          },
        },
      }),
      new webpack.HotModuleReplacementPlugin({}),
      isDevelopment
        ? new WebpackBuildNotifierPlugin({
            title: 'amp.dev: Frontend',
            logo: path.join(process.cwd(), '../pages/static/img/favicon.png'),
          })
        : () => {},
    ],
    module: {
      rules: [
        {
          test: /\.(svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                generator: (content) => svgToMiniDataURI(content.toString()),
              },
            },
            {
              loader: 'svgo-loader',
            },
          ],
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
        {
          test: /\.(woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: '[path][contenthash].[ext]',
          },
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {},
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.join(__dirname, './scss')],
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
              options: {
                minimize: false,
              },
            },
          ],
        },
      ],
    },

    devServer: {
      overlay: true,
      contentBase: '/',
      writeToDisk: true,
      disableHostCheck: true,
      port: 8090,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      compress: true,
      hot: true,
    },
  };
};
