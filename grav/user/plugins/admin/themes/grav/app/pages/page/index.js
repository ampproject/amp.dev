import $ from 'jquery';
import './add';
import './move';
import './delete';
import './unset';
import './disable-buttons';
import PageMedia, { Instance as PageMediaInstances } from './media';
import './multilang';

const switcher = $('input[type="radio"][name="mode-switch"]');

if (switcher) {
    let link = switcher.closest(':checked').data('leave-url');
    let fakeLink = $(`<a href="${link}" />`);

    switcher.parent().append(fakeLink);

    switcher.siblings('label').on('mousedown touchdown', (event) => {
        event.preventDefault();

        // let remodal = $.remodal.lookup[$('[data-remodal-id="changes"]').data('remodal')];
        let confirm = $('[data-remodal-id="changes"] [data-leave-action="continue"]');

        confirm.one('click', () => {
            $(global).on('beforeunload._grav');
            fakeLink.off('click._grav');

            $(event.target).trigger('click');
        });

        fakeLink.trigger('click._grav');
    });

    switcher.on('change', (event) => {
        let radio = $(event.target);
        link = radio.data('leave-url');

        setTimeout(() => fakeLink.attr('href', link).get(0).click(), 5);
    });
}

export default {
    Media: {
        PageMedia,
        PageMediaInstances
    }
};
