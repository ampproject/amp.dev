import $ from 'jquery';
import Dropzone from 'dropzone';
import EXIF from 'exif-js';
import request from '../../utils/request';
import { config, translations } from 'grav-config';

// translations
const Dictionary = {
    dictCancelUpload: translations.PLUGIN_ADMIN.DROPZONE_CANCEL_UPLOAD,
    dictCancelUploadConfirmation: translations.PLUGIN_ADMIN.DROPZONE_CANCEL_UPLOAD_CONFIRMATION,
    dictDefaultMessage: translations.PLUGIN_ADMIN.DROPZONE_DEFAULT_MESSAGE,
    dictFallbackMessage: translations.PLUGIN_ADMIN.DROPZONE_FALLBACK_MESSAGE,
    dictFallbackText: translations.PLUGIN_ADMIN.DROPZONE_FALLBACK_TEXT,
    dictFileTooBig: translations.PLUGIN_ADMIN.DROPZONE_FILE_TOO_BIG,
    dictInvalidFileType: translations.PLUGIN_ADMIN.DROPZONE_INVALID_FILE_TYPE,
    dictMaxFilesExceeded: translations.PLUGIN_ADMIN.DROPZONE_MAX_FILES_EXCEEDED,
    dictRemoveFile: translations.PLUGIN_ADMIN.DROPZONE_REMOVE_FILE,
    dictResponseError: translations.PLUGIN_ADMIN.DROPZONE_RESPONSE_ERROR
};

Dropzone.autoDiscover = false;
Dropzone.options.gravPageDropzone = {};
Dropzone.confirm = (question, accepted, rejected) => {
    let doc = $(document);
    let modalSelector = '[data-remodal-id="delete-media"]';

    let removeEvents = () => {
        doc.off('confirmation', modalSelector, accept);
        doc.off('cancellation', modalSelector, reject);

        $(modalSelector).find('.remodal-confirm').removeClass('pointer-events-disabled');
    };

    let accept = () => {
        accepted && accepted();
        removeEvents();
    };

    let reject = () => {
        rejected && rejected();
        removeEvents();
    };

    $.remodal.lookup[$(modalSelector).data('remodal')].open();
    doc.on('confirmation', modalSelector, accept);
    doc.on('cancellation', modalSelector, reject);
};

const DropzoneMediaConfig = {
    timeout: 0,
    thumbnailWidth: 200,
    thumbnailHeight: 150,
    addRemoveLinks: false,
    dictDefaultMessage: translations.PLUGIN_ADMIN.DROP_FILES_HERE_TO_UPLOAD.replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
    dictRemoveFileConfirmation: '[placeholder]',
    previewTemplate: `
        <div class="dz-preview dz-file-preview dz-no-editor">
          <div class="dz-details">
            <div class="dz-filename"><span data-dz-name></span></div>
            <div class="dz-size" data-dz-size></div>
            <img data-dz-thumbnail />
          </div>
          <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
          <div class="dz-success-mark"><span>✔</span></div>
          <div class="dz-error-mark"><span>✘</span></div>
          <div class="dz-error-message"><span data-dz-errormessage></span></div>
          <a class="dz-unset" title="${translations.PLUGIN_ADMIN.UNSET}" href="#" data-dz-unset>${translations.PLUGIN_ADMIN.UNSET}</a>
          <a class="dz-remove" title="${translations.PLUGIN_ADMIN.DELETE}" href="javascript:undefined;" data-dz-remove>${translations.PLUGIN_ADMIN.DELETE}</a>
          <a class="dz-metadata" title="${translations.PLUGIN_ADMIN.METADATA}" href="#" target="_blank" data-dz-metadata>${translations.PLUGIN_ADMIN.METADATA}</a>
          <a class="dz-view" title="${translations.PLUGIN_ADMIN.VIEW}" href="#" target="_blank" data-dz-view>${translations.PLUGIN_ADMIN.VIEW}</a>
        </div>`.trim()
};

global.EXIF = EXIF;

