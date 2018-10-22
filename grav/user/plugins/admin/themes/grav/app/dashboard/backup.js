import $ from 'jquery';
import { translations } from 'grav-config';
import request from '../utils/request';
import { Instances as Charts } from './chart';

$('[data-ajax*="task:backup"]').on('click', function() {
    let element = $(this);
    let url = element.data('ajax');

    element
        .attr('disabled', 'disabled')
        .find('> .fa').removeClass('fa-database').addClass('fa-spin fa-refresh');

    request(url, (/* response */) => {
        if (Charts && Charts.backups) {
            Charts.backups.updateData({ series: [0, 100] });
            Charts.backups.element.find('.numeric').html(`0 <em>${translations.PLUGIN_ADMIN.DAYS.toLowerCase()}</em>`);
        }

        element
            .removeAttr('disabled')
            .find('> .fa').removeClass('fa-spin fa-refresh').addClass('fa-database');
    });
});
