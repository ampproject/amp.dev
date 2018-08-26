import $ from 'jquery';
import request from '../utils/request';

// Dashboard update and Grav update
$('body').on('click', '[data-maintenance-update]', function() {
    let element = $(this);
    let url = element.data('maintenanceUpdate');

    element.attr('disabled', 'disabled').find('> .fa').removeClass('fa-cloud-download').addClass('fa-refresh fa-spin');

    request(url, (response) => {
        if (response.type === 'updategrav') {
            $('[data-gpm-grav]').remove();
            $('#footer .grav-version').html(response.version);
        }

        element.removeAttr('disabled').find('> .fa').removeClass('fa-refresh fa-spin').addClass('fa-cloud-download');
    });
});
