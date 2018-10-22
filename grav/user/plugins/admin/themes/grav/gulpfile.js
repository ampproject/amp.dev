'use strict';

var gulp        = require('gulp'),
    util        = require('util'),
    path        = require('path'),
    gutil       = require('gulp-util'),
    path        = require('path'),
    immutable   = require('immutable'),
    merge       = require('merge-stream'),
    gulpWebpack = require('gulp-webpack'),
    webpack     = require('webpack'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps');

var plugins = {
        'Promise': 'imports?this=>global!exports?global.Promise!babel-polyfill',
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    },
    base    = immutable.fromJS(require('./webpack.conf.js')),
    options = {
        dev: base.mergeDeep({
            devtool: 'source-map',
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': { NODE_ENV: '"development"' }
                }),
                new webpack.ProvidePlugin(plugins),
                new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity)
            ],
            output: {
                filename: 'admin.js'
            }
        }),

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
                new webpack.ProvidePlugin(plugins),
                new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.min.js", Infinity)
            ],
            output: {
                filename: 'admin.min.js'
            }
        })
    };

var compileJS = function(watch) {
    var devOpts  = options.dev.set('watch', watch),
        prodOpts = options.prod.set('watch', watch);

    var prod = gulp.src('app/main.js')
        .pipe(gulpWebpack(prodOpts.toJS()))
        .pipe(gulp.dest('js/'));

    /*var dev = gulp.src('app/main.js')
        .pipe(gulpWebpack(devOpts.toJS()))
        .pipe(gulp.dest('js/'));*/

    // return merge(prod, dev);
    return prod;
};

var compileCSS = function(event) {
    return gulp.src('./scss/**/*.scss')
        .on('end', function() {
            // console.log(util.inspect(event));
            if (event && event.path) {
                gutil.log(gutil.colors.green('√'), 'Saved change for "' + event.path.replace(__dirname, '') + '"');
            }
        })
        .on('error', gutil.log)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css-compiled'));
};

gulp.task('js', function() {
    compileJS(false);
});

gulp.task('css', function() {
    compileCSS();
});

gulp.task('watch', function() {
    compileJS(true);
    gulp.watch('./scss/**/*.scss', compileCSS);
});

gulp.task('watch-js', function() {
    compileJS(true);
});

gulp.task('watch-css', function() {
    compileCSS();
    gulp.watch('./scss/**/*.scss', compileCSS);
});

gulp.task('all', ['css', 'js']);
gulp.task('default', ['all']);
