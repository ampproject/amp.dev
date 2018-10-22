import $ from 'jquery';
import chartist from 'chartist';
import { translations } from 'grav-config';
import { Instance as gpm } from '../utils/gpm';
import { Instance as updates } from '../updates';

let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

export const defaults = {
    data: {
        series: [100, 0]
    },
    options: {
        Pie: {
            donut: true,
            donutWidth: 10,
            startAngle: 0,
            total: 100,
            showLabel: false,
            height: 150,
            // chartPadding: !isFirefox ? 10 : 25 // workaround for older versions of firefox
            chartPadding: 5
        },
        Bar: {
            height: 164,
            chartPadding: !isFirefox ? 5 : 10, // workaround for older versions of firefox

            axisX: {
                showGrid: false,
                labelOffset: {
                    x: 0,
                    y: 0
                }
            },
            axisY: {
                offset: 15,
                showLabel: true,
                showGrid: true,
                labelOffset: {
                    x: 5,
                    y: 5
                },
                scaleMinSpace: !isFirefox ? 20 : 10
            }
        }
    }
};

export default class Chart {
    constructor(element, options = {}, data = {}) {
        this.element = $(element) || [];
        if (!this.element[0]) { return; }

        let type = (this.element.data('chart-type') || 'pie').toLowerCase();
        this.type = type.charAt(0).toUpperCase() + type.substr(1).toLowerCase();

        options = Object.assign({}, defaults.options[this.type], options);
        data = Object.assign({}, defaults.data, data);
        Object.assign(this, {
            options,
            data
        });
        this.chart = chartist[this.type](this.element.find('.ct-chart').empty()[0], this.data, this.options);
        this.chart.on('created', () => {
            this.element.find('.hidden').removeClass('hidden');

            // FIX: workaround for chartist issue not allowing HTML in labels anymore
            // https://github.com/gionkunz/chartist-js/issues/937
            this.element.find('.ct-label').each((index, label) => {
                label = $(label);
                const text = label.html().replace('&lt;', '<').replace('&gt;', '>');
                label.html(text);
            });
        });
    }

    updateData(data) {
        Object.assign(this.data, data);
        this.chart.update(this.data);
    }
};

export class UpdatesChart extends Chart {
    constructor(element, options = {}, data = {}) {
        super(element, options, data);

        this.chart.on('draw', (data) => this.draw(data));

        gpm.on('fetched', (response) => {
            if (!response.payload) { return; }

            let payload = response.payload.grav;
            let missing = (response.payload.resources.total + (payload.isUpdatable ? 1 : 0)) * 100 / (response.payload.installed + (payload.isUpdatable ? 1 : 0));
            let updated = 100 - missing;

            this.updateData({ series: [updated, missing] });

            if (response.payload.resources.total) {
                updates.maintenance('show');
            }
        });
    }

    draw(data) {
        if (data.index) { return; }

        let notice = translations.PLUGIN_ADMIN[data.value === 100 ? 'FULLY_UPDATED' : 'UPDATES_AVAILABLE'];
        this.element.find('.numeric span').text(`${Math.round(data.value)}%`);
        this.element.find('.js__updates-available-description').html(notice);
        this.element.find('.hidden').removeClass('hidden');
    }

    updateData(data) {
        super.updateData(data);

        // missing updates
        if (this.data.series[0] < 100) {
            this.element.closest('#updates').find('[data-update-packages]').fadeIn();
        }
    }
}

let charts = {};

$('[data-chart-name]').each(function() {
    let element = $(this);
    let name = element.data('chart-name') || '';
    let options = element.data('chart-options') || {};
    let data = element.data('chart-data') || {};

    if (name === 'updates') {
        charts[name] = new UpdatesChart(element, options, data);
    } else {
        charts[name] = new Chart(element, options, data);
    }
});

export let Instances = charts;
