/**
 * These settings are meant to define sensible defaults for each of the tasks
 * defined inside ~setup/tasks/. This pattern provides the ability to easily
 * change settings based on environments and flags.
 * @type {Object}
 */
const settings = {
    'styles': {
        'src': 'source/scss/bundles/*.scss',
        'dest': [
            './static/static/css/',
        ],
        'options': {
            'outputStyle': 'expanded'
        }
    },
    'templates': {
      'src': 'source/j2/**/*.j2',
      'dest': './'
    },
    'icons': {
      'src': 'source/svg/icons/**/*.svg',
      'dest': './partials/icons/'
    }
};

// TODO: Maybe overwrite settings for other environments.

export default settings;
