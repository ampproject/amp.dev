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

      // Core Web Vitals
      const pageExperienceReport = await this.pageExperienceCheck .run(inputUrl);
      for (const [id, metric] of Object.entries(
        pageExperienceReport.coreWebVitals.fieldData
      )) {
        this.reportViews[id] =
          this.reportViews[id] || new CoreWebVitalsReportView(document, id);
        this.reportViews[id].render(metric);
      }

      // Additional checks
      const safeBrowsingReport = await this.safeBrowsingCheck.run(inputUrl);
      const safeBrowsingReportView = new BooleanCheckReportView(
        document,
        'safe-browsing'
      );
      safeBrowsingReportView.render(safeBrowsingReport);
      // TODO: Show error message in UI
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
