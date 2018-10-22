import $ from 'jquery';
import { config } from 'grav-config';
import request from '../utils/request';

const URI = `${config.base_url_relative}/ajax.json/task${config.param_sep}getnewsfeed`;

class Feed {
    constructor() {
        this.data = null;
    }

    fetch(refresh = false, callback = function() {}) {
        request(URI, {
            method: 'post',
            body: { refresh }
        }, (response) => {
            this.data = response;
            callback(response);
        });
    }

    refresh(refresh = false) {
        const feed = $('#news-feed .widget-content');
        if (!feed.length) { return; }

        let loader = feed.find('.widget-loader');
        loader.find('div').remove();
        loader.find('.fa-warning').removeClass('fa-warning').addClass('fa-refresh fa-spin');
        loader.show();

        feed.find('> ul').hide();

        if (!this.data || this.data.error || refresh) {
            this.fetch(refresh, this.updateContent.bind(this));
        } else {
            this.updateContent();
        }
    }

    updateContent() {
        const feed = $('#news-feed .widget-content');
        if (!feed.length) { return; }

        let loader = feed.find('.widget-loader').hide();
        let content = feed.find('> ul').empty().show();

        if (this.data.error || this.data.status === 'error') {
            loader.show().find('div').remove();
            loader.find('.fa-refresh').removeClass('fa-refresh fa-spin').addClass('fa-warning');
            loader.append(`<div>${this.data.error ? this.data.error.message : this.data.message || 'Unable to download news feed'}</div>`);

            return;
        }

        if (this.data && this.data.feed_data) {
            this.data.feed_data.forEach((data) => {
                content.append(data);
            });
        }
    }
}

let feed = new Feed();
$(document).ready(() => feed.refresh());
$(document).on('click', '[data-refresh="feed"]', (event) => {
    event.preventDefault();
    feed.refresh(true);
});

export default feed;
