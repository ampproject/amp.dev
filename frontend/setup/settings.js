import yargs from 'yargs';

/**
 * These settings are meant to define sensible defaults for each of the tasks
 * defined inside ~setup/tasks/. This pattern provides the ability to easily
 * change settings based on environments and flags.
 * @type {Object}
 */
const settings = {
    'clean': {
      'src': [
        '../macros/**/*',
        '../partials/**/*',
        '../templates/**/*',
        '../views/**/*',
        '../css/**'
      ]
    },
    'styles': {
        'src': 'source/scss/bundles/*.scss',
        'dest': [
            '../css/',
        ],
        'options': {
            'outputStyle': 'compact'
        }
    },
    'templates': {
      'src': 'source/j2/**/*.j2',
      'dest': '../'
    },
    'icons': {
      'src': 'source/svg/icons/**/*.svg',
      'dest': './partials/icons/'
    }
};

// Settings that take effect as soon as the --production flag is set while
// running the gulp task
if (yargs.argv.production) {
	settings['styles'].options.outputStyle = 'compressed';
}

export default settings;
