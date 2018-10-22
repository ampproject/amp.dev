import $ from 'jquery';
import { config } from 'grav-config';
import request from '../utils/request';

const body = $('body');

// Dashboard update and Grav update
body.on('click', '[data-2fa-regenerate]', function(event) {
    event.preventDefault();
    let element = $(this);
    let url = `${config.base_url_relative}/ajax.json/task${config.param_sep}regenerate2FASecret`;

    element.attr('disabled', 'disabled').find('> .fa').addClass('fa-spin');

    request(url, { method: 'post' }, (response) => {
        $('[data-2fa-image]').attr('src', response.image);
        $('[data-2fa-secret]').text(response.secret);
        $('[data-2fa-value]').val(response.secret.replace(' ', ''));

        element.removeAttr('disabled').find('> .fa').removeClass('fa-spin');
    });
});

const toggleSecret = () => {
    const toggle = $('#toggle_twofa_enabled1');
    const secret = $('.twofa-secret');

    secret[toggle.is(':checked') ? 'addClass' : 'removeClass']('show');
};

body.on('click', '.twofa-toggle input', toggleSecret);
toggleSecret();
