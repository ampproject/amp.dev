var autoprefixer = require('gulp-autoprefixer');
var exec = require('child_process').exec;
var plumber = require('gulp-plumber');
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var swPrecache = require('sw-precache');
var gutil = require('gulp-util');

var Path = {
  CSS_SOURCES: './assets/sass/**/*.scss',
  CSS_OUT_DIR: './assets/css/'
};

gulp.task('import-docs', function () {
  return exec('cd ./scripts && ./import_docs.js', function (err, stdout, stderr) {
    if (err instanceof Error) {
      throw err;
    }
    console.log(stdout);
  });
});

gulp.task('update-blog-links', function () {
  return exec('cd ./scripts && ./update_blog_links.js', function (err, stdout, stderr) {
    if (err instanceof Error) {
      throw err;
    }
    console.log(stdout);
  });
});

gulp.task('write-service-worker', function (callback) {

  swPrecache.write('build/service-worker.js', {
    staticFileGlobs: [
      'build/**/*.{png,jpg,gif,svg,json}',
      'build/*.html',
      'build/docs/**/*.html',
      'build/who/*.html',
      'build/roadmap/*.html',
      'build/metrics/*.html',
      'build/how-it-works/*.html',
      'build/case-studies/*.html'
    ],
    runtimeCaching: [{
      urlPattern: /^https:\/\/cdn\.ampproject\.org/,
      handler: 'fastest'
    }],
    stripPrefixMulti: {
      'build/': ''
    },
    logger: gutil.log
  }, callback);

});

gulp.task('sass', function() {
  return gulp.src(Path.CSS_SOURCES)
    .pipe(plumber())
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(Path.CSS_OUT_DIR))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch([Path.CSS_SOURCES], ['sass']);
});


gulp.task('build', ['update-blog-links', 'import-docs', 'sass']);
gulp.task('default', ['sass', 'watch']);
