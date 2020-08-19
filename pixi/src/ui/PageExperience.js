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

import PageExperienceCheck from '../checks/PageExperienceCheck.js';
import SafeBrowsingCheck from '../checks/SafeBrowsingCheck.js';

import CoreWebVitalsReportView from './report/CoreWebVitalsReportView.js';
import BooleanCheckReportView from './report/BooleanCheckReportView.js';

export default class PageExperience {
  constructor() {
    this.input = document.getElementById('input-field');
    this.submit = document.getElementById('input-submit');
    this.submit.addEventListener('click', this.onSubmitUrl.bind(this));

    this.reportViews = {};

    this.pageExperienceCheck = new PageExperienceCheck();
    this.safeBrowsingCheck = new SafeBrowsingCheck();
  }

  isValidURL(inputUrl) {
    try {
      const url = new URL(inputUrl);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  async onSubmitUrl() {
    const inputUrl = this.input.value;

    if (!this.isValidURL(inputUrl)) {
      // TODO: Initialize lab data reports
      throw new Error('Please enter a valid URL');
    } else {
      this.toggleLoading(true);

      // Gather errors from all test runs
      const errors = [];

      // Core Web Vitals
      this.pageExperienceCheck.run(inputUrl).then((pageExperienceReport) => {
        const error = pageExperienceReport[0];
        if (error) {
          errors.push(error);
          // TODO: Trigger error handling
          return;
        }

        const data = pageExperienceReport[1];
        for (const [id, metric] of Object.entries(
          data.coreWebVitals.fieldData
        )) {
          this.reportViews[id] =
            this.reportViews[id] || new CoreWebVitalsReportView(document, id);
          this.reportViews[id].render(metric);
        }
      });

      // Additional checks
      this.safeBrowsingCheck.run(inputUrl).then((safeBrowsingReport) => {
        const [error, data] = safeBrowsingReport;
        if (error) {
          errors.push(error);
        }
        this.reportViews['safeBrowsing'] = new BooleanCheckReportView(
          document,
          'safe-browsing'
        );
        this.reportViews['safeBrowsing'].render(data);
      });

      // TODO: Check error array and render banner in UI
    }

    this.toggleLoading(false);
  }

  toggleLoading(force) {
    this.submit.classList.toggle('loading', force);
    for (const report of Object.keys(this.reportViews)) {
      this.reportViews[report].toggleLoading(force);
    }
  }
}

new PageExperience();
