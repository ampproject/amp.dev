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

const API_ENDPOINT = API_ENDPOINT_PAGE_SPEED_INSIGHTS;
const DEVICE_STRATEGY = 'MOBILE';
const METRICS_MAX = {
  LARGEST_CONTENTFUL_PAINT_MS: 6000,
  FIRST_INPUT_DELAY_MS: 1000,
  CUMULATIVE_LAYOUT_SHIFT_SCORE: 40,
};

export default class PageExperienceCheck {
  constructor() {
    this.apiUrl = new URL(API_ENDPOINT);
    this.apiUrl.searchParams.append('key', AMP_DEV_PIXI_APIS_KEY);
  }

  async run(pageUrl) {
    this.apiUrl.searchParams.set('url', pageUrl);
    this.apiUrl.searchParams.set('strategy', DEVICE_STRATEGY);

    try {
      const apiResult = await this.fetchJson();
      return this.createReportData(apiResult);
    } catch (e) {
      return {error: e};
    }
  }

  createFieldData(fieldData, id) {
    const metric = fieldData[id];
    const score = metric.percentile / METRICS_MAX[id];
    const data = {
      numericValue: metric.percentile,
      score: score,
      category: metric.category,
    };

    return data;
  }

  createLabData(metric) {
    const data = {
      numericValue: metric.numericValue,
      score: metric.score,
    };

    if (data.score < 0.5) {
      data.category = 'SLOW';
    } else if (data.score < 0.75) {
      data.category = 'AVERAGE';
    } else {
      data.category = 'FAST';
    }

    return data;
  }

  getAuditScore(audits, testName) {
    if (audits && audits[testName] && !Number.isNaN(audits[testName].score)) {
      return audits[testName].score;
    }
    return -1;
  }

  createReportData(apiResult) {
    const fieldData = apiResult.loadingExperience.metrics;
    const labData = apiResult.lighthouseResult.audits;

    return {
      data: {
        pageExperience: {
          fieldData: {
            lcp: {
              unit: UNIT_SEC,
              data: this.createFieldData(
                fieldData,
                'LARGEST_CONTENTFUL_PAINT_MS'
              ),
            },
            fid: {
              unit: UNIT_MS,
              data: this.createFieldData(fieldData, 'FIRST_INPUT_DELAY_MS'),
            },
            cls: {
              unit: UNIT_DEC,
              data: this.createFieldData(
                fieldData,
                'CUMULATIVE_LAYOUT_SHIFT_SCORE'
              ),
            },
          },
          labData: {
            lcp: {
              id: 'lcp',
              unit: UNIT_SEC,
              data: this.createLabData(labData['largest-contentful-paint']),
            },
            fid: {
              id: 'fid',
              unit: UNIT_MS,
              data: this.createLabData(labData['total-blocking-time']),
            },
            cls: {
              id: 'cls',
              unit: UNIT_DEC,
              data: this.createLabData(labData['cumulative-layout-shift']),
            },
          },
          textCompression:
            this.getAuditScore(labData, 'uses-text-compression') === 1,
          fastServerResponse:
            this.getAuditScore(labData, 'server-response-time') === 1,
          usesAppropriatelySizedImages:
            this.getAuditScore(labData, 'uses-responsive-images') === 1,
          usesOptimizedImages:
            this.getAuditScore(labData, 'uses-optimized-images') === 1,
          usesWebpImages: this.getAuditScore(labData, 'uses-webp-images') === 1,
          fastFontDisplay: this.getAuditScore(labData, 'font-display') === 1,
          minifiedCss: this.getAuditScore(labData, 'unminified-css') === 1,
        },
      },
    };
  }

  async fetchJson() {
    const response = await fetch(this.apiUrl.href);
    if (!response.ok) {
      throw new Error(`PageExperienceCheck failed for: ${this.apiUrl}`);
    }
    const result = await response.json();
    return result;
  }
}
