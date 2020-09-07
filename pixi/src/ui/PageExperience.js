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

import SatusIntroView from './SatusIntroView.js';
import RecommendationsView from './recommendations/RecommendationsView.js';

import InputBar from './InputBar.js';

import getRecommendationIds from '../checkAggregation/recommendations.js';
import getStatusId from '../checkAggregation/statusBanner';

export default class PageExperience {
  constructor() {
    this.reports = document.getElementById('reports');
    this.reportViews = {};

    this.pageExperienceCheck = new PageExperienceCheck();
    this.safeBrowsingCheck = new SafeBrowsingCheck();
    this.linterCheck = new AmpLinterCheck();
    this.mobileFriendlinessCheck = new MobileFriendlinessCheck();

    this.inputBar = new InputBar(document, this.onSubmitUrl.bind(this));
    this.satusIntroView = new SatusIntroView(document);
    this.recommendationsView = new RecommendationsView(document);
  }

  async onSubmitUrl() {
    this.toggleLoading(true);

    // Everything until here is statically translated by Grow. From now
    // on Pixi might dynamically render translated strings, so wait
    // for them to be ready
    await i18n.init();

    const pageUrl = await this.inputBar.getPageUrl();
    if (!pageUrl) {
      this.toggleLoading(false);
      this.inputBar.toggleError(true, i18n.getText('analyze.fieldError'));
      return;
    }

    this.reports.classList.remove('pristine');
    this.recommendationsView.container.classList.remove('pristine');

    const pageExperiencePromise = this.runPageExperienceCheck(pageUrl);
    const safeBrowsingPromise = this.runSafeBrowsingCheck(pageUrl);
    const linterPromise = this.runLintCheck(pageUrl);
    const mobileFriendlinessPromise = this.runMobileFriendlinessCheck(pageUrl);

    const recommendationIdsPromise = getRecommendationIds(
      pageExperiencePromise,
      safeBrowsingPromise,
      linterPromise,
      mobileFriendlinessPromise
    );

    this.runStatusBannerResult(
      pageUrl,
      pageExperiencePromise,
      linterPromise,
      mobileFriendlinessPromise,
      safeBrowsingPromise,
      recommendationIdsPromise
    );

    this.recommendationsView.render(await recommendationIdsPromise);
  }

  async runStatusBannerResult(
    pageUrl,
    pageExperiencePromise,
    linterPromise,
    mobileFriendlinessPromise,
    safeBrowsingPromise,
    recommendationIdsPromise
  ) {
    try {
      const statusBannerId = await getStatusId(
        recommendationIdsPromise,
        pageExperiencePromise,
        safeBrowsingPromise,
        linterPromise,
        mobileFriendlinessPromise
      );
      this.toggleLoading(false);
      return this.satusIntroView.render(statusBannerId, pageUrl);
    } catch (error) {
      console.log('unable to get page status', error);
      this.toggleLoading(false);
      return this.satusIntroView.render('api-error.md', pageUrl);
    }
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
      console.error('Could not perform page experience check', report.error);
      return {error: report.error};
    }

    this.reportViews.pageExperience.render(report);
    return report.data;
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
      return {error};
    }
    this.reportViews.safeBrowsing.render(data.safeBrowsing);

    return data;
  }

  async runLintCheck(pageUrl) {
    this.reportViews.httpsCheck = new BooleanCheckReportView(document, 'https');
    this.reportViews.httpsCheck.toggleLoading(true);

    const {error, data} = await this.linterCheck.run(pageUrl);
    if (error) {
      console.error('Could not perform AMP Linter check', error);
      return {error};
    }
    this.reportViews.httpsCheck.render(data.usesHttps);

    return data;
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
      return {error};
    }
    this.reportViews.mobileFriendliness.render(data.mobileFriendly);

    return data;
  }

  toggleLoading(force) {
    this.inputBar.toggleLoading(force);
    this.recommendationsView.container.classList.toggle('loading', force);

    for (const report of Object.keys(this.reportViews)) {
      this.reportViews[report].toggleLoading(force);
    }
  }
}

new PageExperience();
