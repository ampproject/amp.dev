import $ from 'jquery';
import isOnline from '../utils/offline';

const offlineElement = $('#offline-status');

$(window).on('offline', () => {
    offlineElement.slideDown();
});

$(window).on('online', () => {
    offlineElement.slideUp();
});

$(document).ready(() => {
    if (!isOnline) {
        offlineElement.slideDown();
    }
});

// assume online if can't check
export default typeof global.navigator.onLine !== 'undefined' ? global.navigator.onLine : true;