const ACCEPT_FUNC = function(file, done, settings) {
    const resolution = settings.resolution;
    if (!resolution) return done();

    setTimeout(() => {
        let error = '';
        if (resolution.min) {
            Object.keys(resolution.min).forEach((attr) => {
                if (resolution.min[attr] && file[attr] < resolution.min[attr]) {
                    error += translations.PLUGIN_FORM.RESOLUTION_MIN.replace(/{{attr}}/g, attr).replace(/{{min}}/g, resolution.min[attr]);
                }
            });
        }

        if (!(settings.resizeWidth || settings.resizeHeight)) {
            if (resolution.max) {
                Object.keys(resolution.max).forEach((attr) => {
                    if (resolution.max[attr] && file[attr] > resolution.max[attr]) {
                        error += translations.PLUGIN_FORM.RESOLUTION_MAX.replace(/{{attr}}/g, attr).replace(/{{max}}/g, resolution.max[attr]);
                    }
                });
            }
        }
        return error ? done(error) : done();
    }, 50);
};

export default class FilesField {
    constructor({ container = '.dropzone.files-upload', options = {} } = {}) {
        this.container = $(container);
        if (!this.container.length) { return; }

        this.urls = {};
        this.options = Object.assign({}, Dictionary, DropzoneMediaConfig, {
            klass: this,
            url: this.container.data('file-url-add') || config.current_url,
            acceptedFiles: this.container.data('media-types'),
            init: this.initDropzone
        }, this.container.data('dropzone-options'), options);

        this.options = Object.assign({}, this.options, {
            accept: function(file, done) { ACCEPT_FUNC(file, done, this.options); }
        });

        this.dropzone = new Dropzone(container, this.options);
        this.dropzone.on('complete', this.onDropzoneComplete.bind(this));
        this.dropzone.on('success', this.onDropzoneSuccess.bind(this));
        this.dropzone.on('removedfile', this.onDropzoneRemovedFile.bind(this));
        this.dropzone.on('sending', this.onDropzoneSending.bind(this));
        this.dropzone.on('error', this.onDropzoneError.bind(this));

        this.container.on('mouseenter', '[data-dz-view]', (e) => {
            const value = JSON.parse(this.container.find('[name][type="hidden"]').val() || '{}');
            const target = $(e.currentTarget);
            const file = target.parent('.dz-preview').find('.dz-filename');
            const filename = encodeURI(file.text());

            const URL = Object.keys(value).filter((key) => value[key].name === filename).shift();
            target.attr('href', `${config.base_url_simple}/${URL}`);
        });
    }

