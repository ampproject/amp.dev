import $ from 'jquery';
import 'selectize';
import '../../utils/selectize-required-fix';

export default class SelectizeField {
    constructor(options = {}) {
        this.options = Object.assign({}, options);
        this.elements = [];

        $('[data-grav-selectize]').each((index, element) => this.add(element));
        $('body').on('mutation._grav', this._onAddedNodes.bind(this));
    }

    add(element) {
        element = $(element);
        let tag = element.prop('tagName').toLowerCase();
        let isInput = tag === 'input' || tag === 'select';

        let data = (isInput ? element.closest('[data-grav-selectize]') : element).data('grav-selectize') || {};
        let field = (isInput ? element : element.find('input, select'));

        if (!field.length || field.get(0).selectize) { return; }
        const plugins = $.merge(data.plugins ? data.plugins : [], ['required-fix']);
        field.selectize($.extend({}, data, { plugins }));

        this.elements.push(field.data('selectize'));
    }

    _onAddedNodes(event, target/* , record, instance */) {
        let fields = $(target).find('select.fancy, input.fancy, [data-grav-selectize]');
        if (!fields.length) { return; }

        fields.each((index, field) => this.add(field));
    }
}

export let Instance = new SelectizeField();
