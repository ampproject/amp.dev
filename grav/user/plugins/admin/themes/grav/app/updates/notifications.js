import $ from 'jquery';
import { config } from 'grav-config';
import request from '../utils/request';

const canFetchNotifications = () => config.notifications;

class Notifications {

    showNotificationInFeed(notification, index) {
        let notifications = $('#notifications').removeClass('hidden');

        let loader = notifications.find('.widget-loader').hide();
        let content = notifications.find('.widget-content > ul').show();
        loader.find('div').remove();
        loader.find('.fa-warning').removeClass('fa-warning').addClass('fa-refresh fa-spin');

        if (!notification.type) {
            notification.type = 'note';
        }

        switch (notification.type) {
            case 'note':
                notification.intro_text = 'Note';
                break;
            case 'info':
                notification.intro_text = 'Info';
                break;
            case 'warning':
                notification.intro_text = 'Warning';
                break;
        }

        let hidden = '';
        if (index > 9) {
            hidden = ' hidden ';
        }

        if (notification.link) {
            const title = document.createElement('div');
            title.innerHTML = notification.message;
            content.append(`
                <li class="single-notification ${hidden}">
                    <span class="badge alert ${notification.type}">${notification.intro_text}</span>
                    <a target="_blank" href="${notification.link}" title="${(title.textContent || title.innerText || '')}">${notification.message}</a>
                </li>
            `);
        } else {
            let clean_text = $('<p>' + notification.message + '</p>').text();
            content.append(`
                <li class="single-notification ${hidden}">
                    <span class="badge alert ${notification.type}">${notification.intro_text}</span>
                    <span title="${clean_text}">${notification.message}</span>
                </li>
            `);
        }
    }

    addShowAllInFeed() {
        $('#notifications ul').append(`
            <li class="show-all" data-notification-action="show-all-notifications">Show all</li>
        `);
    }

    showNotificationInTop(notification) {
        let element;

        if (notification.link) {
            element = $(`<div class="single-notification ${notification.type} alert">
                <a target="_blank" href="${notification.link}">${notification.message}</a>
                ${notification.closeButton}
                </div>`);

        } else {
            element = $(`<div class="single-notification ${notification.type} alert">
                ${notification.message}
                ${notification.closeButton}
                </div>`);
        }

        element.hide();
        $('.top-notifications-container').removeClass('hidden').addClass('default-box-shadow').append(element);
        element.slideDown(150);
    }

    showNotificationInDashboard(notification) {
        let element;

        if (notification.link) {
            element = $(`<div class="single-notification alert ${notification.type}">
                <a target="_blank" href="${notification.link}">${notification.message}</a>
                ${notification.closeButton}
                </div>`);
        } else {
            element = $(`<div class="single-notification alert ${notification.type}">
                ${notification.message}
                ${notification.closeButton}
                </div>`);
        }

        element.hide();
        $('.dashboard-notifications-container').removeClass('hidden').append(element);
        element.slideDown(150);
    }

    showNotificationInPlugins(notification) {
        let element;

        if (notification.link) {
            element = $(`<div class="single-notification alert ${notification.type}">
                <a target="_blank" href="${notification.link}">${notification.message}</a>
                ${notification.closeButton}
                </div>`);
        } else {
            element = $(`<div class="single-notification alert ${notification.type}">
                ${notification.message} ${notification.closeButton}
                </div>`);
        }

        element.hide();
        $('.plugins-notifications-container').removeClass('hidden').append(element);
        element.slideDown(150);
    }

    showNotificationInThemes(notification) {
        let element;

        if (notification.link) {
            element = $(`<div class="single-notification alert ${notification.type}">
                <a target="_blank" href="${notification.link}">${notification.message}</a>
                ${notification.closeButton}
                </div>`);
        } else {
            element = $(`<div class="single-notification alert ${notification.type}">
                ${notification.message}
                ${notification.closeButton}
                </div>`);
        }

        element.hide();
        $('.themes-notifications-container').removeClass('hidden').append(element);
        element.slideDown(150);
    }

