var webpack = require('webpack'),
    path = require('path'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        site: './app/main.js'
    },
    devtool: isProd ? false : 'eval-source-map',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'form.min.js',
        chunkFilename: 'form.vendor.js'
    },
    optimization: {
        minimize: isProd,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true
                    },
                    dead_code: true
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: 1,
                    name: 'vendor',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        })
    ],
    externals: {
        jquery: 'jQuery',
        'grav-form': 'GravForm'
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.json$/, loader: 'json-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-3']
                }
            }
        ]
    }
};
