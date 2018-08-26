import $ from 'jquery';
import { config, uri_params } from 'grav-config';
import request from '../utils/request';

export default class Filter {
    constructor() {
        this.URI = `${config.base_url_relative}/media-manager/`;
    }

    filter(name, value) {
        let filtered = [];
        let keys = Object.keys(uri_params);
        if (!~keys.indexOf(name)) { keys.push(name); }

        keys.forEach((key) => {
            let filter = Filter.cleanValue(key === name ? value : uri_params[key]);
            if (filter !== '*') {
                filtered.push(`${key}${config.param_sep}${filter}`);
            }
        });

        global.location = this.URI + filtered.join('/');
    }

    static cleanValue(value) {
        return encodeURIComponent(value.replace('/', '\\'));
    }
}

export let Instance = new Filter();
var isLoading = false;

var filters = {};
var global_index = 1;
var files_ended = false;
const MEDIA_PAGINATION_INTERVAL = 20;

/* handle changing file type / date filter */
$('body').on('change', '.thumbs-list-container select.filter', (event) => {
    let target = $(event.currentTarget);
    let filterName = target.data('name');
    let filterValue = target.val();

    if (filterValue) {
        filters[filterName] = filterValue;
    } else {
        delete filters[filterName];
    }

    filterFiles();
});

/* initialize media uploader */
if ($('.thumbs-list-container .dropzone')[0]) {
    $('.thumbs-list-container .dropzone')[0].dropzone.on('queuecomplete', function() {
        let body = {};
        if (filters.page) { body.page = filters.page; }
        if (filters.date) { body.date = filters.date; }
        if (filters.type) { body.type = filters.type; }

        $('.dropzone')[0].dropzone.files.forEach(function(file) { file.previewElement.remove(); });
        $('.dropzone').first().removeClass('dz-started');

        request(config.base_url_relative + '/media-manager.json/task:clearMediaCache', { method: 'post', body }, () => {
            filterFiles();
        });
    });
}

/* handle loading media */
var loadMedia = function loadMedia(filters, callback) {
    var url = config.base_url_relative + '/media.json/tmpl:media-list-content/index:' + global_index;

    if (filters.page) {
        url += '/page:' + (filters.page).split('/').join('%5C');
    }
    if (filters.type && filters.type !== '*') {
        url += '/type:' + filters.type;
    }
    if (filters.date && filters.date !== '*') {
        url += '/date:' + filters.date;
    }

    if (!isLoading) {
        isLoading = true;

        $('.spinning-wheel').show();
        $.get(url, function(content) {
            $('.js__files').append(content);
            $('.spinning-wheel').hide();
            $('.media-container .media-range').trigger('change');
            isLoading = false;
            global_index++;

            callback(content);
        });
    }
};

var cleanFilesList = function cleanFilesList() {
    $('.js__files .card-item').remove();
};

var resetActiveStateInSidebar = function resetActiveStateInSidebar() {
    $('.pages-list-container .row').removeClass('active'); // clear active state in sidebar
};

var showEmptyState = function showEmptyState() {
    $('.thumbs-list-container').append('<p class="card-item empty-space">No media found</p>');
};

var filterFiles = function filterFiles() {
    cleanFilesList();
    global_index = 0;
    files_ended = false;
    $('.empty-space').remove();
    loadMedia(filters, function(content) {
        if (!content.trim().length) {
            showEmptyState();
        } else {
            if (!filters.page && (!filters.date || filters.date === '*') && (!filters.type || filters.type === '*')) {
                $('.js__files').trigger('fillView');
            }
        }
    });
};

/* handle changing page */
$('body').on('click', '.pages-list-container .js__page-link', (event) => {
    var page = $(event.target).data('page');
    filters['page'] = page;

    $('.media-list-title .page-indicator').html(page); // set indication
    $('.js__reset-pages-filter').removeClass('hidden'); // activate reset pages icon
    resetActiveStateInSidebar();
    $(event.target).parents('.row').addClass('active'); // set active state in sidebar
    $('.js__file-uploader').removeClass('hidden');

    // customize processing URL, as the page changes dynamically
    if ($('.dropzone')[0]) {
        $('.dropzone')[0].dropzone.on('processing', function(file) {
            this.options.url = `${config.base_url_relative}/media-manager${page}.json/task${config.param_sep}addmedia`;
        });
    }

    $('.js__button-clear-media-cache').addClass('hidden');
    filterFiles();

    disableInfiniteScrolling(); // only infinite scroll on main list, not inside single pages
});

/* handle clearing page filter */
$('body').on('click', '.js__reset-pages-filter', (event) => {
    $('.media-list-title .page-indicator').html('All Pages'); // set indication
    cleanFilesList();
    resetActiveStateInSidebar();
    $('.js__reset-pages-filter').addClass('hidden'); // remove reset pages icon
    $('.js__file-uploader').addClass('hidden');
    $('.js__button-clear-media-cache').removeClass('hidden');
    delete filters['page'];

    filterFiles();
});

/* handle infinite loading */
var enableInfiniteScrolling = function enableInfiniteScrolling() {
    $('.spinning-wheel').hide();
    var view = $('.mediapicker-scroll').last();
    var gemini = view.data('scrollbar');
    if (gemini) {
        gemini = gemini.getViewElement();
    }

    if (!gemini || !gemini.length && !view.length) { return; }

    $(gemini || view).on('scroll', function() {
        if (($(this).scrollTop() + $(this).innerHeight() + 100) >= $(this)[0].scrollHeight) {
            fillView();
        }
    });
};

var loadNextBatch = function loadNextBatch(callback) {
    if (files_ended) {
        return;
    }

    loadMedia({}, function(content) {
        if (!$(content).length || ((content.split('card-item').length - 1) < MEDIA_PAGINATION_INTERVAL)) {
            files_ended = true;
        } else {
            if (callback) {
                callback();
            }
        }

        $('.media-container .media-range').trigger('input');
    });
};

var fillView = function fillView() {
    if (!$('.js__files').find('.card-item').last().offset()) {
        setTimeout(function() {
            // retry later
            fillView();
        }, 300);

        return;
    }

    if ($('.js__files').find('.card-item').last().offset().top - 1 <= $('.media-container').height()) {
        loadNextBatch(function() {
            fillView();
        });
    }
};

/* disable infinite loading */
var disableInfiniteScrolling = function disableInfiniteScrolling() {
    $('.spinning-wheel').hide();
    $('.content-wrapper').unbind('scroll');
};

$('.js__files').on('fillView', function(event) {
    // the first batch got the max number of media files, try loading more
    if (($('.js__files')[0].innerHTML.split('card-item').length - 1) === MEDIA_PAGINATION_INTERVAL) {
        fillView();
        enableInfiniteScrolling();
    }
});
