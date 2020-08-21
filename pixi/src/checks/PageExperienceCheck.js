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

export default class PageExperienceCheck {
  constructor() {
    this.apiUrl = new URL(API_ENDPOINT);
    this.apiUrl.searchParams.append('key', AMP_DEV_PIXI_APIS_KEY);
  }

  async run(pageUrl) {
    this.apiUrl.searchParams.set('url', pageUrl);

    try {
      const apiResult = await this.fetchJson();
      return this.createReportData(apiResult);
    } catch (e) {
      return {error: e};
    }
  }

  createReportData(apiResult) {
    const report = {
      coreWebVitals: {
        fieldData: {
          lcp: {
            unit: UNIT_SEC,
            data:
              apiResult.loadingExperience.metrics[
                'LARGEST_CONTENTFUL_PAINT_MS'
              ],
          },
          fid: {
            unit: UNIT_MS,
            data: apiResult.loadingExperience.metrics['FIRST_INPUT_DELAY_MS'],
          },
          cls: {
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

    report.recommendations = [];
    for (const [key, details] of Object.entries(
      apiResult.lighthouseResult.audits
    )) {
      if (details.score) {
        report.recommendations.push({
          id: key,
          title: details.title,
          description: details.description,
        });
      }
    }

    return {data: report};
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
