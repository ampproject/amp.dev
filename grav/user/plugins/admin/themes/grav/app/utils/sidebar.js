import $ from 'jquery';
import Scrollbar from './scrollbar';
import Map from 'es6-map';

const MOBILE_BREAKPOINT = 48 - 0.062;
const DESKTOP_BREAKPOINT = 75 + 0.063;
const EVENTS = 'touchstart._grav click._grav';
const TARGETS = '[data-sidebar-mobile-toggle], #overlay';
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT}em)`;
const DESKTOP_QUERY = `(min-width: ${DESKTOP_BREAKPOINT}em)`;

let map = new Map();

export default class Sidebar {
    constructor() {
        this.timeout = null;
        this.isOpen = false;
        this.body = $('body');
        this.matchMedia = global.matchMedia(MOBILE_QUERY);
        this.scroller = new Scrollbar('.admin-menu-wrapper', { autoshow: true });
        this.enable();
    }

    enable() {
        const sidebar = $('#admin-sidebar');

        this.matchMedia.addListener(this._getBound('checkMatch'));
        this.checkMatch(this.matchMedia);
        this.body.on(EVENTS, '[data-sidebar-toggle]', this._getBound('toggleSidebarState'));

        if (sidebar.data('quickopen')) {
            sidebar.hover(this._getBound('quickOpenIn'), this._getBound('quickOpenOut'));
        }
    }

    disable() {
        const sidebar = $('#admin-sidebar');

        this.close();
        this.matchMedia.removeListener(this._getBound('checkMatch'));
        this.body.off(EVENTS, '[data-sidebar-toggle]', this._getBound('toggleSidebarState'));
        if (sidebar.data('quickopen')) {
            sidebar.off('mouseenter mouseleave');
        }
    }

    attach() {
        this.body.on(EVENTS, TARGETS, this._getBound('toggle'));
    }

    detach() {
        this.body.off(EVENTS, TARGETS, this._getBound('toggle'));
    }

    quickOpenIn(/* event */) {
        let isDesktop = global.matchMedia(DESKTOP_QUERY).matches;
        let delay = $('#admin-sidebar').data('quickopen-delay') || 500;
        if (this.body.hasClass('sidebar-mobile-open')) { return; }

        let shouldQuickOpen = isDesktop ? this.body.hasClass('sidebar-closed') : !this.body.hasClass('sidebar-open');
        if (!shouldQuickOpen && !this.body.hasClass('sidebar-quickopen')) { return this.quickOpenOut(); }

        this.timeout = setTimeout(() => {
            this.body.addClass('sidebar-open sidebar-quickopen');
            $(global).trigger('sidebar_state._grav', isDesktop);
        }, delay);
    }

    quickOpenOut(/* event */) {
        clearTimeout(this.timeout);
        if (this.body.hasClass('sidebar-quickopen')) {
            this.body.removeClass('sidebar-open sidebar-quickopen');
        }

        return true;
    }

    open(event) {
        if (event) { event.preventDefault(); }
        let overlay = $('#overlay');
        let sidebar = $('#admin-sidebar');
        let scrollbar = $('#admin-menu').data('scrollbar');

        this.body.addClass('sidebar-mobile-open');
        overlay.css('display', 'block');
        sidebar.css('display', 'block').animate({
            opacity: 1
        }, 200, () => { this.isOpen = true; });

        if (scrollbar) { scrollbar.update(); }
    }

    close(event) {
        if (event) { event.preventDefault(); }
        let overlay = $('#overlay');
        let sidebar = $('#admin-sidebar');
        let scrollbar = $('#admin-menu').data('scrollbar');

        this.body.removeClass('sidebar-mobile-open');
        overlay.css('display', 'none');
        sidebar.animate({
            opacity: 0
        }, 200, () => {
            sidebar.css('display', 'none');
            this.isOpen = false;
        });

        if (scrollbar) { scrollbar.update(); }
    }

    toggle(event) {
        if (event) { event.preventDefault(); }
        return this[this.isOpen ? 'close' : 'open'](event);
    }

    toggleSidebarState(event) {
        if (event) { event.preventDefault(); }
        clearTimeout(this.timeout);
        let isDesktop = global.matchMedia(DESKTOP_QUERY).matches;

        if (isDesktop) {
            this.body.removeClass('sidebar-open');
        }

        if (!isDesktop) {
            this.body.removeClass('sidebar-closed');
            this.body.removeClass('sidebar-mobile-open');
        }

        this.body.toggleClass(`sidebar-${isDesktop ? 'closed' : 'open'}`);
        $(global).trigger('sidebar_state._grav', isDesktop);
    }

    checkMatch(data) {
        let sidebar = $('#admin-sidebar');
        let overlay = $('#overlay');
        this.isOpen = false;

        overlay.css('display', 'none');
        sidebar.css({
            display: data.matches ? 'none' : 'inherit',
            opacity: data.matches ? 0 : 1
        });

        if (data.matches) {
            this.body.removeClass('sidebar-open sidebar-closed');
        }

        this[data.matches ? 'attach' : 'detach']();
    }

    _getBound(fn) {
        if (map.has(fn)) {
            return map.get(fn);
        }

        return map.set(fn, this[fn].bind(this)).get(fn);
    }
}

export let Instance = new Sidebar();
