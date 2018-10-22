import $ from 'jquery';
import forIn from 'mout/object/forIn';
// import { config } from 'grav-config';

const Data = {};
export default class SelectUniqueField {

    constructor(options) {
        const body = $('body');
        this.items = $();
        this.options = Object.assign({}, this.defaults, options);

        $('[data-select-observe]').each((index, element) => this.addSelect(element)).last().trigger('change', { load: true });
        body.on('mutation._grav', this._onAddedNodes.bind(this));
        body.on('mutation_removed._grav', this._onRemovedNodes.bind(this));
    }

    _onAddedNodes(event, target, record, instance) {
        let fields = $(target).find('[data-select-observe]');
        if (!fields.length) { return; }

        fields.each((index, field) => {
            field = $(field);
            if (!~this.items.index(field)) {
                this.addSelect(field);
            }
        });
    }

    _onRemovedNodes(event, data/* , instance */) {
        const target = $(data.target);
        const holder = target.data('collectionHolder');
        if (!holder) { return false; }

        const node = $(data.mutation.removedNodes);
        const value = node.find('[data-select-observe]').val();
        if (value) {
            Data[holder].state[value] = value;
        }

        target.find('[data-select-observe]').each((index, field) => {
            field = $(field);

            if (field.val() !== value) {
                this.updateOptions(field);
            }
        });
    }

    addSelect(element) {
        this.items = this.items.add(element);
        element = $(element);

        const value = element.attr('value');
        const holder = element.closest('[data-collection-holder]').data('collectionHolder');
        const options = element.closest('[data-select-unique]').data('selectUnique');

        if (!Data[holder]) {
            let data = {};
            if (Array.isArray(options)) {
                options.slice(0).map((item) => { data[item] = item; });
            } else {
                data = Object.assign({}, options);
            }

            Data[holder] = { original: null, state: null };
            Data[holder].original = Object.assign({}, data);
            Data[holder].state = Object.assign({}, data);
        }

        this.updateOptions(element);

        element.data('originalValue', value);
        element.on('change', (event, extras) => {
            const target = $(event.currentTarget);
            if (target.data('dummyChange')) {
                target.data('dummyChange', false);
                return false;
            }

            this.refreshOptions(target, extras && extras.load ? null : element.data('originalValue'));
            element.data('originalValue', target.val());
        });
    }

    updateOptions(element) {
        element = $(element);
        const value = element.attr('value');
        const holder = element.closest('[data-collection-holder]').data('collectionHolder');

        forIn(Data[holder].state, (v, k) => {
            const selected = k === value ? 'selected="selected"' : '';

            if (element.get(0).selectize) {
                const selectize = element.data('selectize');
                selectize.removeOption(k);
                selectize.addOption({ value: k, text: v });
            } else {
                element.append(`<option value="${k}" ${selected}>${v}</option>`);
            }

            if (selected) {
                if (element.get(0).selectize) {
                    const selectize = element.data('selectize');
                    selectize.setValue(k);
                }
                delete Data[holder].state[value];
            }
        });
    }

    refreshOptions(element, originalValue) {
        const value = element.val();
        const holder = element.closest('[data-collection-holder]').data('collectionHolder');
        delete Data[holder].state[value];

        if (originalValue && Data[holder].original[originalValue]) {
            Data[holder].state[originalValue] = Data[holder].original[originalValue];
        }

        this.items.each((index, select) => {
            select = $(select);
            if (select[0] === element[0]) { return; }

            const selectedValue = select.val();
            select.data('dummyChange', true);

            if (select.get(0).selectize) {
                const selectize = select.data('selectize');

                if (selectize) {
                    selectize.clearOptions();

                    if (selectedValue) {
                        selectize.addOption({
                            value: selectedValue,
                            text: Data[holder].original[selectedValue] || selectedValue
                        });
                    }

                    forIn(Data[holder].state, (v, k) => {
                        selectize.addOption({ value: k, text: v });
                    });

                    selectize.setValue(selectedValue, true);
                }
            } else {
                select.empty();
                forIn(Data[holder].state, (v, k) => {
                    const selected = k === selectedValue ? 'selected="selected"' : '';
                    select.append(`<option value="${k}" ${selected}>${v}</option>`);
                });
            }

            select.data('dummyChange', false);
        });
    }
}

export let Instance = new SelectUniqueField();
