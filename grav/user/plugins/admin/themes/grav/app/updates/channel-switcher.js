import $ from 'jquery';
import request from '../utils/request';

const switcher = $('input[type="radio"][name="channel-switch"]');

if (switcher) {
    switcher.on('change', (event) => {
        let radio = $(event.target);
        let url = `${radio.parent('[data-url]').data('url')}`;

        request(url, {
            method: 'post',
            body: {
                task: 'gpmRelease',
                release: radio.val()
            }
        },
        (response) => {
            if (response.reload) {
                global.location.reload();
            }
        });
    });
}
