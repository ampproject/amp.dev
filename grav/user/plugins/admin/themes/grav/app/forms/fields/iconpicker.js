import $ from 'jquery';

/* Icon Picker by QueryLoop
 * Author: @eliorivero
 * URL: http://queryloop.com/
 * License: GPLv2
 */

var defaults = {
    'mode': 'dialog', // show overlay 'dialog' panel or slide down 'inline' panel
    'closeOnPick': true, // whether to close panel after picking or 'no'
    'save': 'class', // save icon 'class' or 'code'
    'size': '',
    'classes': {
        'launcher': '', // extra classes for launcher buttons
        'clear': 'remove-times', // extra classes for button that removes preview and clears field
        'highlight': '', // extra classes when highlighting an icon
        'close': '' // extra classes for close button
    },
    'iconSets': { // example data structure. Used to specify which launchers will be created
        'genericon': 'Genericon', // create a launcher to pick genericon icons
        'fa': 'FontAwesome' // create a launcher to pick fontawesome icons
    }
};

class QL_Icon_Picker {

    constructor(element, options) {
        this.iconSet = '';
        this.iconSetName = '';
        this.$field = '';
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.init();
    }

    init() {
        var $brick = $(this.element);
        var pickerId = $brick.data('pickerid');
        var $preview = $('<div class="icon-preview icon-preview-' + pickerId + '" />');

        this.$field = $brick.find('input');

        // Add preview area
        this.makePreview($brick, pickerId, $preview);

        // Make button to clear field and remove preview
        this.makeClear(pickerId, $preview);

        // Make buttons that open the panel of icons
        this.makeLaunchers($brick, pickerId);

        // Prepare display styles, inline and dialog
        this.makeDisplay($brick);
    }

    makePreview($brick, pickerId, $preview) {
        var $icon = $('<i />');
        var iconValue = this.$field.val();

        $preview.prependTo($brick);
        $icon.prependTo($preview);
        if (iconValue !== '') {
            $preview.addClass('icon-preview-on');
            $icon.addClass(iconValue);
        }
    }

    makeClear(pickerId, $preview) {
        var base = this;
        var $clear = $('<a class="remove-icon ' + base.settings.classes.clear + '" />');

        // Hide button to remove icon and preview and append it to preview area
        $clear.hide().prependTo($preview);
        // If there's a icon saved in the field, show remove icon button
        if (base.$field.val() !== '') {
            $clear.show();
        }

        $preview.on('click', '.remove-icon', function(e) {
            e.preventDefault();
            base.$field.val('');
            $preview.removeClass('icon-preview-on').find('i').removeClass();
            $(this).hide();
        });
    }

    makeDisplay($brick) {
        var base = this;
        var close = base.settings.classes.close;
        var $body = $('body');

        var $close = $('<a href="#" class="icon-picker-close"/>');

        if (base.settings.mode === 'inline') {
            $brick.find('.icon-set').append($close).removeClass('dialog').addClass('ip-inline ' + base.settings.size).parent().addClass('icon-set-wrap');
        } else if (base.settings.mode === 'dialog') {
            $('.icon-set').addClass('dialog ' + base.settings.size);
            if ($('.icon-picker-overlay').length <= 0) {
                $body.append('<div class="icon-picker-overlay"/>').append($close);
            }
        }
        $body
            .on('click', '.icon-picker-close, .icon-picker-overlay', function(e) {
                e.preventDefault();
                base.closePicker($brick, $(base.iconSet), base.settings.mode);
            })
            .on('mouseenter mouseleave', '.icon-picker-close', function(e) {
                if (e.type === 'mouseenter') {
                    $(this).addClass(close);
                } else {
                    $(this).removeClass(close);
                }
            });
    }

    makeLaunchers($brick) {
        var base = this;
        var dataIconSets = $brick.data('iconsets');
        var iconSet;

        if (typeof dataIconSets === 'undefined') {
            dataIconSets = base.settings.iconSets;
        }
        for (iconSet in dataIconSets) {
            if (dataIconSets.hasOwnProperty(iconSet)) {
                $brick.append('<a class="launch-icons button ' + base.settings.classes.launcher + '" data-icons="' + iconSet + '">' + dataIconSets[iconSet] + '</a>');
            }
        }

        $brick.find('.launch-icons').on('click', function(e) {
            e.preventDefault();
            var $self = $(this);
            var theseIcons = $self.data('icons');

            base.iconSetName = theseIcons;
            base.iconSet = '.' + theseIcons + '-set';

            // Initialize picker
            base.iconPick($brick);

            // Show icon picker
            base.showPicker($brick, $(base.iconSet), base.settings.mode);
        });
    }

