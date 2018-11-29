import gulp from 'gulp';

import settings from '~/setup/settings.js';

/**
 * Moves the icons from source/svg to a place where they are accessible
 * by the icons
 */
export default function icons(done) {
    let stream = gulp.src(settings.icons.src);

    // TODO: Minify and/or optimize the icons here before moving them
    stream.pipe(gulp.dest(settings.icons.dest));

    done();
}
