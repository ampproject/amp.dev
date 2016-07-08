var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var del = require('del');
var exec = require('child_process').exec;
var gulp = require('gulp');
var git = require('gulp-git');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var Path = {
  CSS_SOURCES: './source/sass/*.scss',
  CSS_OUT_DIR: './static/css/'
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

gulp.task('sass', function() {
  return gulp.src(Path.CSS_SOURCES)
    .pipe(plumber())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(Path.CSS_OUT_DIR))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch([Path.CSS_SOURCES], ['sass']);
});


gulp.task('build', ['update-blog-links', 'import-docs', 'sass']);
gulp.task('default', ['sass']);
