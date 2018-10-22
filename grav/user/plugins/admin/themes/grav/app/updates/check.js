import $ from 'jquery';
import { Instance as gpm } from '../utils/gpm';
import { translations } from 'grav-config';
import toastr from '../utils/toastr';

// Check for updates trigger
$('[data-gpm-checkupdates]').on('click', function() {
    let element = $(this);
    element.find('i').addClass('fa-spin');

    gpm.fetch((response) => {
        element.find('i').removeClass('fa-spin');
        let payload = response.payload;

        if (!payload) { return; }
        if (!payload.grav.isUpdatable && !payload.resources.total) {
            toastr.success(translations.PLUGIN_ADMIN.EVERYTHING_UP_TO_DATE);
        } else {
            var grav = payload.grav.isUpdatable ? 'Grav v' + payload.grav.available : '';
            var resources = payload.resources.total ? payload.resources.total + ' ' + translations.PLUGIN_ADMIN.UPDATES_ARE_AVAILABLE : '';

            if (!resources) { grav += ' ' + translations.PLUGIN_ADMIN.IS_AVAILABLE_FOR_UPDATE; }
            toastr.info(grav + (grav && resources ? ' ' + translations.PLUGIN_ADMIN.AND + ' ' : '') + resources);
        }
    }, true);
});
