import $ from 'jquery';
import Dropzone from 'dropzone';
import EXIF from 'exif-js';
import { config, translations } from 'grav-form';

// translations
const Dictionary = {
    dictCancelUpload: translations.PLUGIN_FORM.DROPZONE_CANCEL_UPLOAD,
    dictCancelUploadConfirmation: translations.PLUGIN_FORM.DROPZONE_CANCEL_UPLOAD_CONFIRMATION,
    dictDefaultMessage: translations.PLUGIN_FORM.DROPZONE_DEFAULT_MESSAGE,
    dictFallbackMessage: translations.PLUGIN_FORM.DROPZONE_FALLBACK_MESSAGE,
    dictFallbackText: translations.PLUGIN_FORM.DROPZONE_FALLBACK_TEXT,
    dictFileTooBig: translations.PLUGIN_FORM.DROPZONE_FILE_TOO_BIG,
    dictInvalidFileType: translations.PLUGIN_FORM.DROPZONE_INVALID_FILE_TYPE,
    dictMaxFilesExceeded: translations.PLUGIN_FORM.DROPZONE_MAX_FILES_EXCEEDED,
    dictRemoveFile: translations.PLUGIN_FORM.DROPZONE_REMOVE_FILE,
    dictRemoveFileConfirmation: translations.PLUGIN_FORM.DROPZONE_REMOVE_FILE_CONFIRMATION,
    dictResponseError: translations.PLUGIN_FORM.DROPZONE_RESPONSE_ERROR
};

Dropzone.autoDiscover = false;

const DropzoneMediaConfig = {
    createImageThumbnails: { thumbnailWidth: 150 },
    addRemoveLinks: false,
    dictDefaultMessage: Dictionary.dictDefaultMessage,
    dictRemoveFileConfirmation: Dictionary.dictRemoveFileConfirmation,
    previewTemplate: ''
};

window.EXIF = EXIF;

export default class FilesField {
    constructor({ container = '.dropzone.files-upload', options = {} } = {}) {
        this.container = $(container);
        if (!this.container.length) { return; }

        this.urls = {};
        DropzoneMediaConfig.previewTemplate = $('#dropzone-template').html();
        this.options = Object.assign({}, Dictionary, DropzoneMediaConfig, {
            klass: this,
            url: this.container.data('file-url-add') || config.current_url,
            acceptedFiles: this.container.data('media-types'),
            init: this.initDropzone
        }, this.container.data('dropzone-options'), options);

        this.dropzone = new Dropzone(container, this.options);
        this.dropzone.on('complete', this.onDropzoneComplete.bind(this));
        this.dropzone.on('success', this.onDropzoneSuccess.bind(this));
        this.dropzone.on('removedfile', this.onDropzoneRemovedFile.bind(this));
        this.dropzone.on('sending', this.onDropzoneSending.bind(this));
        this.dropzone.on('error', this.onDropzoneError.bind(this));
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
            if (mock.type.match(/^image\//)) dropzone.options.thumbnail.call(dropzone, mock, data.path);

            file.remove();
        });
    }

    getURI() {
        return this.container.data('mediaUri') || '';
    }

    onDropzoneSending(file, xhr, formData) {
        formData.append('__form-name__', this.container.closest('form').find('[name="__form-name__"]').val());
        formData.append('__form-file-uploader__', 1);
        formData.append('name', this.options.dotNotation);
        formData.append('form-nonce', config.form_nonce);
        formData.append('task', 'filesupload');
        formData.append('uri', this.getURI());
    }

    onDropzoneSuccess(file, response, xhr) {
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
            msg: `<p>${translations.PLUGIN_FORM.FILE_ERROR_UPLOAD} <strong>${file.name}</strong></p>
            <pre>${response.message}</pre>`
        });
    }

    onDropzoneComplete(file) {
        if (!file.accepted && !file.rejected) {
            let data = {
                status: 'error',
                message: `${translations.PLUGIN_FORM.FILE_UNSUPPORTED}: ${file.name.match(/\..+/).join('')}`
            };

            return this.handleError({
                file,
                data,
                mode: 'removeFile',
                msg: `<p>${translations.PLUGIN_FORM.FILE_ERROR_ADD} <strong>${file.name}</strong></p>
                <pre>${data.message}</pre>`
            });
        }

        if (this.options.reloadPage) {
            global.location.reload();
        }
    }

    onDropzoneRemovedFile(file, ...extra) {
        if (!file.accepted || file.rejected) { return; }
        let url = file.removeUrl || this.urls.delete || `${location.href}.json`;
        let path = (url || '').match(/path:(.*)\//);
        let data = new FormData();

        data.append('filename', file.name);
        data.append('__form-name__', this.container.closest('form').find('[name="__form-name__"]').val());
        data.append('name', this.options.dotNotation);
        data.append('form-nonce', config.form_nonce);
        data.append('uri', this.getURI());

        if (file.sessionParams) {
            data.append('__form-file-remover__', '1');
            data.append('session', file.sessionParams);
        }

        $.ajax({
            url,
            data,
            method: 'POST',
            contentType: false,
            processData: false,
            success: () => {
                if (!path) { return; }

                path = global.atob(path[1]);
                let input = this.container.find('[name][type="hidden"]');
                let data = JSON.parse(input.val() || '{}');
                delete data[path];
                input.val(JSON.stringify(data));
            }
        });
    }

    onDropzoneError(file, response, xhr) {
        let message = xhr && response.error ? response.error.message : response;
        $(file.previewElement).find('[data-dz-errormessage]').html(message);

        return this.handleError({
            file,
            data: { status: 'error' },
            msg: `<pre>${message}</pre>`
        });
    }

    handleError(options) {
        return true;
        /* let { file, data, mode, msg } = options;
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
        $.remodal.lookup[modal.data('remodal')].open(); */
    }
}

export function UriToMarkdown(uri) {
    uri = uri.replace(/@3x|@2x|@1x/, '');
    uri = uri.replace(/\(/g, '%28');
    uri = uri.replace(/\)/g, '%29');

    return uri.match(/\.(jpe?g|png|gif|svg)$/i) ? `![](${uri})` : `[${decodeURI(uri)}](${uri})`;
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
        maxFilesize: settings.filesize || 256,
        maxFiles: settings.limit || null,
        resizeWidth: settings.resizeWidth || null,
        resizeHeight: settings.resizeHeight || null,
        resizeQuality: settings.resizeQuality || null,
        accept: function(file, done) {
            const resolution = settings.resolution;
            if (!resolution) return done();

            setTimeout(() => {
                let error = '';
                if (resolution.min) {
                    Object.keys(resolution.min).forEach((attr) => {
                        if (file[attr] < resolution.min[attr]) {
                            error += translations.PLUGIN_FORM.RESOLUTION_MIN.replace(/{{attr}}/g, attr).replace(/{{min}}/g, resolution.min[attr]);
                        }
                    });
                }

                if (!(settings.resizeWidth || settings.resizeHeight)) {
                    if (resolution.max) {
                        Object.keys(resolution.max).forEach((attr) => {
                            if (file[attr] > resolution.max[attr]) {
                                error += translations.PLUGIN_FORM.RESOLUTION_MAX.replace(/{{attr}}/g, attr).replace(/{{max}}/g, resolution.max[attr]);
                            }
                        });
                    }
                }
                return done(error);
            }, 50);
        }
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
