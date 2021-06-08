const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = require('../platform/config/shared.json');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';
  const template = path.join(__dirname, 'src/index.hbs');
  return {
    entry: path.join(__dirname, 'src/app.js'),
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[name].map',
      publicPath: '',
      path: path.join(__dirname, 'dist'),
    },
    node: {
      global: false,
    },
    devtool: devMode ? 'inline-source-map' : false,
    resolve: {
      alias: {
        crypto: 'crypto-browserify',
      },
      fallback: {
        util: require.resolve('util/util.js'),
        stream: require.resolve('stream-browserify'),
      },
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
        new OptimizeCSSAssetsPlugin(),
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
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG),
        'process.type': JSON.stringify(process.type),
        'process.version': JSON.stringify(process.version),
        global: '(typeof globalThis ? globalThis : self)',
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: ['process'],
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
