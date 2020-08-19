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
    this.errors = [];

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
    const pageUrl = this.input.value;

    if (!this.isValidURL(pageUrl)) {
      // TODO: Initialize lab data reports
      throw new Error('Please enter a valid URL');
      return;
    }

    this.toggleLoading(true);

    // Reset errors from previous runs
    this.errors = [];

    const pageExperiencePromise = this.runPageExperienceCheck(pageUrl);
    const safeBrowsingPromise = this.runSafeBrowsingCheck(pageUrl);

    await Promise.all([pageExperiencePromise, safeBrowsingPromise]);

    this.toggleLoading(false);
  }

  async runPageExperienceCheck(pageUrl) {
    const report = await this.pageExperienceCheck.run(pageUrl);
    if (report.error) {
      this.errors.push(pageExperienceReport.error);
      return;
    }

    for (const [id, metric] of Object.entries(
      report.data.coreWebVitals.fieldData
    )) {
      this.reportViews[id] =
        this.reportViews[id] || new CoreWebVitalsReportView(document, id);
      this.reportViews[id].render(metric);
    }
  }

  async runSafeBrowsingCheck(pageUrl) {
    const {error, data} = await this.safeBrowsingCheck.run(pageUrl);
    this.reportViews.safeBrowsing = new BooleanCheckReportView(
      document,
      'safe-browsing'
    );

    // Do not surface the actual error to the user. Simply log it
    // The BooleanCheckReportView will show "Analysis failed"
    // for undefined data
    if (error) {
      console.error('Could not perform safe browsing check', error);
    }
    this.reportViews.safeBrowsing.render(data);
  }

  toggleLoading(force) {
    this.submit.classList.toggle('loading', force);
    for (const report of Object.keys(this.reportViews)) {
      this.reportViews[report].toggleLoading(force);
    }
  }
}

new PageExperience();
