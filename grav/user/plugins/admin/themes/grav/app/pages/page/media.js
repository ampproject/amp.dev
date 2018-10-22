import $ from 'jquery';
import request from '../../utils/request';
import FilesField, { UriToMarkdown } from '../../forms/fields/files';
import { config, translations } from 'grav-config';
import { Instance as Editor } from '../../forms/fields/editor';
import Sortable from 'sortablejs';

const previewTemplate = `
    <div class="dz-preview dz-file-preview">
      <div class="dz-details">
        <div class="dz-filename"><span data-dz-name></span></div>
        <div class="dz-size" data-dz-size></div>
        <img data-dz-thumbnail />
      </div>
      <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
      <div class="dz-success-mark"><span>✔</span></div>
      <div class="dz-error-mark"><span>✘</span></div>
      <div class="dz-error-message"><span data-dz-errormessage></span></div>
      <a class="dz-remove" title="${translations.PLUGIN_ADMIN.DELETE}" href="javascript:undefined;" data-dz-remove>${translations.PLUGIN_ADMIN.DELETE}</a>
      <a class="dz-metadata" title="${translations.PLUGIN_ADMIN.METADATA}" href="#" target="_blank" data-dz-metadata>${translations.PLUGIN_ADMIN.METADATA}</a>
      <a class="dz-view" title="${translations.PLUGIN_ADMIN.VIEW}" href="#" target="_blank" data-dz-view>${translations.PLUGIN_ADMIN.VIEW}</a>
      <a class="dz-insert" title="${translations.PLUGIN_ADMIN.INSERT}" href="javascript:undefined;" data-dz-insert>${translations.PLUGIN_ADMIN.INSERT}</a>
    </div>`.trim();

export default class PageMedia extends FilesField {
    constructor({ container = '#grav-dropzone', options = {} } = {}) {
        options = Object.assign(options, { previewTemplate });
        super({ container, options });
        if (!this.container.length) { return; }

        this.urls = {
            fetch: `${this.container.data('media-url')}/task${config.param_sep}listmedia`,
            add: `${this.container.data('media-url')}/task${config.param_sep}addmedia`,
            delete: `${this.container.data('media-url')}/task${config.param_sep}delmedia`
        };

        this.dropzone.options.url = this.urls.add;

        if (typeof this.options.fetchMedia === 'undefined' || this.options.fetchMedia) {
            this.fetchMedia();
        }

        if (typeof this.options.attachDragDrop === 'undefined' || this.options.attachDragDrop) {
            this.attachDragDrop();
        }

        const field = $(`[name="${this.container.data('dropzone-field')}"]`);

        if (field.length) {
            this.sortable = new Sortable(this.container.get(0), {
                animation: 150,
                // forceFallback: true,
                setData: (dataTransfer, target) => {
                    target = $(target);
                    let uri = encodeURI(target.find('.dz-filename').text());
                    let shortcode = UriToMarkdown(uri);
                    this.dropzone.disable();
                    target.addClass('hide-backface');
                    dataTransfer.effectAllowed = 'copy';
                    dataTransfer.setData('text', shortcode);
                },
                onSort: () => {
                    let names = [];
                    this.container.find('[data-dz-name]').each((index, file) => {
                        file = $(file);
                        const name = file.text().trim();
                        names.push(name);
                    });

                    field.val(names.join(','));
                }
            });
        }
    }

    fetchMedia() {
        const order = this.container.closest('.form-field').find('[name="data[header][media_order]"]').val();
        const body = { uri: this.getURI(), order };
        let url = this.urls.fetch;

        request(url, { method: 'post', body }, (response) => {
            let results = response.results;

            Object.keys(results).forEach((name) => {
                let data = results[name];
                let mock = { name, size: data.size, accepted: true, extras: data };

                this.dropzone.files.push(mock);
                this.dropzone.options.addedfile.call(this.dropzone, mock);
                this.dropzone.options.thumbnail.call(this.dropzone, mock, data.url);
            });

            this.container.find('.dz-preview').prop('draggable', 'true');
        });
    }

