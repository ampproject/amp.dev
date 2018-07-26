import gulp from 'gulp';
import sass from 'gulp-sass';
import multiDest from 'gulp-multi-dest';

import settings from '~/setup/settings.js';

/**
 * Builds the sass files to CSS
 */
export default function styles(done) {
    let stream = gulp.src(settings.styles.src)
                     .pipe(sass(settings.styles.options).on('error', sass.logError));

    // Write the compiled styles to all destination folders. Optimizations like
    // minifying, combining of media queries should be done in a additional task
    // TODO: Implement optimize task
    stream.pipe(multiDest(settings.styles.dest));

    done();
}
