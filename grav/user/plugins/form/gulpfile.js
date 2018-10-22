'use strict';

var gulp        = require('gulp'),
    util        = require('util'),
    path        = require('path'),
    immutable   = require('immutable'),
    gulpWebpack = require('gulp-webpack'),
    webpack     = require('webpack'),
    sourcemaps  = require('gulp-sourcemaps'),
    exec        = require('child_process').execSync,
    pwd         = exec('pwd').toString();

var plugins = {},
    base    = immutable.fromJS(require('./webpack.conf.js')),
    options = {
        prod: base.mergeDeep({
            devtool: 'source-map',
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': { NODE_ENV: '"production"' }
                }),
                new webpack.optimize.UglifyJsPlugin({
                    sourceMap: true,
                    compress: {
                        warnings: false
                    }
                }),
                new webpack.ProvidePlugin(plugins)
            ],
            output: {
                filename: 'form.min.js'
            }
        })
    };

var compileJS = function(watch) {
    var prodOpts = options.prod.set('watch', watch);

    return gulp.src('app/main.js')
        .pipe(gulpWebpack(prodOpts.toJS()))
        .pipe(gulp.dest('assets/'));
};

gulp.task('js', function() {
    compileJS(false);
});

gulp.task('watch', function() {
    compileJS(true);
});

gulp.task('all', ['js']);
gulp.task('default', ['all']);