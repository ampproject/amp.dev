import $ from 'jquery';
import GeminiScrollbar from 'gemini-scrollbar';

const defaults = {
    autoshow: false,
    createElements: true,
    forceGemini: false
};

export default class Scrollbar {
    constructor(element, options) {
        this.element = $(element);
        this.created = false;
        if (!this.element.length) { return; }

        this.options = Object.assign({}, defaults, options, { element: this.element[0] });

        this.element.css('overflow', 'auto');
        this.instance = new GeminiScrollbar(this.options);
        this.create();
        this.element.data('scrollbar', this.instance);
    }

    create() {
        this.instance.create();
        this.created = true;
    }

    update() {
        if (!this.created) { return false; }
        this.instance.update();
    }

    destroy() {
        if (!this.created) { return false; }
        this.instance.destroy();
    }
}

export let Instance = new Scrollbar('#admin-main .content-wrapper');
