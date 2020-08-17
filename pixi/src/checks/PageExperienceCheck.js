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

// const API_ENDPOINT = new URL('https://www.googleapis.com');
// API_ENDPOINT.pathname = '/pagespeedonline/v5/runPagespeed';
const API_ENDPOINT = new URL('http://localhost:8080');
API_ENDPOINT.pathname = '/page-experience/api/page-experience-dummy';
API_ENDPOINT.searchParams.append(
  'key',
  'AIzaSyCKKBvhpC73FqDcO-T7_4Yqdx4nQXh2sQY'
);

export default class PageExperienceCheck {
  constructor(pageUrl) {
    API_ENDPOINT.searchParams.append('url', pageUrl);
    this.pageUrl = API_ENDPOINT;
  }

  async run() {
    const apiResult = await this.fetchJson();
    return this.createReportData(apiResult);
  }

  createReportData(apiResult) {
    const reports = {
      CoreWebVitals: {
        fieldData: {
          lcp: {
            id: 'lcp',
            unit: UNIT_SEC,
            data:
              apiResult.loadingExperience.metrics[
                'LARGEST_CONTENTFUL_PAINT_MS'
              ],
          },
          fid: {
            id: 'fid',
            unit: UNIT_MS,
            data: apiResult.loadingExperience.metrics['FIRST_INPUT_DELAY_MS'],
          },
          cls: {
            id: 'cls',
            unit: UNIT_DEC,
            data:
              apiResult.loadingExperience.metrics[
                'CUMULATIVE_LAYOUT_SHIFT_SCORE'
              ],
          },
        },
        labData: {
          lcp: {
            id: 'lcp',
            unit: UNIT_SEC,
            data: apiResult.lighthouseResult.audits['largest-contentful-paint'],
          },
          fid: {
            id: 'fid',
            unit: UNIT_MS,
            data: apiResult.lighthouseResult.audits['interactive'],
          },
          cls: {
            id: 'cls',
            unit: UNIT_DEC,
            data: apiResult.lighthouseResult.audits['cumulative-layout-shift'],
          },
        },
      },
    };

    return reports;
  }

  async fetchJson() {
    try {
      const response = await fetch(this.pageUrl);
      if (!response.ok) {
        throw new Error(`PageExperienceCheck failed for: ${this.pageUrl}`);
      }
      const result = await response.json();
      return result;
    } catch (e) {
      throw new Error('PageExperienceCheck failed:', e);
    }
  }
}
