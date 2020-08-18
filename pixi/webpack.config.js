const path = require('path');
const webpack = require('webpack');
const ClosurePlugin = require('closure-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode || 'production';

  return {
    entry: path.join(__dirname, 'src/ui/PageExperience.js'),
    output: {
      filename: 'pixi.[name].[hash].js',
      chunkFilename: 'pixi.[name].[chunkhash].bundle.js',
      sourceMapFilename: 'pixi.[name].map',
      publicPath: '/static/page-experience/',
    },
    optimization: {
      minimizer: [new ClosurePlugin({mode: 'STANDARD'}, {})],
    },
    devtool: mode == 'development' ? 'cheap-module-source-map' : false,
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/ui/page-experience.hbs'),
        filename: './pixi.html',
        inject: false,
      }),
      new webpack.EnvironmentPlugin({
        AMP_DEV_API_KEY_SAFE_BROWSING: '',
        AMP_DEV_API_KEY_PAGE_SPEED_INSIGHTS: '',
      }),
      new webpack.DefinePlugin({
        API_ENDPOINT_SAFE_BROWSING:
          'https://safebrowsing.googleapis.com/v4/threatMatches:find',
        API_ENDPOINT_PAGE_SPEED_INSIGHTS:
          mode == 'development'
            ? JSON.stringify(
                'http://localhost:8080/page-experience/api/page-experience-dummy'
              )
            : JSON.stringify(
                'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
              ),
      }),
      new FileManagerPlugin({
        onEnd: {
          copy: [
            {
              source: './dist/pixi.html',
              destination: '../frontend/templates/views/partials/pixi.j2',
            },
            {
              source: './dist/*.js',
              destination: '../dist/static/page-experience/',
            },
            {
              source: './dist/pixi.main.map',
              destination: '../dist/static/page-experience/',
            },
          ],
        },
      }),
      new CleanWebpackPlugin({
        dry: false,
        dangerouslyAllowCleanPatternsOutsideProject: true,
        cleanAfterEveryBuildPatterns: [
          path.join(process.cwd(), '../dist/static/page-experience'),
        ],
      }),
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