    iconPick($brick) {
        var base = this;
        var highlight = 'icon-highlight ' + base.settings.classes.highlight;

        $(base.iconSet).on('click', 'li', function(e) {
            e.preventDefault();
            var $icon = $(this);
            var icon = $icon.data(base.settings.save);

            // Mark as selected
            $('.icon-selected').removeClass('icon-selected');
            $icon.addClass('icon-selected');
            if (base.$field.data('format') === 'short') {
                icon = icon.slice(6);
            }

            // Save icon value to field
            base.$field.val(icon);

            // Close icon picker
            if (base.settings.closeOnPick) {
                base.closePicker($brick, $icon.closest(base.iconSet), base.settings.mode);
            }

            // Set preview
            base.setPreview($icon.data('class'));

            // Broadcast event passing the selected icon.
            $('body').trigger('iconselected.queryloop', icon);
        });
        $(base.iconSet).on('mouseenter mouseleave', 'li', function(e) {
            if (e.type === 'mouseenter') {
                $(this).addClass(highlight);
            } else {
                $(this).removeClass(highlight);
            }
        });
    }

    showPicker($brick, $icons, mode) {
        if (mode === 'inline') {
            $('.icon-set').removeClass('ip-inline-open');
            $brick.find($icons).toggleClass('ip-inline-open');
        } else if (mode === 'dialog') {
            $brick.find('.icon-picker-close').addClass('make-visible');
            $brick.find('.icon-picker-overlay').addClass('make-visible');
            $icons.addClass('dialog-open');
        }

        $icons.find('.icon-selected').removeClass('icon-selected');
        var selectedIcon = this.$field.val().replace(' ', '.');
        if (selectedIcon !== '') {
            if (this.settings.save === 'class') {
                $icons.find('.' + selectedIcon).addClass('icon-selected');
            } else {
                $icons.find('[data-code="' + selectedIcon + '"]').addClass('icon-selected');
            }
        }
        // Broadcast event when the picker is shown passing the picker mode.
        $('body').trigger('iconpickershow.queryloop', mode);
    }

    closePicker($brick, $icons, mode) {
        // Remove event so they don't fire from a different picker
        $(this.iconSet).off('click', 'li');

        if (mode === 'inline') {
            $brick.find($icons).removeClass('ip-inline-open');
        } else if (mode === 'dialog') {
            $('.icon-picker-close, .icon-picker-overlay').removeClass('make-visible');
        }
        // Broadcast event when the picker is closed passing the picker mode.
        $('body').trigger('iconpickerclose.queryloop', mode);
        $('.icon-set').removeClass('dialog-open');
    }

    setPreview(preview) {
        var $preview = $(this.element).find('.icon-preview');

        $preview.addClass('icon-preview-on').find('i').removeClass()
            .addClass(this.iconSetName)
            .addClass(preview);
        $preview.find('a').show();
    }
}

/* Grav */
// extend $ with 3rd party QL Icon Picker
$.fn.qlIconPicker = function(options) {
    this.each(function() {
        if (!$.data(this, 'plugin_qlIconPicker')) {
            $.data(this, 'plugin_qlIconPicker', new QL_Icon_Picker(this, options));
        }
    });

    return this;
};

export default class IconpickerField {

    constructor(options) {
        this.items = $();
        this.options = Object.assign({}, this.defaults, options);

        $('[data-grav-iconpicker]').each((index, element) => this.addItem(element));
        $('body').on('mutation._grav', this._onAddedNodes.bind(this));
    }

    _onAddedNodes(event, target/* , record, instance */) {
        let fields = $(target).find('[data-grav-iconpicker]');
        if (!fields.length) { return; }

        fields.each((index, field) => {
            field = $(field);
            if (!~this.items.index(field)) {
                this.addItem(field);
            }
        });
    }

    addItem(element) {
        element = $(element);
        this.items = this.items.add(element);
        element.find('.icon-picker').qlIconPicker({
            'save': 'class'
        });

        // hack to remove extra icon sets that are just copies
        $('.icon-set:not(:first)').remove();
    }
}

export let Instance = new IconpickerField();

// Fix to close the dialog when clicking outside
$(document).on('click', (event) => {
    const target = $(event.target);
    const match = '.icon-set.dialog-open, .launch-icons[data-icons]';
    if (!target.is(match) && !target.closest(match).length) {
        const dialogs = $('.icon-set.dialog-open');

        // skip if there's no dialog open
        if (dialogs.length) {
            dialogs.each((index, dialog) => {
                const picker = $(dialog).siblings('.icon-picker');
                const data = picker.data('plugin_qlIconPicker');
                data.closePicker(picker, $(data.iconSet), data.settings.mode);
            });
        }
    }
});
