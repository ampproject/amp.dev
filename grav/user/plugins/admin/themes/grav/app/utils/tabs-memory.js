import $ from 'jquery';
import Cookies from 'cookies-js';
import { Instance as Editors } from '../forms/fields/editor';

let Data = JSON.parse(Cookies.get('grav-tabs-state') || '{}');

$('body').on('touchstart click', '[data-tabid]', (event) => {
    event && event.stopPropagation();
    let target = $(event.currentTarget);

    Data[target.data('tabkey')] = target.data('scope');
    Cookies.set('grav-tabs-state', JSON.stringify(Data), { expires: Infinity });

    const panel = $(`[id="${target.data('tabid')}"]`);

    target.siblings('[data-tabid]').removeClass('active');
    target.addClass('active');

    panel.siblings('[id]').removeClass('active');
    panel.addClass('active');

    Editors.editors.each((index, editor) => {
        let codemirror = $(editor).data('codemirror');
        if (!codemirror) { return; }
        if (codemirror.display.lastWrapWidth === 0) {
            codemirror.refresh();
        }
    });
});
