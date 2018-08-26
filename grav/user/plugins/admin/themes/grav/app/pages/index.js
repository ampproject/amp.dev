import $ from 'jquery';
import Sortable from 'sortablejs';
import PageFilters, { Instance as PageFiltersInstance } from './filter';
import Page from './page';

const pad = (n, s) => (`000${n}`).substr(-s);

// Pages Ordering
let Ordering = null;
let orderingElement = $('#ordering');
if (orderingElement.length) {
    Ordering = new Sortable(orderingElement.get(0), {
        filter: '.ignore',
        onUpdate: function() {
            /* Old single page index behavior

            let item = $(event.item);
            let index = orderingElement.children().index(item) + 1;
            $('[data-order]').val(index);
            */

            let indexes = [];
            const children = orderingElement.children();
            const padZero = (children.length + '').split('').length;
            children.each((index, item) => {
                item = $(item);
                indexes.push(item.data('id'));
                item.find('.page-order').text(`${pad(index + 1, padZero)}.`);
            });

            $('[data-order]').val(indexes.join(','));
        }
    });

    $(document).on('input', '[name="data[folder]"]', (event) => {
        const target = $(event.currentTarget);
        const activeOrder = $('[data-id][data-active-id]');

        activeOrder.data('id', target.val());

        Ordering.options.onUpdate();
    });

}

export default {
    Ordering,
    Page,
    PageFilters: {
        PageFilters,
        Instance: PageFiltersInstance
    }
};