    onDropzoneSending(file, xhr, formData) {
        /*
        // Cannot call super because Safari and IE API don't implement `delete`
        super.onDropzoneSending(file, xhr, formData);
        formData.delete('task');
        */

        formData.append('name', this.options.dotNotation);
        formData.append('admin-nonce', config.admin_nonce);
        formData.append('uri', this.getURI());
    }

    onDropzoneComplete(file) {
        super.onDropzoneComplete(file);
        this.sortable.options.onSort();

        // accepted
        $('.dz-preview').prop('draggable', 'true');
    }

    onDropzoneRemovedFile(file, ...extra) {
        super.onDropzoneRemovedFile(file, ...extra);
        this.sortable.options.onSort();
    }

    attachDragDrop() {
        this.container.delegate('[data-dz-insert]', 'click', (e) => {
            let target = $(e.currentTarget).parent('.dz-preview').find('.dz-filename');
            let editor = Editor.editors.filter((index, editor) => $(editor).attr('name') === 'data[content]');

            if (editor.length) {
                editor = editor.data('codemirror');
                editor.focus();

                let filename = encodeURI(target.text());
                let shortcode = UriToMarkdown(filename);
                editor.doc.replaceSelection(shortcode);
            }
        });

        this.container.delegate('[data-dz-view]', 'mouseenter', (e) => {
            let target = $(e.currentTarget);
            let file = target.parent('.dz-preview').find('.dz-filename');
            let filename = encodeURI(file.text());
            let URL = target.closest('[data-media-path]').data('media-path');
            let original = this.dropzone.files.filter((file) => encodeURIComponent(file.name) === filename).shift().extras.original;

            target.attr('href', `${URL}/${original}`);
        });

        this.container.delegate('[data-dz-metadata]', 'click', (e) => {
            e.preventDefault();
            const target = $(e.currentTarget);
            const file = target.parent('.dz-preview').find('.dz-filename');
            const filename = encodeURI(file.text());

            let fileObj = this.dropzone.files.filter((file) => file.name === global.decodeURI(filename)).shift() || {};

            if (!fileObj.extras) {
                fileObj.extras = { metadata: [] };
            }

            if (Array.isArray(fileObj.extras.metadata) && !fileObj.extras.metadata.length) {
                fileObj.extras.metadata = { '': `${global.decodeURI(filename)}.meta.yaml doesn't exist` };
            }

            fileObj = fileObj.extras;

            const modal_element = $('body').find('[data-remodal-id="metadata"]');
            const modal = $.remodal.lookup[modal_element.data('remodal')];

            modal_element.find('h1 strong').html(filename);
            if (fileObj.url) {
                modal_element.find('.meta-preview').html(`<img src="${fileObj.url}" />`);
            }

            const container = modal_element.find('.meta-content').html('<ul />').find('ul');
            Object.keys(fileObj.metadata).forEach((meta) => {
                container.append(`<li><strong>${meta ? meta + ':' : ''}</strong> ${fileObj.metadata[meta]}</li>`);
            });

            modal.open();
        });

        this.container.delegate('.dz-preview', 'dragstart', (e) => {
            let target = $(e.currentTarget);
            let uri = encodeURI(target.find('.dz-filename').text());
            let shortcode = UriToMarkdown(uri);
            this.dropzone.disable();
            target.addClass('hide-backface');
            e.originalEvent.dataTransfer.effectAllowed = 'copy';
            e.originalEvent.dataTransfer.setData('text', shortcode);
        });

        this.container.delegate('.dz-preview', 'dragend', (e) => {
            let target = $(e.currentTarget);
            this.dropzone.enable();
            target.removeClass('hide-backface');
        });
    }
}

export let Instance = new PageMedia();
