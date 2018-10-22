import $ from 'jquery';
import { config, translations } from 'grav-config';
import request from '../../../utils/request';

let replacer = ({ name, replace, codemirror, button, mode = 'replaceSelections', runner }) => {
    button.on(`click.editor.${name}`, () => {
        strategies[mode]({ token: '$1', template: replace, codemirror, runner });
    });
};

export let strategies = {
    replaceSelections({ template, token, codemirror, runner }) {
        let replacements = [];
        let ranges = [];
        let selections = codemirror.getSelections();
        let list = codemirror.listSelections();
        let accumulator = {};

        selections.forEach((selection, index) => {
            let markup = template.replace(token, selection);

            let cursor = markup.indexOf('$cur');
            let { line, ch } = list[index].anchor;

            markup = markup.replace('$cur', '');
            markup = runner ? runner(selection, markup, list) : markup;
            replacements.push(markup);

            if (!accumulator[line]) { accumulator[line] = 0; }

            ch += accumulator[line] + (cursor === -1 ? markup.length : cursor);
            let range = { ch, line };

            ranges.push({ anchor: range, head: range });
            accumulator[line] += markup.length - selection.length;
        });

        codemirror.replaceSelections(replacements);
        codemirror.setSelections(ranges);
        codemirror.focus();
    },
    replaceLine({ template, token, codemirror, runner }) {
        let list = codemirror.listSelections();
        let range;

        list.forEach((selection) => {
            let lines = {
                min: Math.min(selection.anchor.line, selection.head.line),
                max: Math.max(selection.anchor.line, selection.head.line)
            };

            codemirror.eachLine(lines.min, lines.max + 1, (handler) => {
                let markup = template.replace(token, handler.text);
                let line = codemirror.getLineNumber(handler);
                markup = runner ? runner(handler, markup) : markup;
                codemirror.replaceRange(markup, { line, ch: 0 }, { line, ch: markup.length });
                range = { line, ch: markup.length };
            });
        });

        codemirror.setSelection(range, range, 'end');
        codemirror.focus();
    },
    replaceRange() {}
};

const flipDisabled = (codemirror, button, type) => {
    let hasHistory = codemirror.historySize()[type];
    let element = button.find('a');
    button[hasHistory ? 'removeClass' : 'addClass']('button-disabled');

    if (!hasHistory) {
        element.attr('title-disabled', element.attr('title'));
        element.attr('data-hint-disabled', element.attr('data-hint'));
        element.removeAttr('title').removeAttr('data-hint');
    } else {
        element.attr('title', element.attr('title-disabled'));
        element.attr('data-hint', element.attr('data-hint-disabled'));
        element.removeAttr('title-disabled').removeAttr('data-hint-disabled');
    }
};