    processLocation(location, notification, index = 0) {
        switch (location) {
            case 'feed':
                this.showNotificationInFeed(notification, index);
                break;
            case 'top':
                if (!notification.read) {
                    this.showNotificationInTop(notification);
                }
                break;
            case 'dashboard':
                if (!notification.read) {
                    this.showNotificationInDashboard(notification);
                }
                break;
            case 'plugins':
                if (!notification.read) {
                    this.showNotificationInPlugins(notification);
                }
                break;
            case 'themes':
                if (!notification.read) {
                    this.showNotificationInThemes(notification);
                }
                break;
        }
    }

    // Grav.default.Notifications.fetch()
    fetch({ locations = [], refresh = false } = {}) {
        if (!canFetchNotifications()) {
            return false;
        }

        let that = this;
        let feed = $('#notifications');
        let loader = feed.find('.widget-loader');
        let content = feed.find('.widget-content > ul');
        loader.find('div').remove();
        loader.find('.fa-warning').removeClass('fa-warning').addClass('fa-refresh fa-spin');
        loader.show();
        content.hide();

        let processNotifications = function processNotifications(response) {
            let notifications = response.notifications;

            $('#notifications').find('.widget-content > ul').empty();

            if (notifications) {
                let index = 0;

                notifications.forEach(function(notification, i) {
                    notification.closeButton = `<a href="#" data-notification-action="hide-notification" data-notification-id="${notification.id}" class="close hide-notification"><i class="fa fa-close"></i></a>`;
                    if (notification.options && notification.options.indexOf('sticky') !== -1) {
                        notification.closeButton = '';
                    }

                    if (Array.isArray(notification.location)) {
                        notification.location.forEach(function(location) {
                            if (locations.length && locations.indexOf(location) === -1) {
                                return;
                            }

                            if (location === 'feed') {
                                that.processLocation(location, notification, index);
                                index++;
                            } else {
                                that.processLocation(location, notification);
                            }

                        });
                    } else {
                        if (locations.length && locations.indexOf(notification.location) === -1) {
                            return;
                        }

                        that.processLocation(notification.location, notification);
                    }
                });

                if (index > 10) {
                    that.addShowAllInFeed();
                }
            }
        };

        request(`${config.base_url_relative}/notifications.json/task${config.param_sep}getNotifications`, {
            method: 'post'
        }, (response) => {
            if (response.need_update === true || refresh) {
                $.get((config.local_notifications ? 'http://localhost' : 'https://getgrav.org') + '/notifications.json?' + Date.now()).then(function(response) {
                    request(`${config.base_url_relative}/notifications.json/task${config.param_sep}processNotifications`, {
                        method: 'post',
                        body: { 'notifications': JSON.stringify(response) }
                    }, (response) => {
                        if (response.show_immediately === true) {
                            processNotifications(response);
                        }
                    });
                }).fail(function() {
                    let widget = $('#notifications .widget-content');
                    widget
                        .find('.widget-loader')
                        .find('div').remove();

                    widget
                        .find('.widget-loader')
                        .append('<div>Failed to retrieve notifications</div>')
                        .find('.fa-spin')
                        .removeClass('fa-spin fa-refresh').addClass('fa-warning');
                });
            }

            processNotifications(response);
        });
    }
}

let notifications = new Notifications();
export default notifications;

if (canFetchNotifications()) {
    notifications.fetch();

    $(document).on('click', '[data-notification-action="hide-notification"]', (event) => {
        let notification_id = $(event.target).parents('.hide-notification').data('notification-id');

        let url = `${config.base_url_relative}/notifications.json/task${config.param_sep}hideNotification/notification_id${config.param_sep}${notification_id}`;

        request(url, { method: 'post' }, () => {});

        $(event.target).parents('.single-notification').hide();
    });

    $(document).on('click', '[data-notification-action="show-all-notifications"]', (event) => {
        $('#notifications .show-all').hide();
        $('#notifications .hidden').removeClass('hidden');
    });

    $(document).on('click', '[data-refresh="notifications"]', (event) => {
        event.preventDefault();
        notifications.fetch({ locations: ['feed'], refresh: true });
    });
}
