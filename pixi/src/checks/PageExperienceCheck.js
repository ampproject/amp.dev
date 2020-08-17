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

// const API_ENDPOINT = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
const API_ENDPOINT = 'http://localhost:8080/page-experience/api/page-experience-dummy';
const API_KEY = 'AIzaSyCKKBvhpC73FqDcO-T7_4Yqdx4nQXh2sQY';

export default class PageExperienceCheck {
  constructor(pageUrl) {
    this.apiUrl = new URL(API_ENDPOINT);
    this.apiUrl.searchParams.append('key', API_KEY);
  }

  async run() {
    try {
      const apiResult = await this.fetchJson();
      return this.createReportData(apiResult);
    } catch (e) {
      // TODO: Create an Error Report
      throw new Error('PageExperienceCheck failed fetching json:', e);
    }
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
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`PageExperienceCheck failed for: ${this.apiUrl}`);
      }
      const result = await response.json();
      return result;
    } catch (e) {
      throw new Error('PageExperienceCheck failed:', e);
    }
  }
}
