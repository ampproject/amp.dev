import $ from 'jquery';
import { config } from 'grav-config';
import 'eonasdan-bootstrap-datetimepicker';

export default class DateTimeField {

    get defaults() {
        return {
            showTodayButton: true,
            showClear: true,
            locale: config.language || 'en',
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar-o',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-bullseye',
                clear: 'fa fa-trash-o',
                close: 'fa fa-remove'
            }
        };
    }

    constructor(options) {
        this.items = $();
        this.options = Object.assign({}, this.defaults, options);

        $('[data-grav-datetime]').each((index, field) => this.addItem(field));
        $('body').on('mutation._grav', this._onAddedNodes.bind(this));

    }

    addItem(list) {
        list = $(list);
        this.items = this.items.add(list);

        if (list.data('DateTimePicker')) { return; }

        let options = Object.assign({}, this.options, list.data('grav-datetime') || {});
        list.datetimepicker(options).on('dp.show dp.update', this._disableDecades);
        list.siblings('.field-icons').on('click', () => list.mousedown().focus());
    }

    _onAddedNodes(event, target/* , record, instance */) {
        let fields = $(target).find('[data-grav-datetime]');
        if (!fields.length) { return; }

        fields.each((index, field) => {
            field = $(field);
            if (!~this.items.index(field)) {
                this.addItem(field);
            }
        });
    }

    _disableDecades() {
        $('.datepicker-years .picker-switch').removeAttr('title').on('click', (e) => e.stopPropagation());
    }
}

export let Instance = new DateTimeField();
