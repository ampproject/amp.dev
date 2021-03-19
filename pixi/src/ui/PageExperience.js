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
import PageExperienceCacheCheck from '../checks/PageExperienceCacheCheck.js';
import SafeBrowsingCheck from '../checks/SafeBrowsingCheck.js';
import AmpLinterCheck from '../checks/AmpLinterCheck.js';
import MobileFriendlinessCheck from '../checks/MobileFriendlinessCheck.js';

import CoreWebVitalsReportView from './report/CoreWebVitalsReportView.js';
import BooleanCheckReportView from './report/BooleanCheckReportView.js';

import StatusIntroView from './StatusIntroView.js';
import RecommendationsView from './recommendations/RecommendationsView.js';

import InputBar from './InputBar.js';

import getRecommendations from '../utils/checkAggregation/recommendations.js';
import getStatusId from '../utils/checkAggregation/statusBanner';
import getIssueUrl from '../utils/issueUrl';

const totalNumberOfChecks =
  AmpLinterCheck.getCheckCount() +
  PageExperienceCheck.getCheckCount() +
  MobileFriendlinessCheck.getCheckCount() +
  SafeBrowsingCheck.getCheckCount();

export default class PageExperience {
  constructor() {
    i18n.init();

    this.reports = document.getElementById('reports');
    this.reportViews = {};

    this.pageExperienceCheck = new PageExperienceCheck();
    this.pageExperienceCacheCheck = new PageExperienceCacheCheck();
    this.safeBrowsingCheck = new SafeBrowsingCheck();
    this.linterCheck = new AmpLinterCheck();
    this.mobileFriendlinessCheck = new MobileFriendlinessCheck();

    this.inputBar = new InputBar(document, this.onSubmitUrl.bind(this));
    this.recommendationsView = new RecommendationsView(document);

    this.running = false;
  }

  async onSubmitUrl() {
    if (this.running) {
      return;
    }

    this.statusIntroView = new StatusIntroView(document, totalNumberOfChecks);
    this.toggleLoading(true);

    if (!(await this.inputBar.validate())) {
      this.toggleLoading(false);
      return;
    }

    const pageUrl = await this.inputBar.getPageUrl();
    this.running = true;

    const linterPromise = this.runLintCheck(pageUrl);

    this.pageExperienceCheck.setLocale(i18n.getLanguage());
    const pageExperiencePromise = this.runPageExperienceCheck(
      pageUrl,
      linterPromise
    );
    const safeBrowsingPromise = this.runSafeBrowsingCheck(pageUrl);
    const mobileFriendlinessPromise = this.runMobileFriendlinessCheck(pageUrl);

    const recommendationsPromise = getRecommendations(
      pageExperiencePromise,
      safeBrowsingPromise,
      linterPromise,
      mobileFriendlinessPromise
    );

    this.runStatusBannerResult(
      pageUrl,
      {
        linter: linterPromise,
        pageExperience: pageExperiencePromise,
        safeBrowsing: safeBrowsingPromise,
        mobileFriendliness: mobileFriendlinessPromise,
      },
      recommendationsPromise
    );

    const recommendations = await recommendationsPromise;
    if (recommendations.length > 0) {
      const issueUrl = await getIssueUrl(
        pageUrl,
        pageExperiencePromise,
        linterPromise,
        mobileFriendlinessPromise,
        safeBrowsingPromise
      );
      this.recommendationsView.setIssueUrl(issueUrl);
      this.recommendationsView.render(
        recommendations,
        pageUrl,
        this.reportViews.pageExperience.coreWebVitalViews
      );
    }

    this.running = false;
  }

