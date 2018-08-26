import $ from 'jquery';
import getSlug from 'speakingurl';

// jQuery no parents filter
$.expr[':']['noparents'] = $.expr.createPseudo((text) => (element) => $(element).parents(text).length < 1);

// Slugify
// CommonJS and ES6 version of https://github.com/madflow/jquery-slugify
$.fn.slugify = (source, options) => {
    return this.each((element) => {
        let target = $(element);
        let source = $(source);

        target.on('keyup change', () => {
            target.data('locked', target.val() !== '' && target.val() !== undefined);
        });

        source.on('keyup change', () => {
            if (target.data('locked') === true) { return true; }

            let isInput = target.is('input') || target.is('textarea');
            target[isInput ? 'val' : 'text']($.slugify(source.val(), options));
        });
    });
};

// Static method.
$.slugify = (sourceString, options) => {
    options = $.extend({}, $.slugify.options, options);
    options.lang = options.lang || $('html').prop('lang');

    if (typeof options.preSlug === 'function') {
        sourceString = options.preSlug(sourceString);
    }

    sourceString = options.slugFunc(sourceString, options);

    if (typeof options.postSlug === 'function') {
        sourceString = options.postSlug(sourceString);
    }

    return sourceString;
};

// Default plugin options
$.slugify.options = {
    preSlug: null,
    postSlug: null,
    slugFunc: (input, opts) => getSlug(input, opts)
};
