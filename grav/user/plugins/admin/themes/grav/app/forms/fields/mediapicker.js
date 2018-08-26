import $ from 'jquery';
import Scrollbar from '../../utils/scrollbar';
import { Instance as pagesTree } from '../../pages/tree';

const queries = {
    tree: '.pages-list-container .mediapicker-scroll',
    thumb: '.thumbs-list-container .mediapicker-scroll'
};

$(function() {
    let modal = '';
    let body = $('body');

    let treescrolls = [];
    let thumbscrolls = [];

    $(queries.tree).each((index, element) => {
        treescrolls.push(new Scrollbar(element, { autoshow: true }));
    });

    $(queries.thumb).each((index, element) => {
        thumbscrolls.push(new Scrollbar(element, { autoshow: true }));
    });

    // let treescroll = new Scrollbar('.pages-list-container .mediapicker-scroll', { autoshow: true });
    // let thumbscroll = new Scrollbar('.thumbs-list-container .mediapicker-scroll', { autoshow: true });

    // Thumb Resizer
    $(document).on('input change', '.media-container .media-range', function(event) {
        const target = $(event.currentTarget);
        const container = target.closest('.remodal');
        let cards = container.find('.media-container div.card-item');
        let width = target.val() + 'px';
        cards.each(function() {
            $(this).css('width', width);
        });

        treescrolls.forEach((tree) => tree.update());
        thumbscrolls.forEach((thumb) => thumb.update());
    });

    $(document).on('opened', '.remodal', function() {
        setTimeout(function() {
            treescrolls.forEach((tree) => tree.update());
            thumbscrolls.forEach((thumb) => thumb.update());
        }, 10);
    });

    body.on('click', '[data-mediapicker-modal-trigger]', function(event) {
        const element = $(event.currentTarget);
        let modal_identifier = $(this).data('grav-mediapicker-unique-identifier');
        let modal_element = body.find(`[data-remodal-unique-identifier="${modal_identifier}"]`);
        modal = $.remodal.lookup[modal_element.data('remodal')];

        if (!modal) {
            modal_element.remodal();
            modal = $.remodal.lookup[modal_element.data('remodal')];
        }

        $(queries.tree).filter((index, item) => !$(item).data('scrollbar')).each((index, item) => {
            treescrolls.push(new Scrollbar(item, { autoshow: true }));
        });

        $(queries.thumb).filter((index, item) => !$(item).data('scrollbar')).each((index, item) => {
            thumbscrolls.push(new Scrollbar(item, { autoshow: true }));
        });

        modal.open();
        modal.dataField = element.find('input');

        treescrolls.forEach((tree) => tree.update());
        thumbscrolls.forEach((thumb) => thumb.update());

        // load all media
        modal_element.find('.js__files').trigger('fillView');

        setTimeout(() => pagesTree.reload(), 100);
    });

    /* handle media modal click actions */
    body.on('click', '[data-remodal-mediapicker] .media-container.in-modal .admin-media-details a', (event) => {
        event.preventDefault();
        event.stopPropagation();

        let val = $(event.target).parents('.js__media-element').data('file-url');
        let string = val.replace(/ /g, '%20');

        modal.dataField.val(string);

        modal.close();
    });
});
