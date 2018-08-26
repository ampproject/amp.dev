/**
 * This is a plugin to override the `.refreshValidityState` method of
 * the Selectize library (https://selectize.github.io/selectize.js/).
 * The library is not maintained anymore (as of 2017-09-13) and contains
 * a bug which causes Microsoft Edge to not work with selectized [required]
 * form fields. This plugin should be removed if
 * https://github.com/selectize/selectize.js/pull/1320 is ever merged
 * and a new version of Selectize gets released.
 */

import Selectize from 'selectize';

Selectize.define('required-fix', function(options) {
    this.refreshValidityState = () => {
        if (!this.isRequired) return false;

        let invalid = !this.items.length;
        this.isInvalid = invalid;

        if (invalid) {
            this.$control_input.attr('required', '');
            this.$input.removeAttr('required');
        } else {
            this.$control_input.removeAttr('required');
            this.$input.attr('required');
        }
    };
});
