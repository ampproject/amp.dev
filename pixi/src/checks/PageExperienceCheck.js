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

import CoreWebVitalsReport from '../ui/report/CoreWebVitalsReport.js';
import {UNIT_DEC, UNIT_SEC, UNIT_MS} from './constants.js';

const CHECKS = [
  {
    id: 'LARGEST_CONTENTFUL_PAINT_MS',
    unit: UNIT_SEC,
  },
  {
    id: 'FIRST_INPUT_DELAY_MS',
    unit: UNIT_MS,
  },
  {
    id: 'CUMULATIVE_LAYOUT_SHIFT_SCORE',
    unit: UNIT_DEC,
  },
];

const API_ENDPOINT = `http://localhost:8080/page-experience/api/page-experience-dummy?url=`;
// const API_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=';
const API_KEY = '&key=AIzaSyCKKBvhpC73FqDcO-T7_4Yqdx4nQXh2sQY';

export default class PageExperienceCheck {
  constructor(pageUrl) {
    this.pageUrl = pageUrl;
  }

  async run() {
    const apiUrl = `${API_ENDPOINT}${this.pageUrl}${API_KEY}`;
    const apiResult = await this.callApi(apiUrl);

    return this.createReportData(apiResult);
  }

  createReportData(apiResult) {
    const reports = [];
    for (const check of CHECKS) {
      if (apiResult.loadingExperience.metrics[check.id]) {
        reports.push({
          type: 'CoreWebVitalsReport',
          checkId: check.id,
          unit: check.unit,
          data: apiResult.loadingExperience.metrics[check.id],
        });
      }
    }

    return reports;
  }

  async callApi(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      return result;
    } catch (e) {
      throw new Error('PageExperienceCheck failed:', e);
    }
  }
}
