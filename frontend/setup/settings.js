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
            './build/assets/css/',
        ],
        'options': {
            'outputStyle': 'expanded'
        }
    }
};

// TODO: Maybe overwrite settings for other environments.

export default settings;
