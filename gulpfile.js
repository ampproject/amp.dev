const autoprefixer = require('gulp-autoprefixer');
const exec = require('child_process').exec;
const plumber = require('gulp-plumber');
const gulp = require('gulp');
const sass = require('gulp-sass');
const svgSprite = require('gulp-svg-sprite');
const swBuild = require('sw-build');
const fs = require('fs');

const Path = {
  CSS_SOURCES: './assets/sass/**/*.scss',
  CSS_OUT_DIR: './assets/css/'
};

gulp.task('import-docs', function (cb) {
  exec('cd ./scripts && ./import_docs.js', function (err, stdout, stderr) {
    if (err instanceof Error) {
      cb(err);
    }
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
    cb();
  });
});

gulp.task('update-tweets', function (cb) {
  exec('cd ./scripts && ./update_tweets.js', function (err, stdout, stderr) {
    if (err instanceof Error) {
      cb(err);
    }
    cb();
  });
});

gulp.task('update-platforms-page', ['import-docs'], function (cb) {
  return exec('cd ./scripts && ./update_platforms_page.js', function (err, stdout, stderr) {
    if (err instanceof Error) {
      cb(err);
    }
    cb();
  });
});

gulp.task('generate-asset-manifest', function (cb) {
  swBuild.getFileManifestEntries({
    rootDirectory: './assets',
    staticFileGlobs: [
      'img/*.{svg,png,jpg}',
      'img/nav/*.{svg,png,jpg}',
      'img/footer/*.{svg,png,jpg}'
    ]
  }).then(entries => {

    // Add "static" to the path
    entries.forEach(entry => {
      entry.url = '/static' + entry.url;
    });

    fs.readFile('./pwa/service-worker.js', 'utf8', (err, data) => {
      if (err) throw err;

      // Inline precache manifest directly into the Service Worker
      data = data.replace(/\/\* START_PRECACHE_MANIFEST \*\/.*\/\* END_PRECACHE_MANIFEST \*\//, "/* START_PRECACHE_MANIFEST */" + JSON.stringify(entries) + "/* END_PRECACHE_MANIFEST */");

      fs.writeFile('./pwa/service-worker.js', data, (err) => {
        if (err) throw err;
        cb();
      });

    });

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
  gulp.watch([
    './assets\/img\/*.{svg,png,jpg}',
    './assets\/img\/nav/*.{svg,png,jpg}',
    './assets\/img\/footer/*.{svg,png,jpg}'
  ], ['generate-asset-manifest']);
});


gulp.task('build', [ 'update-blog-links', 'update-tweets', 'import-docs', 'update-platforms-page', 'optimize-images', 'sass', 'generate-asset-manifest' ]);
gulp.task('default', [ 'update-platforms-page', 'sass', 'generate-asset-manifest', 'watch' ]);
