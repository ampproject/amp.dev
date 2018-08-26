import { parseStatus, parseJSON, userFeedback, userFeedbackError } from './response';
import { config } from 'grav-config';

let raw;
let request = function(url, options = {}, callback = () => true) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    if (options.method && options.method === 'post') {
        let data = new FormData();

        options.body = Object.assign({ 'admin-nonce': config.admin_nonce }, options.body || {});
        Object.keys(options.body).map((key) => data.append(key, options.body[key]));
        options.body = data;
    }

    options = Object.assign({
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json'
        }
    }, options);

    return fetch(url, options)
        .then((response) => {
            raw = response;
            return response;
        })
        .then(parseStatus)
        .then(parseJSON)
        .then(userFeedback)
        .then((response) => callback(response, raw))
        .catch(userFeedbackError);
};

export default request;
