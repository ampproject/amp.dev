import gulp from 'gulp';
import templates from '~/setup/tasks/templates.js'
import icons from '~/setup/tasks/icons.js'
import styles from '~/setup/tasks/styles.js'

import settings from '~/setup/settings.js';

// Register all tasks seperately to be able to call them on their own
// for debug purposes and during watch cycle
gulp.task('templates', templates);
gulp.task('icons', icons);
gulp.task('styles', styles);

gulp.task('default', gulp.series(templates, icons, styles));

// Use develop to watch files and automatically run corresponding tasks
gulp.task('develop', gulp.series(templates, icons, styles, function watch() {
  gulp.watch('source/twig/**/*', templates);
  gulp.watch('source/svg/**/*', icons);
  gulp.watch('source/scss/**/*', styles);

  console.log('Watching styles, templates and icons ...');
}));
