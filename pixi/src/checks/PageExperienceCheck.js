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

import ampToolboxCacheUrl from '@ampproject/toolbox-cache-url';
import {UNIT_DEC, UNIT_SEC, UNIT_MS} from './constants.js';

export const Category = {
  FAST: 'FAST',
  SLOW: 'SLOW',
  AVERAGE: 'AVERAGE',
};

const API_ENDPOINT = API_ENDPOINT_PAGE_SPEED_INSIGHTS;
const DEVICE_STRATEGY = 'MOBILE';
const AMP_PROJECT_CDN_URL = 'cdn.ampproject.org';
const METRICS_SCALES = {
  lcp: {
    fast: 2500,
    average: 4000,
    slow: 6000,
  },
  fid: {
    fast: 100,
    average: 300,
    slow: 800,
  },
  cls: {
    fast: 10,
    average: 25,
    slow: 40,
  },
};

export default class PageExperienceCheck {
  async run(originUrl) {
    const cacheUrl = await ampToolboxCacheUrl.createCacheUrl(
      AMP_PROJECT_CDN_URL,
      originUrl
    );

    try {
      const [apiResultOrigin, apiResultCache] = await Promise.all([
        this.fetchJson(originUrl),
        this.fetchJson(cacheUrl),
      ]);

      return this.createReportData(apiResultOrigin, apiResultCache);
    } catch (e) {
      return {error: e};
    }
  }

  createFieldData(metricOrigin, metricCache) {
    const improvement = metricOrigin.percentile - metricCache.percentile;
    const data = {
      numericValue: metricOrigin.percentile,
      category: metricOrigin.category,
      improvement: improvement,
      proportion: metricOrigin.distributions[0].proportion,
    };

    return data;
  }

  createLabData(metricOrigin, metricCache, id) {
    const improvement = metricOrigin.numericValue - metricCache.numericValue;
    const data = {
      numericValue: metricOrigin.numericValue,
      improvement: improvement,
      proportion: METRICS_SCALES[id],
    };

    if (data.score < 0.5) {
      data.category = Category.SLOW;
    } else if (data.score < 0.75) {
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
      return true;
    }
    return metrics[checkId].data.category === Category.FAST;
  }

  createReportData(apiResult) {
    const fieldMetrics = apiResult.loadingExperience.metrics;
    const audits = apiResult.lighthouseResult.audits;

    const fieldData = !fieldMetrics
      ? undefined
      : {
          lcp: {
            unit: UNIT_SEC,
            data: this.createFieldData(
              fieldMetrics['LARGEST_CONTENTFUL_PAINT_MS'],
              'lcp'
            ),
          },
          fid: {
            unit: UNIT_MS,
            data: this.createFieldData(
              fieldMetrics['FIRST_INPUT_DELAY_MS'],
              'fid'
            ),
          },
          cls: {
            unit: UNIT_DEC,
            data: this.createFieldData(
              fieldMetrics['CUMULATIVE_LAYOUT_SHIFT_SCORE'],
              'cls'
            ),
          },
        };

    const labData = {
      lcp: {
        unit: UNIT_SEC,
        data: this.createLabData(audits['largest-contentful-paint'], 'lcp'),
      },
      fid: {
        unit: UNIT_MS,
        data: this.createLabData(audits['total-blocking-time'], 'fid'),
      },
      cls: {
        unit: UNIT_DEC,
        data: this.createLabData(audits['cumulative-layout-shift'], 'cls'),
      },
    };

    const isAllFast =
      this.isFastData(fieldData, 'cls') &&
      this.isFastData(fieldData, 'fid') &&
      this.isFastData(fieldData, 'lcp') &&
      this.isFastData(labData, 'cls') &&
      this.isFastData(labData, 'fid') &&
      this.isFastData(labData, 'lcp');

    const result = {
      fieldData,
      labData,
      isAllFast,
      textCompression:
        this.getAuditScore(audits, 'uses-text-compression') === 1,
      fastServerResponse:
        this.getAuditScore(audits, 'server-response-time') === 1,
      usesAppropriatelySizedImages:
        this.getAuditScore(audits, 'uses-responsive-images') === 1,
      usesOptimizedImages:
        this.getAuditScore(audits, 'uses-optimized-images') === 1,
      usesWebpImages: this.getAuditScore(audits, 'uses-webp-images') === 1,
      fastFontDisplay: this.getAuditScore(audits, 'font-display') === 1,
      minifiedCss: this.getAuditScore(audits, 'unminified-css') === 1,
    };

    return {
      data: {
        pageExperience: result,
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
