var autoprefixer = require('gulp-autoprefixer');
var exec = require('child_process').exec;
var plumber = require('gulp-plumber');
var gulp = require('gulp');
var sass = require('gulp-sass');
var svgSprite = require('gulp-svg-sprite');

var Path = {
  CSS_SOURCES: './assets/sass/**/*.scss',
  CSS_OUT_DIR: './assets/css/'
};

gulp.task('import-docs', function (cb) {
  exec('cd ./scripts && ./import_docs.js', function (err, stdout, stderr) {
    if (err instanceof Error) {
      cb(err);
    }
    //console.log(stdout);
    cb();
  });
});

gulp.task('optimize-images', function (cb) {
  return gulp.src('./assets/img/symbols/*.svg')
    .pipe(svgSprite({
      mode: {
        css: {
          sprite: "../sprite.svg",
          bust: false,
          render: {
            scss: {
              template: "./assets/img/symbols/template.scss",
              dest: "../../sass/_sprite_generated.scss"
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('./assets/img/'));
});

gulp.task('update-blog-links', function (cb) {
  exec('cd ./scripts && ./update_blog_links.js', function (err, stdout, stderr) {
    if (err instanceof Error) {
      cb(err);
    }
    //console.log(stdout);
    cb();
  });
});

gulp.task('update-platforms-page', ['import-docs'], function (cb) {
  return exec('cd ./scripts && ./update_platforms_page.js', function (err, stdout, stderr) {
    if (err instanceof Error) {
      cb(err);
    }
    //console.log(stdout);
    cb();
  });
});

gulp.task('sass', function() {
  return gulp.src(Path.CSS_SOURCES)
    .pipe(plumber())
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(Path.CSS_OUT_DIR));
});

gulp.task('watch', function() {
  gulp.watch([Path.CSS_SOURCES], ['sass']);
});


gulp.task('build', ['update-blog-links', 'import-docs', 'update-platforms-page', 'optimize-images', 'sass']);
gulp.task('default', ['update-platforms-page', 'sass', 'watch']);
