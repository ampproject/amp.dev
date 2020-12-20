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

import {UNIT_DEFAULT, UNIT_DEC, UNIT_SEC, UNIT_MS} from './constants.js';

export const Category = {
  FAST: 'FAST',
  SLOW: 'SLOW',
  AVERAGE: 'AVERAGE',
};

let locale;
const API_ENDPOINT = API_ENDPOINT_PAGE_SPEED_INSIGHTS;
const DEVICE_STRATEGY = 'MOBILE';
const METRICS_SCALES = {
  lcp: {
    fast: 2500,
    average: 4000,
    slow: 6000,
  },
  tbt: {
    fast: 300,
    average: 600,
    slow: 900,
  },
  cls: {
    fast: 0.1,
    average: 0.25,
    slow: 0.4,
  },
};

export default class PageExperienceCheck {
  static getCheckCount() {
    return 10;
  }

  setLocale(language) {
    locale = language;
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

    if (metricOrigin.numericValue < METRICS_SCALES[id].fast) {
      data.category = Category.FAST;
    } else if (metricOrigin.numericValue < METRICS_SCALES[id].average) {
      data.category = Category.AVERAGE;
    } else {
      data.category = Category.SLOW;
    }

    return data;
  }

  addScoreCheck(result, resultName, audits, testName) {
    if (audits && audits[testName] && !Number.isNaN(audits[testName].score)) {
      result.data[resultName] = audits[testName].score === 1;
      result.descriptions[resultName] = audits[testName].description;
      const details = audits[testName].details;
      if (details) {
        // If a check has additional details although it identifies as passing
        // show the recommendation anyway
        result.data[resultName] = !details.items.length;
        result.details[resultName] = details;
      }
    }
  }

  isFastData(metrics, checkId) {
    if (!metrics) {
      // no error when we have no data
      return undefined;
    }
    return metrics[checkId].data.category === Category.FAST;
  }

  createReportData(apiResult) {
    const {loadingExperience, lighthouseResult} = apiResult || {};
    const {origin_fallback: originFallback, metrics} = loadingExperience || {};
    const fieldMetrics = originFallback ? null : metrics;
    const {audits} = lighthouseResult || {};

    const fieldData = !fieldMetrics
      ? null
      : {
          lcp: {
            unit: UNIT_SEC,
            data: this.createFieldData(
              fieldMetrics,
              'LARGEST_CONTENTFUL_PAINT_MS'
            ),
          },
          fid: {
            unit: UNIT_MS,
            data: this.createFieldData(fieldMetrics, 'FIRST_INPUT_DELAY_MS'),
          },
          cls: {
            unit: UNIT_DEC,
            data: this.createFieldData(
              fieldMetrics,
              'CUMULATIVE_LAYOUT_SHIFT_SCORE'
            ),
          },
        };

    const labData = {
      lcp: {
        unit: UNIT_SEC,
        data: this.createLabData(audits['largest-contentful-paint'], 'lcp'),
      },
      tbt: {
        unit: UNIT_MS,
        data: this.createLabData(audits['total-blocking-time'], 'tbt'),
      },
      cls: {
        unit: UNIT_DEFAULT,
        data: this.createLabData(audits['cumulative-layout-shift'], 'cls'),
      },
    };

    const result = {
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
            : null,
          labData: {
            isAllFast:
              this.isFastData(labData, 'cls') &&
              this.isFastData(labData, 'tbt') &&
              this.isFastData(labData, 'lcp'),
            ...labData,
          },
          source: fieldData ? 'fieldData' : 'labData',
        },
      },
      descriptions: {},
      details: {},
    };

    this.addScoreCheck(
      result,
      'textCompression',
      audits,
      'uses-text-compression'
    );
    this.addScoreCheck(
      result,
      'fastServerResponse',
      audits,
      'server-response-time'
    );
    this.addScoreCheck(
      result,
      'usesAppropriatelySizedImages',
      audits,
      'uses-responsive-images'
    );
    this.addScoreCheck(
      result,
      'usesOptimizedImages',
      audits,
      'uses-optimized-images'
    );
    this.addScoreCheck(result, 'usesWebpImages', audits, 'uses-webp-images');
    this.addScoreCheck(result, 'fastFontDisplay', audits, 'font-display');
    this.addScoreCheck(result, 'minifiedCss', audits, 'unminified-css');

    return result;
  }

  async fetchJson(pageUrl) {
    const apiUrl = new URL(API_ENDPOINT);
    apiUrl.searchParams.append('key', AMP_DEV_PIXI_APIS_KEY);
    apiUrl.searchParams.set('url', pageUrl);
    apiUrl.searchParams.set('strategy', DEVICE_STRATEGY);
    apiUrl.searchParams.set('locale', locale);

    const response = await fetch(apiUrl.href);
    if (!response.ok) {
      throw new Error(`PageExperienceCheck failed for: ${apiUrl}`);
    }
    const result = await response.json();
    return result;
  }
}
