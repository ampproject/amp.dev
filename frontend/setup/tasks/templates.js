import gulp from 'gulp';

import settings from '~/setup/settings.js';

/**
 * Builds the sass files to CSS
 */
export default function templates(done) {
    let stream = gulp.src(settings.templates.src);

    // TODO: Maybe further optimize the templates here. For example remove
    // default attributes, shorten class names and so on...
    stream.pipe(gulp.dest(settings.templates.dest));

    done();
}
