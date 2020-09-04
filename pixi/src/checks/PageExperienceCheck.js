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

  createLabData(metric, id) {
    const data = {
      numericValue: metric.numericValue,
      proportion: METRICS_SCALES[id],
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

  createReportData(apiResultOrigin, apiResultCache) {
    const fieldDataOrigin = apiResultOrigin.loadingExperience.metrics;
    const labData = apiResultOrigin.lighthouseResult.audits;

    const fieldDataCache = apiResultCache.loadingExperience.metrics;
    const labDataCache = apiResultCache.lighthouseResult.audits;

    return {
      data: {
        pageExperience: {
          fieldData: {
            lcp: {
              unit: UNIT_SEC,
              data: this.createFieldData(
                fieldDataOrigin['LARGEST_CONTENTFUL_PAINT_MS'],
                fieldDataCache['LARGEST_CONTENTFUL_PAINT_MS']
              ),
            },
            fid: {
              unit: UNIT_MS,
              data: this.createFieldData(
                fieldDataOrigin['FIRST_INPUT_DELAY_MS'],
                fieldDataCache['FIRST_INPUT_DELAY_MS']
              ),
            },
            cls: {
              unit: UNIT_DEC,
              data: this.createFieldData(
                fieldDataOrigin['CUMULATIVE_LAYOUT_SHIFT_SCORE'],
                fieldDataCache['CUMULATIVE_LAYOUT_SHIFT_SCORE']
              ),
            },
          },
          labData: {
            lcp: {
              unit: UNIT_SEC,
              data: this.createLabData(
                labData['largest-contentful-paint'],
                'lcp'
              ),
            },
            fid: {
              unit: UNIT_MS,
              data: this.createLabData(labData['total-blocking-time'], 'fid'),
            },
            cls: {
              unit: UNIT_DEC,
              data: this.createLabData(
                labData['cumulative-layout-shift'],
                'cls'
              ),
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
