import { parseJSON, parseStatus, userFeedbackError } from './response';
import { config } from 'grav-config';
import { EventEmitter } from 'events';

export default class GPM extends EventEmitter {
    constructor(action = 'getUpdates') {
        super();
        this.payload = {};
        this.raw = {};
        this.action = action;
    }

    setPayload(payload = {}) {
        this.payload = payload;
        this.emit('payload', payload);

        return this;
    }

    setAction(action = 'getUpdates') {
        this.action = action;
        this.emit('action', action);

        return this;
    }

    fetch(callback = () => true, flush = false) {
        let data = new FormData();
        data.append('admin-nonce', config.admin_nonce);

        if (flush) {
            data.append('flush', true);
        }

        this.emit('fetching', this);

        fetch(`${config.base_url_relative}/update.json/task${config.param_sep}getUpdates`, {
            credentials: 'same-origin',
            method: 'post',
            body: data
        }).then((response) => { this.raw = response; return response; })
            .then(parseStatus)
            .then(parseJSON)
            .then((response) => this.response(response))
            .then((response) => callback(response, this.raw))
            .then((response) => this.emit('fetched', this.payload, this.raw, this))
            .catch(userFeedbackError);
    }

    response(response) {
        this.payload = response;

        return response;
    }
}

export let Instance = new GPM();