export default {
    navigation: [
        {
            undo: {
                identifier: 'undo',
                title: translations.PLUGIN_ADMIN.UNDO,
                label: '<i class="fa fa-fw fa-undo"></i>',
                modes: [],
                action({ codemirror, button, textarea}) {
                    button.addClass('button-disabled');
                    codemirror.on('change', () => flipDisabled(codemirror, button, 'undo'));
                    button.on('click.editor.undo', () => {
                        codemirror.undo();
                    });
                }
            }
        },
        {
            redo: {
                identifier: 'redo',
                title: translations.PLUGIN_ADMIN.REDO,
                label: '<i class="fa fa-fw fa-repeat"></i>',
                modes: [],
                action({ codemirror, button, textarea}) {
                    button.addClass('button-disabled');
                    codemirror.on('change', () => flipDisabled(codemirror, button, 'redo'));
                    button.on('click.editor.redo', () => {
                        codemirror.redo();
                    });
                }
            }
        },
        {
            headers: {
                identifier: 'headers',
                title: translations.PLUGIN_ADMIN.HEADERS,
                label: '<i class="fa fa-fw fa-header"></i>',
                modes: ['gfm', 'markdown'],
                children: [
                    {
                        h1: {
                            identifier: 'h1',
                            label: '<i class="fa fa-fw fa-header"></i>1',
                            modes: ['gfm', 'markdown'],
                            action({ codemirror, button, textarea }) {
                                replacer({ name: 'h1', replace: '# $1', codemirror, button, mode: 'replaceLine' });
                            }
                        }
                    },
                    {
                        h2: {
                            identifier: 'h2',
                            label: '<i class="fa fa-fw fa-header"></i>2',
                            modes: ['gfm', 'markdown'],
                            action({ codemirror, button, textarea }) {
                                replacer({ name: 'h2', replace: '## $1', codemirror, button, mode: 'replaceLine' });
                            }
                        }
                    },
                    {
                        h3: {
                            identifier: 'h3',
                            label: '<i class="fa fa-fw fa-header"></i>3',
                            modes: ['gfm', 'markdown'],
                            action({ codemirror, button, textarea }) {
                                replacer({ name: 'h3', replace: '### $1', codemirror, button, mode: 'replaceLine' });
                            }
                        }
                    },
                    {
                        h4: {
                            identifier: 'h4',
                            label: '<i class="fa fa-fw fa-header"></i>4',
                            modes: ['gfm', 'markdown'],
                            action({ codemirror, button, textarea }) {
                                replacer({ name: 'h4', replace: '#### $1', codemirror, button, mode: 'replaceLine' });
                            }
                        }
                    },
                    {
                        h5: {
                            identifier: 'h5',
                            label: '<i class="fa fa-fw fa-header"></i>5',
                            modes: ['gfm', 'markdown'],
                            action({ codemirror, button, textarea }) {
                                replacer({ name: 'h5', replace: '##### $1', codemirror, button, mode: 'replaceLine' });
                            }
                        }
                    },
                    {
                        h6: {
                            identifier: 'h6',
                            label: '<i class="fa fa-fw fa-header"></i>6',
                            modes: ['gfm', 'markdown'],
                            action({ codemirror, button, textarea }) {
                                replacer({ name: 'h6', replace: '###### $1', codemirror, button, mode: 'replaceLine' });
                            }
                        }
                    }
                ]
            }
        },
        {
            bold: {
                identifier: 'bold',
                title: translations.PLUGIN_ADMIN.BOLD,
                label: '<i class="fa fa-fw fa-bold"></i>',
                modes: ['gfm', 'markdown'],
                shortcut: ['Ctrl-B', 'Cmd-B'],
                action({ codemirror, button, textarea }) {
                    replacer({ name: 'bold', replace: '**$1$cur**', codemirror, button });
                }
            }
        }, {
            italic: {
                identifier: 'italic',
                title: translations.PLUGIN_ADMIN.ITALIC,
                label: '<i class="fa fa-fw fa-italic"></i>',
                modes: ['gfm', 'markdown'],
                shortcut: ['Ctrl-I', 'Cmd-I'],
                action({ codemirror, button, textarea }) {
                    replacer({ name: 'italic', replace: '_$1$cur_', codemirror, button });
                }
            }
        }, {
            strike: {
                identifier: 'strike',
                title: translations.PLUGIN_ADMIN.STRIKETHROUGH,
                label: '<i class="fa fa-fw fa-strikethrough"></i>',
                modes: ['gfm', 'markdown'],
                action({ codemirror, button, textarea }) {
                    replacer({ name: 'strike', replace: '~~$1$cur~~', codemirror, button });
                }
            }
        }, {
            delimiter: {
                identifier: 'delimiter',
                title: translations.PLUGIN_ADMIN.SUMMARY_DELIMITER,
                label: '<i class="fa fa-fw fa-minus"></i>',
                modes: ['gfm', 'markdown'],
                action({ codemirror, button, textarea }) {
                    replacer({ name: 'delimiter', replace: `${config.site.delimiter}$1`, codemirror, button, mode: 'replaceLine' });
                }
            }
        }, {
            link: {
                identifier: 'link',
                title: translations.PLUGIN_ADMIN.LINK,
                label: '<i class="fa fa-fw fa-link"></i>',
                modes: ['gfm', 'markdown'],
                shortcut: ['Ctrl-K', 'Cmd-K'],
                action({ codemirror, button, textarea }) {
                    replacer({ name: 'link', replace: '[$1]($cur)', codemirror, button });
                }
            }
        }, {
            image: {
                identifier: 'image',
                title: translations.PLUGIN_ADMIN.IMAGE,
                label: '<i class="fa fa-fw fa-picture-o"></i>',
                modes: ['gfm', 'markdown'],
                action({ codemirror, button, textarea }) {
                    replacer({ name: 'image', replace: '![$1](http://$cur)', codemirror, button });
                }
            }
        }, {
            blockquote: {
                identifier: 'blockquote',
                title: translations.PLUGIN_ADMIN.BLOCKQUOTE,
                label: '<i class="fa fa-fw fa-quote-right"></i>',
                modes: ['gfm', 'markdown'],
                action({ codemirror, button, textarea }) {
                    replacer({ name: 'blockquote', replace: '> $1', codemirror, button, mode: 'replaceLine' });
                }
            }
        }, {
            listUl: {
                identifier: 'listUl',
                title: translations.PLUGIN_ADMIN.UNORDERED_LIST,
                label: '<i class="fa fa-fw fa-list-ul"></i>',
                modes: ['gfm', 'markdown'],
                action({ codemirror, button, textarea }) {
                    replacer({ name: 'listUl', replace: '* $1', codemirror, button, mode: 'replaceLine' });
                }
            }
        }, {
            listOl: {
                identifier: 'listOl',
                title: translations.PLUGIN_ADMIN.ORDERED_LIST,
                label: '<i class="fa fa-fw fa-list-ol"></i>',
                modes: ['gfm', 'markdown'],
                action({ codemirror, button, textarea }) {
                    replacer({
                        name: 'listOl',
                        replace: '. $1',
                        codemirror,
                        button,
                        mode: 'replaceLine',
                        runner: function(line, markup) {
                            let lineNo = codemirror.getLineNumber(line);
                            let previousLine = codemirror.getLine(lineNo - 1) || '';
                            let match = previousLine.match(/^(\d+)\./);
                            let prefix = 1 + (match ? Number(match[1]) : 0);

                            return `${prefix}${markup}`;
                        }
                    });
                }
            }
        }
    ],
    states: [{
        code: {
            identifier: 'editor',
            title: translations.PLUGIN_ADMIN.EDITOR,
            label: '<i class="fa fa-fw fa-code"></i>',
            action({ codemirror, button, textarea, ui }) {
                if (textarea.data('grav-editor-mode') === 'editor') {
                    button.addClass('editor-active');
                }

                button.on('click.states.editor', () => {
                    button.siblings().removeClass('editor-active');
                    button.addClass('editor-active');
                    textarea.data('grav-editor-mode', 'editor');
                    let previewContainer = textarea.data('grav-editor-preview-container');
                    let content = textarea.parent('.grav-editor-content');

                    content.addClass('is-active');
                    ui.navigation.find('.grav-editor-actions').css('visibility', 'visible');
                    if (previewContainer) {
                        previewContainer.removeClass('is-active');
                    }
                });
            }
        }
    }, {
        preview: {
            identifier: 'preview',
            title: translations.PLUGIN_ADMIN.PREVIEW,
            label: '<i class="fa fa-fw fa-eye"></i>',
            modes: ['gfm', 'markdown'],
            action({ codemirror, button, textarea, ui }) {
                if (textarea.data('grav-editor-mode') === 'preview') {
                    button.addClass('editor-active');
                }
                button.on('click.states.preview', () => {
                    let previewContainer = textarea.data('grav-editor-preview-container');
                    let content = textarea.parent('.grav-editor-content');
                    button.siblings().removeClass('editor-active');
                    button.addClass('editor-active');
                    textarea.data('grav-editor-mode', 'preview');

                    if (!previewContainer) {
                        previewContainer = $('<div class="grav-editor-preview" />');
                        content.after(previewContainer);
                        textarea.data('grav-editor-preview-container', previewContainer);
                    }

                    previewContainer.css({ height: content.height() });
                    previewContainer.addClass('is-active');
                    content.removeClass('is-active');
                    ui.navigation.find('.grav-editor-actions').css('visibility', 'hidden');

                    let url = `${textarea.data('grav-urlpreview')}/task${config.param_sep}processmarkdown`;
                    let params = textarea.closest('form').serializeArray();
                    let body = {};
                    params.map((obj) => { body[obj.name] = obj.value; });
                    request(url, {
                        method: 'post',
                        body
                    }, (response) => previewContainer.html(response.preview));
                });
            }
        }
    }, {
        fullscreen: {
            identifier: 'fullscreen',
            title: translations.PLUGIN_ADMIN.FULLSCREEN,
            label: '<i class="fa fa-fw fa-expand"></i>',
            action({ codemirror, button, textarea }) {
                button.on('click.editor.fullscreen', () => {
                    let container = textarea.closest('.grav-editor');
                    let wrapper = codemirror.getWrapperElement();
                    let contentWrapper = $('.content-wrapper');

                    if (!container.hasClass('grav-editor-fullscreen')) {
                        textarea.data('fullScreenRestore', {
                            scrollTop: global.pageYOffset,
                            scrollLeft: global.pageXOffset,
                            width: wrapper.style.width,
                            height: wrapper.style.height
                        });

                        wrapper.style.width = '';
                        wrapper.style.height = textarea.parent('.grav-editor-content').height() + 'px';
                        global.document.documentElement.style.overflow = 'hidden';

                        let hints = container.find('.grav-editor-toolbar .hint--top');

                        if (hints) {
                            hints.removeClass('hint--top').addClass('hint--bottom');
                            $(hints[hints.length - 1]).addClass('hint--bottom-left');
                        }
                        if (contentWrapper) { contentWrapper.css('overflow', 'visible'); }
                    } else {
                        global.document.documentElement.style.overflow = '';
                        let state = textarea.data('fullScreenRestore');

                        wrapper.style.width = state.width;
                        wrapper.style.height = state.height;
                        global.scrollTo(state.scrollLeft, state.scrollTop);

                        let hints = container.find('.grav-editor-toolbar .hint--bottom');

                        if (hints) {
                            hints.removeClass('hint--bottom').addClass('hint--top');
                            $(hints[hints.length - 1]).removeClass('hint--bottom-left');
                        }
                        if (contentWrapper) { contentWrapper.css('overflow', 'auto'); }
                    }

                    container.toggleClass('grav-editor-fullscreen');

                    setTimeout(() => {
                        codemirror.refresh();
                        // this.preview.parent().css('height', this.code.height());
                        $(global).trigger('resize');
                    }, 5);
                });
            }
        }
    }]
};
