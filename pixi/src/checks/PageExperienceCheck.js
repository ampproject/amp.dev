// Copyright 2020 The AMPHTML Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {UNIT_DEC, UNIT_SEC, UNIT_MS} from './constants.js';

export const Category = {
  FAST: 'FAST',
  SLOW: 'SLOW',
  AVERAGE: 'AVERAGE',
};

const API_ENDPOINT = API_ENDPOINT_PAGE_SPEED_INSIGHTS;
const DEVICE_STRATEGY = 'MOBILE';
const METRICS_SCALES = {
  lcp: {
    fast: 2500,
    average: 4000,
    slow: 6000,
  },
  cls: {
    fast: 10,
    average: 25,
    slow: 40,
  },
  tbt: {
    fast: 300,
    average: 600,
    slow: 900,
  },
};

export default class PageExperienceCheck {
  static getCheckCount() {
    return 10;
  }

  async run(originUrl) {
    try {
      const apiResultOrigin = await this.fetchJson(originUrl);
      return this.createReportData(apiResultOrigin);
    } catch (e) {
      return {error: e};
    }
  }

  createFieldData(metricsOrigin, metricKey) {
    const metricOrigin = metricsOrigin[metricKey];
    const data = {
      numericValue: metricOrigin.percentile,
      category: metricOrigin.category,
      proportion: metricOrigin.distributions[0].proportion,
    };
    return data;
  }

  createLabData(metricOrigin, id) {
    const data = {
      numericValue: metricOrigin.numericValue,
      proportion: METRICS_SCALES[id],
    };

    if (metricOrigin.score < 0.5) {
      data.category = Category.SLOW;
    } else if (metricOrigin.score < 0.9) {
      data.category = Category.AVERAGE;
    } else {
      data.category = Category.FAST;
    }

    return data;
  }

  getAuditScore(audits, testName) {
    if (audits && audits[testName] && !Number.isNaN(audits[testName].score)) {
      return audits[testName].score;
    }
    return -1;
  }

  isFastData(metrics, checkId) {
    if (!metrics) {
      // no error when we have no data
      return undefined;
    }
    return metrics[checkId].data.category === Category.FAST;
  }

  createReportData(apiResultOrigin) {
    const fieldMetricsOrigin = apiResultOrigin.loadingExperience.metrics;
    const auditsOrigin = apiResultOrigin.lighthouseResult.audits;
    const fieldData = !fieldMetricsOrigin
      ? undefined
      : {
          lcp: {
            unit: UNIT_SEC,
            data: this.createFieldData(
              fieldMetricsOrigin,
              'LARGEST_CONTENTFUL_PAINT_MS'
            ),
          },
          fid: {
            unit: UNIT_MS,
            data: this.createFieldData(
              fieldMetricsOrigin,
              'FIRST_INPUT_DELAY_MS'
            ),
          },
          cls: {
            unit: UNIT_DEC,
            data: this.createFieldData(
              fieldMetricsOrigin,
              'CUMULATIVE_LAYOUT_SHIFT_SCORE'
            ),
          },
        };

    const labData = {
      lcp: {
        unit: UNIT_SEC,
        data: this.createLabData(
          auditsOrigin['largest-contentful-paint'],
          'lcp'
        ),
      },
      tbt: {
        unit: UNIT_MS,
        data: this.createLabData(auditsOrigin['total-blocking-time'], 'tbt'),
      },
      cls: {
        unit: UNIT_DEC,
        data: this.createLabData(
          auditsOrigin['cumulative-layout-shift'],
          'cls'
        ),
      },
    };

    return {
      data: {
        pageExperience: {
          fieldData: fieldData
            ? {
                isAllFast:
                  this.isFastData(fieldData, 'cls') &&
                  this.isFastData(fieldData, 'fid') &&
                  this.isFastData(fieldData, 'lcp'),
                ...fieldData,
              }
            : undefined,
          labData: {
            isAllFast:
              this.isFastData(labData, 'cls') &&
              this.isFastData(labData, 'tbt') &&
              this.isFastData(labData, 'lcp'),
            ...labData,
          },
          source: fieldData ? 'fieldData' : 'labData',
        },
        textCompression:
          this.getAuditScore(auditsOrigin, 'uses-text-compression') === 1,
        fastServerResponse:
          this.getAuditScore(auditsOrigin, 'server-response-time') === 1,
        usesAppropriatelySizedImages:
          this.getAuditScore(auditsOrigin, 'uses-responsive-images') === 1,
        usesOptimizedImages:
          this.getAuditScore(auditsOrigin, 'uses-optimized-images') === 1,
        usesWebpImages:
          this.getAuditScore(auditsOrigin, 'uses-webp-images') === 1,
        fastFontDisplay: this.getAuditScore(auditsOrigin, 'font-display') === 1,
        minifiedCss: this.getAuditScore(auditsOrigin, 'unminified-css') === 1,
      },
    };
  }

  async fetchJson(pageUrl) {
    const apiUrl = new URL(API_ENDPOINT);
    apiUrl.searchParams.append('key', AMP_DEV_PIXI_APIS_KEY);
    apiUrl.searchParams.set('url', pageUrl);
    apiUrl.searchParams.set('strategy', DEVICE_STRATEGY);

    const response = await fetch(apiUrl.href);
    if (!response.ok) {
      throw new Error(`PageExperienceCheck failed for: ${apiUrl}`);
    }
    const result = await response.json();
    return result;
  }
}
