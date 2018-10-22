import $ from 'jquery';
import GPM, { Instance as gpm } from './utils/gpm';
import KeepAlive from './utils/keepalive';
import Updates, { Instance as updates, Notifications, Feed } from './updates';
import Dashboard from './dashboard';
import Pages from './pages';
import Forms from './forms';
import Scrollbar, { Instance as contentScrollbar } from './utils/scrollbar';
import './plugins';
import './themes';
import { Filter as MediaFilter, Instance as MediaFilterInstance} from './media';
import toastr from './utils/toastr';
import request from './utils/request';
import './utils/2fa';

// bootstrap jQuery extensions
import 'bootstrap/js/transition';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/collapse';

// tabs memory
import './utils/tabs-memory';

// Main Sidebar
import Sidebar, { Instance as sidebar } from './utils/sidebar';

// starts the keep alive, auto runs every X seconds
KeepAlive.start();

// Sidebar auto-refresh
global.setInterval(() => {
    contentScrollbar.update();
    sidebar.scroller.update();
}, 150);

// global event to catch sidebar_state changes
$(global).on('sidebar_state._grav', () => {
    /* Should not be needed since Gemini Scrollbar v1.4.0
     * - Auto-update scrollbar on resize
     *
     * $('.admin-menu-wrapper').data('scrollbar').update();
     * $('#admin-main .content-wrapper').data('scrollbar').update();
     */

    Object.keys(Dashboard.Chart.Instances).forEach((chart) => {
        setTimeout(() => Dashboard.Chart.Instances[chart].chart.update(), 10);
    });
});

export default {
    GPM: {
        GPM,
        Instance: gpm
    },
    KeepAlive,
    Dashboard,
    Pages,
    Forms,
    Scrollbar: {
        Scrollbar,
        Instance: contentScrollbar
    },
    Updates: {
        Updates,
        Notifications,
        Feed,
        Instance: updates
    },
    Sidebar: {
        Sidebar,
        Instance: sidebar
    },
    MediaFilter: {
        MediaFilter,
        Instance: MediaFilterInstance
    },
    Utils: { request, toastr }
};
