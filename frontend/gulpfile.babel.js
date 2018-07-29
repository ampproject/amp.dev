import gulp from 'gulp';
import styles from '~/setup/tasks/styles.js'

import settings from '~/setup/settings.js';

// Register all tasks seperately to be able to call them on their own
// for debug purposes and during watch cycle
gulp.task('styles', styles);

gulp.task('default', gulp.series('styles'));

// Use develop to watch files and automatically run corresponding tasks
gulp.task('develop', gulp.series(styles, function watch() {
    gulp.watch('source/scss/**/*', styles);
    console.log('Watching styles ...');
}));