import $ from 'jquery';

/* Dependencies for checking if changes happened since load on a form
import toastr from '../utils/toastr';
import { translations } from 'grav-config';
import { Instance as FormState } from './state';
*/

export default class Form {
    constructor(form) {
        this.form = $(form);
        if (!this.form.length || this.form.prop('tagName').toLowerCase() !== 'form') { return; }

        /* Option for not saving while nothing in a form has changed

        this.form.on('submit', (event) => {
            if (FormState.equals()) {
                event.preventDefault();
                toastr.info(translations.PLUGIN_ADMIN.NOTHING_TO_SAVE);
            }
        }); */

        this._attachShortcuts();
        this._attachToggleables();
        this._attachDisabledFields();
        this._submitUncheckedFields();

        this.observer = new MutationObserver(this.addedNodes);
        this.form.each((index, form) => this.observer.observe(form, { subtree: true, childList: true }));
    }

    _attachShortcuts() {
        // CTRL + S / CMD + S - shortcut for [Save] when available
        let saveTask = $('#titlebar [name="task"][value="save"]');

        if (saveTask.length) {
            $(global).on('keydown', function(event) {
                const key = String.fromCharCode(event.which).toLowerCase();
                if (!event.shiftKey && ((event.ctrlKey && !event.altKey) || event.metaKey) && key === 's') {
                    event.preventDefault();
                    saveTask.click();
                }
            });
        }
    }

    _attachToggleables() {
        let query = '[data-grav-field="toggleable"] input[type="checkbox"]';

        this.form.on('change', query, (event) => {
            let toggle = $(event.target);
            let enabled = toggle.is(':checked');
            let parent = toggle.closest('.form-field');
            let label = parent.find('label.toggleable');
            let fields = parent.find('.form-data');
            let inputs = fields.find('input, select, textarea, button');

            label.add(fields).css('opacity', enabled ? '' : 0.7);
            inputs.map((index, input) => {
                let isSelectize = input.selectize;
                input = $(input);

                if (isSelectize) {
                    isSelectize[enabled ? 'enable' : 'disable']();
                } else {
                    input.prop('disabled', !enabled);
                }
            });
        });

        this.form.find(query).trigger('change');
    }

    _attachDisabledFields() {
        let prefix = '.form-field-toggleable .form-data';
        let query = [];

        ['input', 'select', 'label[for]', 'textarea', '.selectize-control'].forEach((item) => {
            query.push(`${prefix} ${item}`);
        });

        this.form.on('mousedown', query.join(', '), (event) => {
            let input = $(event.target);
            let isFor = input.prop('for');
            let isSelectize = (input.hasClass('selectize-control') || input.parents('.selectize-control')).length;

            if (isFor) { input = $(`[id="${isFor}"]`); }
            if (isSelectize) { input = input.closest('.selectize-control').siblings('select[name]'); }

            if (!input.prop('disabled')) { return true; }

            let toggle = input.closest('.form-field').find('[data-grav-field="toggleable"] input[type="checkbox"]');
            toggle.trigger('click');
        });
    }

    _submitUncheckedFields() {
        let submitted = false;
        this.form.each((index, form) => {
            form = $(form);
            form.on('submit', () => {
                // workaround for MS Edge, submitting multiple forms at the same time
                if (submitted) { return false; }

                let formId = form.attr('id');
                let unchecked = form.find('input[type="checkbox"]:not(:checked):not(:disabled)');
                let submit = form.find('[type="submit"]').add(`[form="${formId}"][type="submit"]`);

                if (!unchecked.length) { return true; }

                submit.addClass('pointer-events-disabled');
                unchecked.each((index, element) => {
                    element = $(element);
                    let name = element.prop('name');
                    let fake = $(`<input type="hidden" name="${name}" value="0" />`);
                    form.append(fake);
                });
                submitted = true;
                return true;
            });
        });
    }

    addedNodes(mutations) {
        mutations.forEach((mutation) => {
            if (mutation.type !== 'childList') { return; }

            if (mutation.addedNodes) {
                $('body').trigger('mutation._grav', mutation.target, mutation, this);
            }

            if (mutation.removedNodes) {
                $('body').trigger('mutation_removed._grav', { target: mutation.target, mutation }, this);
            }
        });
    }
}

export let Instance = new Form('form#blueprints');