    initDropzone() {
        let files = this.options.klass.container.find('[data-file]');
        let dropzone = this;
        if (!files.length) { return; }

        files.each((index, file) => {
            file = $(file);
            let data = file.data('file');
            let mock = {
                name: data.name,
                size: data.size,
                type: data.type,
                status: Dropzone.ADDED,
                accepted: true,
                url: this.options.url,
                removeUrl: data.remove
            };

            dropzone.files.push(mock);
            dropzone.options.addedfile.call(dropzone, mock);
            if (mock.type.match(/^image\//)) {
                dropzone.options.thumbnail.call(dropzone, mock, data.path);
                dropzone.createThumbnailFromUrl(mock, data.path);
            }

            file.remove();
        });
    }

    getURI() {
        return this.container.data('mediaUri') || '';
    }

    onDropzoneSending(file, xhr, formData) {
        formData.append('name', this.options.dotNotation);
        formData.append('admin-nonce', config.admin_nonce);
        formData.append('task', 'filesupload');
        formData.append('uri', this.getURI());
    }

    onDropzoneSuccess(file, response, xhr) {
        response = typeof response === 'string' ? JSON.parse(response) : response;
        if (this.options.reloadPage) {
            global.location.reload();
        }

        // store params for removing file from session before it gets saved
        if (response.session) {
            file.sessionParams = response.session;
            file.removeUrl = this.options.url;

            // Touch field value to force a mutation detection
            const input = this.container.find('[name][type="hidden"]');
            const value = input.val();
            input.val(value + ' ');
        }

        return this.handleError({
            file,
            data: response,
            mode: 'removeFile',
            msg: `<p>${translations.PLUGIN_ADMIN.FILE_ERROR_UPLOAD} <strong>${file.name}</strong></p>
            <pre>${response.message}</pre>`
        });
    }

    onDropzoneComplete(file) {
        if (!file.accepted && !file.rejected) {
            let data = {
                status: 'error',
                message: `${translations.PLUGIN_ADMIN.FILE_UNSUPPORTED}: ${file.name.match(/\..+/).join('')}`
            };

            return this.handleError({
                file,
                data,
                mode: 'removeFile',
                msg: `<p>${translations.PLUGIN_ADMIN.FILE_ERROR_ADD} <strong>${file.name}</strong></p>
                <pre>${data.message}</pre>`
            });
        }

        if (this.options.reloadPage) {
            global.location.reload();
        }
    }

    b64_to_utf8(str) {
        str = str.replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(str)));
    }

    onDropzoneRemovedFile(file, ...extra) {
        if (!file.accepted || file.rejected) { return; }
        let url = file.removeUrl || this.urls.delete;
        let path = (url || '').match(/path:(.*)\//);
        let body = { filename: file.name, uri: this.getURI() };

        if (file.sessionParams) {
            body.task = 'filessessionremove';
            body.session = file.sessionParams;
        }

        request(url, { method: 'post', body }, () => {
            if (!path) { return; }

            path = this.b64_to_utf8(path[1]);
            let input = this.container.find('[name][type="hidden"]');
            let data = JSON.parse(input.val() || '{}');
            delete data[path];
            input.val(JSON.stringify(data));
        });
    }

    onDropzoneError(file, response, xhr) {
        let message = xhr ? response.error.message : response;
        $(file.previewElement).find('[data-dz-errormessage]').html(message);

        return this.handleError({
            file,
            data: { status: 'error' },
            msg: `<pre>${message}</pre>`
        });
    }

    handleError(options) {
        let { file, data, mode, msg } = options;
        if (data.status !== 'error' && data.status !== 'unauthorized') { return; }

        switch (mode) {
            case 'addBack':
                if (file instanceof File) {
                    this.dropzone.addFile.call(this.dropzone, file);
                } else {
                    this.dropzone.files.push(file);
                    this.dropzone.options.addedfile.call(this.dropzone, file);
                    this.dropzone.options.thumbnail.call(this.dropzone, file, file.extras.url);
                }

                break;
            case 'removeFile':
            default:
                if (~this.dropzone.files.indexOf(file)) {
                    file.rejected = true;
                    this.dropzone.removeFile.call(this.dropzone, file, { silent: true });
                }

                break;
        }

        let modal = $('[data-remodal-id="generic"]');
        modal.find('.error-content').html(msg);
        $.remodal.lookup[modal.data('remodal')].open();
    }
}

export function UriToMarkdown(uri) {
    uri = uri.replace(/@3x|@2x|@1x/, '');
    uri = uri.replace(/\(/g, '%28');
    uri = uri.replace(/\)/g, '%29');

    return uri.match(/\.(jpe?g|png|gif|svg|mp4|webm|ogv|mov)$/i) ? `![](${uri})` : `[${decodeURI(uri)}](${uri})`;
}

let instances = [];
let cache = $();
const onAddedNodes = (event, target/* , record, instance */) => {
    let files = $(target).find('.dropzone.files-upload');
    if (!files.length) { return; }

    files.each((index, file) => {
        file = $(file);
        if (!~cache.index(file)) {
            addNode(file);
        }
    });
};

const addNode = (container) => {
    container = $(container);
    let input = container.find('input[type="file"]');
    let settings = container.data('grav-file-settings') || {};

    if (settings.accept && ~settings.accept.indexOf('*')) {
        settings.accept = [''];
    }

    let options = {
        url: container.data('file-url-add') || (container.closest('form').attr('action') || config.current_url) + '.json',
        paramName: settings.paramName || 'file',
        dotNotation: settings.name || 'file',
        acceptedFiles: settings.accept ? settings.accept.join(',') : input.attr('accept') || container.data('media-types'),
        maxFilesize: typeof settings.filesize !== 'undefined' ? settings.filesize : 256,
        maxFiles: settings.limit || null,
        resizeWidth: settings.resizeWidth || null,
        resizeHeight: settings.resizeHeight || null,
        resizeQuality: settings.resizeQuality || null,
        accept: function(file, done) { ACCEPT_FUNC(file, done, settings); }
    };

    cache = cache.add(container);
    container = container[0];
    instances.push(new FilesField({ container, options }));
};

export let Instances = (() => {
    $('.dropzone.files-upload').each((i, container) => addNode(container));
    $('body').on('mutation._grav', onAddedNodes);

    return instances;
})();
