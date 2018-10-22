import $ from 'jquery';
import { config } from 'grav-config';
import request from '../utils/request';

const getUrl = (type = '') => {
    if (type) {
        type = `cleartype:${type}/`;
    }

    return `${config.base_url_relative}/cache.json/task${config.param_sep}clearCache/${type}admin-nonce${config.param_sep}${config.admin_nonce}`;
};

export default class Cache {
    constructor() {
        this.element = $('[data-clear-cache]');
        $('body').on('click', '[data-clear-cache]', (event) => this.clear(event, event.target));
    }

    clear(event, element) {
        let type = '';

        if (event && event.preventDefault) { event.preventDefault(); }
        if (typeof event === 'string') { type = event; }

        element = element ? $(element) : $(`[data-clear-cache-type="${type}"]`);
        type = type || $(element).data('clear-cache-type') || '';
        let url = element.data('clearCache') || getUrl(type);

        this.disable();

        request(url, () => this.enable());
    }

    enable() {
        this.element
            .removeAttr('disabled')
            .find('> .fa').removeClass('fa-refresh fa-spin').addClass('fa-trash');
    }

    disable() {
        this.element
            .attr('disabled', 'disabled')
            .find('> .fa').removeClass('fa-trash').addClass('fa-refresh fa-spin');
    }
}

let Instance = new Cache();

export { Instance };
