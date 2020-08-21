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

import i18n from './I18n.js';

import PageExperienceCheck from '../checks/PageExperienceCheck.js';
import SafeBrowsingCheck from '../checks/SafeBrowsingCheck.js';
import AmpLinterCheck from '../checks/AmpLinterCheck.js';
import MobileFriendlinessCheck from '../checks/MobileFriendlinessCheck.js';

import CoreWebVitalsReportView from './report/CoreWebVitalsReportView.js';
import BooleanCheckReportView from './report/BooleanCheckReportView.js';

export default class PageExperience {
  constructor() {
    this.input = document.getElementById('input-field');
    this.submit = document.getElementById('input-submit');
    this.submit.addEventListener('click', this.onSubmitUrl.bind(this));

    this.reports = document.getElementById('reports');
    this.reportViews = {};
    this.errors = [];

    this.pageExperienceCheck = new PageExperienceCheck();
    this.safeBrowsingCheck = new SafeBrowsingCheck();
    this.linterCheck = new AmpLinterCheck();
    this.mobileFriendlinessCheck = new MobileFriendlinessCheck();
  }

  isValidURL(pageUrl) {
    try {
      const url = new URL(pageUrl);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  async onSubmitUrl() {
    this.toggleLoading(true);
    this.reports.classList.remove('pristine');

    let pageUrl = this.input.value;
    // Can be removed once https://github.com/ampproject/worker-dom/issues/912
    // is fixed
    if (!pageUrl) {
      try {
        pageUrl = await AMP.getState('pixi.pageUrl');
      } catch (e) {
        console.error('Could not get page URL from amp-state', e);
      }
    }

    if (!this.isValidURL(pageUrl)) {
      this.toggleLoading(false);
      throw new Error('Please enter a valid URL');
    }

    // Everything until here is statically translated by Grow. From now
    // on Pixi might dynamically render translated strings, so wait
    // for them to be ready
    await i18n.init();

    // Reset errors from previous runs
    this.errors = [];

    const pageExperiencePromise = this.runPageExperienceCheck(pageUrl);
    const safeBrowsingPromise = this.runSafeBrowsingCheck(pageUrl);
    const linterPromise = this.runLintCheck(pageUrl);
    const mobileFriendlinessPromise = this.runMobileFriendlinessCheck(pageUrl);

    await Promise.all([
      pageExperiencePromise,
      safeBrowsingPromise,
      linterPromise,
      mobileFriendlinessPromise,
    ]);

    this.toggleLoading(false);
  }

  async runPageExperienceCheck(pageUrl) {
    // Initialize views before running the check to be able
    // to toggle the loading state
    this.reportViews.pageExperience =
      this.reportViews.pageExperience ||
      new CoreWebVitalsReportView(document, 'core-web-vitals');
    this.reportViews.pageExperience.reset();

    const report = await this.pageExperienceCheck.run(pageUrl);
    if (report.error) {
      this.errors.push(report.error);
      console.error('Page experience check failed', report.error);
      // TODO: Render error states to views
      return;
    }

    this.reportViews.pageExperience.render(report.data.coreWebVitals);
  }

  async runSafeBrowsingCheck(pageUrl) {
    this.reportViews.safeBrowsing = new BooleanCheckReportView(
      document,
      'safe-browsing'
    );
    this.reportViews.safeBrowsing.toggleLoading(true);

    const {error, data} = await this.safeBrowsingCheck.run(pageUrl);

    // Do not surface the actual error to the user. Simply log it
    // The BooleanCheckReportView will show "Analysis failed"
    // for undefined data
    if (error) {
      console.error('Could not perform safe browsing check', error);
    }
    this.reportViews.safeBrowsing.render(data);
  }

  async runLintCheck(pageUrl) {
    this.reportViews.httpsCheck = new BooleanCheckReportView(document, 'https');
    this.reportViews.httpsCheck.toggleLoading(true);

    const {error, data} = await this.linterCheck.run(pageUrl);
    if (error) {
      console.error('Could not perform safe browsing check', error);
    }
    this.reportViews.httpsCheck.render(data.usesHttps);
  }

  async runMobileFriendlinessCheck(pageUrl) {
    this.reportViews.mobileFriendliness = new BooleanCheckReportView(
      document,
      'mobile-friendliness'
    );
    this.reportViews.mobileFriendliness.toggleLoading(true);

    const {error, data} = await this.mobileFriendlinessCheck.run(pageUrl);
    if (error) {
      console.error('Could not perform mobile friendliness check', error);
    }
    this.reportViews.mobileFriendliness.render(data);
  }

  toggleLoading(force) {
    this.submit.classList.toggle('loading', force);
  }
}

new PageExperience();
