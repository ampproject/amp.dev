import $ from 'jquery';
import Sortable from 'sortablejs';

let body = $('body');

class Template {
    constructor(container) {
        this.container = $(container);

        if (this.getName() === undefined) {
            this.container = this.container.closest('[data-grav-array-name]');
        }
    }

    getName() {
        return this.container.data('grav-array-name') || '';
    }

    getKeyPlaceholder() {
        return this.container.data('grav-array-keyname') || 'Key';
    }

    getValuePlaceholder() {
        return this.container.data('grav-array-valuename') || 'Value';
    }

    isValueOnly() {
        return this.container.find('[data-grav-array-mode="value_only"]:first').length || false;
    }

    isTextArea() {
        return this.container.data('grav-array-textarea') || false;
    }

    shouldBeDisabled() {
        // check for toggleables, if field is toggleable and it's not enabled, render disabled
        let toggle = this.container.closest('.form-field').find('[data-grav-field="toggleable"] input[type="checkbox"]');
        return toggle.length && toggle.is(':not(:checked)');
    }

    getNewRow() {
        let tpl = '';const value = this.isTextArea()
            ? `<textarea ${this.shouldBeDisabled() ? 'disabled="disabled"' : ''} data-grav-array-type="value" name="" placeholder="${this.getValuePlaceholder()}"></textarea>`
            : `<input ${this.shouldBeDisabled() ? 'disabled="disabled"' : ''} data-grav-array-type="value" type="text" name="" value=""  placeholder="${this.getValuePlaceholder()}" />`;

        if (this.isValueOnly()) {
            tpl += `
            <div class="form-row array-field-value_only" data-grav-array-type="row">
                <span data-grav-array-action="sort" class="fa fa-bars"></span>
                ${value}
            `;
        } else {
            tpl += `
            <div class="form-row" data-grav-array-type="row">
                <span data-grav-array-action="sort" class="fa fa-bars"></span>
                <input ${this.shouldBeDisabled() ? 'disabled="disabled"' : ''} data-grav-array-type="key" type="text" value="" placeholder="${this.getKeyPlaceholder()}" />
                ${value}
            `;
        }

        tpl += `
            <span data-grav-array-action="rem" class="fa fa-minus"></span>
            <span data-grav-array-action="add" class="fa fa-plus"></span>
        </div>`;

        return tpl;
    }
}

export default class ArrayField {
    constructor() {
        body.on('input', '[data-grav-array-type="key"], [data-grav-array-type="value"]', (event) => this.actionInput(event));
        body.on('click touch', '[data-grav-array-action]:not([data-grav-array-action="sort"])', (event) => this.actionEvent(event));

        this.arrays = $();

        $('[data-grav-field="array"]').each((index, list) => this.addArray(list));
        $('body').on('mutation._grav', this._onAddedNodes.bind(this));
    }

    addArray(list) {
        list = $(list);

        list.find('[data-grav-array-type="container"]').each((index, container) => {
            container = $(container);
            if (container.data('array-sort') || container[0].hasAttribute('data-array-nosort')) { return; }

            container.data('array-sort', new Sortable(container.get(0), {
                handle: '.fa-bars',
                animation: 150
            }));
        });
    }

    actionInput(event) {
        let element = $(event.target);
        let type = element.data('grav-array-type');

        this._setTemplate(element);

        let template = element.data('array-template');
        let keyElement = type === 'key' ? element : element.siblings('[data-grav-array-type="key"]:first');
        let valueElement = type === 'value' ? element : element.siblings('[data-grav-array-type="value"]:first');

        let escaped_name = !template.isValueOnly() ? keyElement.val() : this.getIndexFor(element);
        escaped_name = escaped_name.toString().replace(/\[/g, '%5B').replace(/]/g, '%5D');
        let name = `${template.getName()}[${escaped_name}]`;
        valueElement.attr('name', !valueElement.val() ? template.getName() : name);

        this.refreshNames(template);
    }

    actionEvent(event) {
        event && event.preventDefault();
        let element = $(event.target);
        let action = element.data('grav-array-action');
        let container = element.parents('[data-grav-array-type="container"]');

        this._setTemplate(element);

        this[`${action}Action`](element);

        let siblings = container.find('> div');
        container[siblings.length > 1 ? 'removeClass' : 'addClass']('one-child');
    }

    addAction(element) {
        let template = element.data('array-template');
        let row = element.closest('[data-grav-array-type="row"]');

        row.after(template.getNewRow());
    }

    remAction(element) {
        let template = element.data('array-template');
        let row = element.closest('[data-grav-array-type="row"]');
        let isLast = !row.siblings().length;

        if (isLast) {
            let newRow = $(template.getNewRow());
            row.after(newRow);
            newRow.find('[data-grav-array-type="value"]:last').attr('name', template.getName());
        }

        row.remove();
        this.refreshNames(template);
    }

    refreshNames(template) {
        if (!template.isValueOnly()) { return; }

        let row = template.container.find('> div > [data-grav-array-type="row"]');
        let inputs = row.find('[name]:not([name=""])');

        inputs.each((index, input) => {
            input = $(input);
            let name = input.attr('name');
            name = name.replace(/\[\d+\]$/, `[${index}]`);
            input.attr('name', name);
        });

        if (!inputs.length) {
            row.find('[data-grav-array-type="value"]').attr('name', template.getName());
        }
    }

    getIndexFor(element) {
        let template = element.data('array-template');
        let row = element.closest('[data-grav-array-type="row"]');

        return template.container.find(`${template.isValueOnly() ? '> div ' : ''} > [data-grav-array-type="row"]`).index(row);
    }

    _setTemplate(element) {
        if (!element.data('array-template')) {
            element.data('array-template', new Template(element.closest('[data-grav-array-name]')));
        }
    }

    _onAddedNodes(event, target/* , record, instance */) {
        let arrays = $(target).find('[data-grav-field="array"]');
        if (!arrays.length) { return; }

        arrays.each((index, list) => {
            list = $(list);
            if (!~this.arrays.index(list)) {
                this.addArray(list);
            }
        });
    }
}

export let Instance = new ArrayField();