  async runStatusBannerResult(pageUrl, checkPromises, recommendationsPromise) {
    checkPromises = Object.assign(
      {},
      {
        pageExperience: Promise.resolve({}),
        linter: Promise.resolve({}),
        mobileFriendliness: Promise.resolve({}),
        safeBrowsing: Promise.resolve({}),
      },
      checkPromises
    );
    recommendationsPromise = recommendationsPromise || Promise.resolve({});

    try {
      // remember the current instance to ensure the promises will not modify a future instance
      const statusView = this.statusIntroView;
      const statusBannerIdPromise = getStatusId(
        checkPromises,
        recommendationsPromise
      );

      checkPromises.linter.then(() => {
        statusView.increaseFinishedChecks(AmpLinterCheck.getCheckCount());
      });
      checkPromises.pageExperience.then(() => {
        statusView.increaseFinishedChecks(PageExperienceCheck.getCheckCount());
      });
      checkPromises.mobileFriendliness.then(() => {
        statusView.increaseFinishedChecks(
          MobileFriendlinessCheck.getCheckCount()
        );
      });
      checkPromises.safeBrowsing.then(() => {
        statusView.increaseFinishedChecks(SafeBrowsingCheck.getCheckCount());
      });

      statusView.render(statusBannerIdPromise, recommendationsPromise, pageUrl);
      await statusBannerIdPromise;
    } catch (error) {
      console.error('Unable to get page status', error);
    }
    this.toggleLoading(false);
  }

  async runPageExperienceCheck(pageUrl, linterPromise) {
    // Initialize views before running the check to be able
    // to toggle the loading state
    this.reportViews.pageExperience =
      this.reportViews.pageExperience ||
      new CoreWebVitalsReportView(document, 'core-web-vitals');
    this.reportViews.pageExperience.reset();

    const reportPromise = this.pageExperienceCheck.run(pageUrl);

    const linter = await linterPromise;
    let cacheReport = null;
    if (!linter.isAmp || !linter.isValid || !linter.isOriginUrl) {
      cacheReport = Promise.resolve({data: {}});
    } else {
      cacheReport = await this.pageExperienceCacheCheck.run(
        pageUrl,
        reportPromise
      );
    }

    const report = await reportPromise;
    this.reportViews.pageExperience.render(report, cacheReport);

    if (report.error) {
      console.error('Could not perform page experience check', report.error);
      return {error: report.error};
    }

    return {
      descriptions: report.descriptions,
      details: report.details,
      pageExperienceCached: (cacheReport.data || {}).pageExperience,
      ...report.data,
    };
  }

  async runSafeBrowsingCheck(pageUrl) {
    this.reportViews.safeBrowsing = new BooleanCheckReportView(
      document,
      'safe-browsing'
    );
    this.reportViews.safeBrowsing.toggleLoading(true);

    const {error, data} = await this.safeBrowsingCheck.run(pageUrl);
    this.reportViews.safeBrowsing.render(data.safeBrowsing);

    // Do not surface the actual error to the user. Simply log it
    // The BooleanCheckReportView will show "Analysis failed"
    // for undefined data
    if (error) {
      console.error('Could not perform safe browsing check', error);
      return {error};
    }

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
    if (data.isAmp && data.isOriginUrl) {
      this.reports.classList.remove('pristine');
      this.reportViews.httpsCheck.render(data.usesHttps);
    }
    return data;
  }

  async runMobileFriendlinessCheck(pageUrl) {
    this.reportViews.mobileFriendliness = new BooleanCheckReportView(
      document,
      'mobile-friendliness'
    );
    this.reportViews.mobileFriendliness.toggleLoading(true);

    const {error, data} = await this.mobileFriendlinessCheck.run(pageUrl);
    this.reportViews.mobileFriendliness.render(data.mobileFriendly);
    if (error) {
      console.error('Could not perform mobile friendliness check', error);
      return {error};
    }

    return data;
  }

  toggleLoading(force) {
    this.inputBar.toggleLoading(force);
    this.reports.classList.toggle('analysis-complete', !force);

    for (const report of Object.keys(this.reportViews)) {
      this.reportViews[report].toggleLoading(force);
    }

    if (force) {
      this.statusIntroView.resetView();
      this.recommendationsView.resetView();
      this.reports.classList.add('pristine');
    }
  }
}

new PageExperience();
