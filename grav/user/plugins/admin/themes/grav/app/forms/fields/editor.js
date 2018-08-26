import $ from 'jquery';
import Buttons, { strategies as buttonStrategies } from './editor/buttons';
import codemirror from 'codemirror';
import { watch } from 'watchjs';
import jsyaml from 'js-yaml';

global.jsyaml = jsyaml;

// Modes
import 'codemirror/mode/css/css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/php/php';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/twig/twig';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/yaml/yaml';

// Add-ons
import 'codemirror/addon/edit/continuelist';
import 'codemirror/addon/mode/overlay';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/css-lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/lint/yaml-lint';

let IS_MOUSEDOWN = false;
const ThemesMap = ['paper'];
const Defaults = {
    codemirror: {
        mode: 'htmlmixed',
        theme: 'paper',
        lineWrapping: true,
        dragDrop: true,
        autoCloseTags: true,
        matchTags: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        indentWithTabs: false,
        tabSize: 4,
        hintOptions: { completionSingle: false },
        extraKeys: { 'Enter': 'newlineAndIndentContinueMarkdownList' }
    }
};

export default class EditorField {
    constructor(options) {
        let body = $('body');
        this.editors = $();
        this.options = Object.assign({}, Defaults, options);
        this.buttons = Buttons;
        this.buttonStrategies = buttonStrategies;

        watch(Buttons, (/* key, modifier, prev, next */) => {
            this.editors.each((index, editor) => $(editor).data('toolbar').renderButtons());
        });

        $('[data-grav-editor]').each((index, editor) => this.addEditor(editor));

        $(() => { body.trigger('grav-editor-ready'); });
        body.on('mutation._grav', this._onAddedNodes.bind(this));

        body.on('mouseup._grav', () => {
            if (!IS_MOUSEDOWN) { return true; }
            body.unbind('mousemove._grav');
            IS_MOUSEDOWN = false;
        });
        body.on('mousedown._grav', '.grav-editor-resizer', (event) => {
            event && event.preventDefault();
            IS_MOUSEDOWN = true;

            let target = $(event.currentTarget);
            let container = target.siblings('.grav-editor-content');
            let editor = container.find('.CodeMirror');
            let codemirror = container.find('textarea').data('codemirror');

            body.on('mousemove._grav', (event) => {
                editor.css('height', Math.max(100, event.pageY - container.offset().top));
                codemirror.refresh();
            });
        });
    }

    addButton(button, options) {
        if (options && (options.before || options.after)) {
            let index = this.buttons.navigation.findIndex((obj) => {
                let key = Object.keys(obj).shift();
                return obj[key].identifier === (options.before || options.after);
            });

            if (!~index) {
                options = 'end';
            } else {
                this.buttons.navigation.splice(options.before ? index : index + 1, 0, button);
            }

        }

        if (options === 'start') { this.buttons.navigation.splice(0, 0, button); }
        if (!options || options === 'end') { this.buttons.navigation.push(button); }
    }

    addEditor(textarea) {
        textarea = $(textarea);
        let options = Object.assign(
            {},
            this.options.codemirror,
            textarea.data('grav-editor').codemirror
        );
        let theme = options.theme || 'paper';

        this.editors = this.editors.add(textarea);
        if (theme && !~ThemesMap.indexOf(theme)) {
            ThemesMap.push(theme);
            let themeCSS = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.12.0/theme/${theme}.min.css`;
            $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', themeCSS));
        }

        if (options.mode === 'yaml') {
            Object.assign(options.extraKeys, { Tab: function(cm) { cm.replaceSelection('    ', 'end'); }});
        }

        let editor = codemirror.fromTextArea(textarea.get(0), options);
        textarea.data('codemirror', editor);
        textarea.data('toolbar', new Toolbar(textarea));
        textarea.addClass('code-mirrored');

        if (options.toolbar === false) {
            textarea.data('toolbar').ui.navigation.addClass('grav-editor-hide-toolbar');
        }

        editor.on('change', () => editor.save());
    }

    _onAddedNodes(event, target/* , record, instance */) {
        let editors = $(target).find('[data-grav-editor]');
        if (!editors.length) { return; }

        editors.each((index, editor) => {
            editor = $(editor);
            if (!~this.editors.index(editor)) {
                this.addEditor(editor);
            }
        });
    }
}

export class Toolbar {
    static templates() {
        return {
            navigation: `
                <div class="grav-editor-toolbar">
                    <div class="grav-editor-actions"></div>
                    <div class="grav-editor-modes"></div>
                </div>
            `
        };
    }

    constructor(editor) {
        this.editor = $(editor);
        this.codemirror = this.editor.data('codemirror');
        this.buttons = Buttons.navigation;
        this.ui = {
            navigation: $(Toolbar.templates().navigation)
        };

        this.editor.parent('.grav-editor-content')
            .before(this.ui.navigation)
            .after(this.ui.states);

        this.renderButtons();
    }

    renderButtons() {
        let map = { 'actions': 'navigation', 'modes': 'states'};

        ['actions', 'modes'].forEach((type) => {
            this.ui.navigation.find(`.grav-editor-${type}`).empty().append('<ul />');
            Buttons[map[type]].forEach((button) => this.renderButton(button, type));
        });
    }

    renderButton(button, type, location = null) {
        Object.keys(button).forEach((key) => {
            let obj = button[key];
            if (!obj.modes) { obj.modes = []; }
            if (!~this.codemirror.options.ignore.indexOf(key) && (!obj.modes.length || obj.modes.indexOf(this.codemirror.options.mode) > -1)) {
                let hint = obj.title ? `data-hint="${obj.title}"` : '';
                let element = $(`<li class="grav-editor-button-${key}"><a class="hint--top" ${hint}>${obj.label}</a></li>`);
                (location || this.ui.navigation.find(`.grav-editor-${type} ul:not(.dropdown-menu)`)).append(element);

                if (obj.shortcut) {
                    this.addShortcut(obj.identifier, obj.shortcut, element);
                }

                obj.action && obj.action.call(obj.action, {
                    codemirror: this.codemirror,
                    button: element,
                    textarea: this.editor,
                    ui: this.ui
                });

                if (obj.children) {
                    let childrenContainer = $('<ul class="dropdown-menu" />');
                    element.addClass('button-group').find('a').wrap('<div class="dropdown-toggle" data-toggle="dropdown"></div>');
                    element.find('a').append(' <i class="fa fa-caret-down"></i>');
                    element.append(childrenContainer);
                    obj.children.forEach((child) => this.renderButton(child, type, childrenContainer));
                }
            }
        });
    }

    addShortcut(identifier, shortcut, element) {
        let map = {};
        if (!Array.isArray(shortcut)) {
            shortcut = [shortcut];
        }

        shortcut.forEach((key) => {
            map[key] = () => {
                element.trigger(`click.editor.${identifier}`, [this.codemirror]);
            };
        });

        this.codemirror.addKeyMap(map);
    }
}

export let Instance = new EditorField();
