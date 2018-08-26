import $ from 'jquery';
import '../utils/storage';

const sessionKey = 'grav:admin:pages';

if (!sessionStorage.getItem(sessionKey)) {
    sessionStorage.setItem(sessionKey, '{}');
}

export default class PagesTree {
    constructor(query, elements = undefined) {
        this.query = query;
        this.elements = $(elements !== undefined ? elements : this.query);
        this.session = JSON.parse(sessionStorage.getItem(sessionKey) || '{}');

        if (!this.elements.length) { return; }

        this.restore();

        this.elements.find('.page-icon').on('click', (event) => this.toggle(event.target));
        this.elements.data('tree_init', 1);

        $('[data-page-toggleall]').on('click', (event) => {
            let element = $(event.target).closest('[data-page-toggleall]');
            let action = element.data('page-toggleall');

            this[action]();
        });
    }

    reload() {
        const elements = $(this.query).filter((index, element) => !$(element).data('tree_init'));
        if (!elements.length) { return; }
        this.constructor(this.query, elements);
    }

    toggle(elements, dontStore = false) {
        if (typeof elements === 'string') {
            elements = $(`[data-nav-id="${elements}"]`).find('[data-toggle="children"]');
        }

        elements = $(elements || this.elements);
        elements.each((index, element) => {
            element = $(element);
            let state = this.getState(element.closest('[data-toggle="children"]'));
            this[state.isOpen ? 'collapse' : 'expand'](state.id, dontStore);
        });
    }

    collapse(elements, dontStore = false) {
        if (typeof elements === 'string') {
            elements = $(`[data-nav-id="${elements}"]`).find('[data-toggle="children"]');
        }

        elements = $(elements || this.elements);
        elements.each((index, element) => {
            element = $(element);
            let state = this.getState(element);

            if (state.isOpen) {
                state.children.hide();
                state.icon.removeClass('children-open').addClass('children-closed');
                if (!dontStore) { delete this.session[state.id]; }
            }
        });

        const scroller = elements.closest('.mediapicker-scroll');
        if (scroller.length && scroller.data('scrollbar')) {
            scroller.data('scrollbar').update();
        }

        if (!dontStore) { this.save(); }
    }

    expand(elements, dontStore = false) {
        if (typeof elements === 'string') {
            let element = $(`[data-nav-id="${elements}"]`);
            let parents = element.parents('[data-nav-id]');

            // loop back through parents, we don't want to expand an hidden child
            if (parents.length) {
                parents = parents.find('[data-toggle="children"]:first');
                parents = parents.add(element.find('[data-toggle="children"]:first'));
                return this.expand(parents, dontStore);
            }

            elements = element.find('[data-toggle="children"]:first');
        }

        elements = $(elements || this.elements);
        elements.each((index, element) => {
            element = $(element);
            let state = this.getState(element);

            if (!state.isOpen) {
                state.children.show();
                state.icon.removeClass('children-closed').addClass('children-open');
                if (!dontStore) { this.session[state.id] = 1; }
            }
        });

        const scroller = elements.closest('.mediapicker-scroll');
        if (scroller.length && scroller.data('scrollbar')) {
            scroller.data('scrollbar').update();
        }

        if (!dontStore) { this.save(); }
    }

    restore() {
        this.collapse(null, true);

        Object.keys(this.session).forEach((key) => {
            this.expand(key, 'no-store');
        });
    }

    save() {
        return sessionStorage.setItem(sessionKey, JSON.stringify(this.session));
    }

    getState(element) {
        element = $(element);

        return {
            id: element.closest('[data-nav-id]').data('nav-id'),
            children: element.closest('li.page-item').find('ul:first'),
            icon: element.find('.page-icon'),
            get isOpen() { return this.icon.hasClass('children-open'); }
        };
    }
}

let Instance = new PagesTree('[data-toggle="children"]');
export { Instance };
