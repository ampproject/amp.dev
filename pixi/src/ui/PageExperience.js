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

const totalNumberOfChecks =
  AmpLinterCheck.getCheckCount() +
  PageExperienceCheck.getCheckCount() +
  MobileFriendlinessCheck.getCheckCount() +
  SafeBrowsingCheck.getCheckCount();
const NO_DATA = 'n/a';

function parseScore(metric) {
  const {data, unit} = metric;
  return `${(data.numericValue / unit.conversion).toFixed(unit.digits)} ${
    unit.name
  }`;
}

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
      pageExperiencePromise,
      linterPromise,
      mobileFriendlinessPromise,
      safeBrowsingPromise,
      recommendationsPromise
    );

    const recommendations = await recommendationsPromise;
    if (recommendations.length > 0) {
      const issueUrl = await this.getIssueUrl(
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

  async runStatusBannerResult(
    pageUrl,
    pageExperiencePromise,
    linterPromise,
    mobileFriendlinessPromise,
    safeBrowsingPromise,
    recommendationsPromise
  ) {
    try {
      // remember the current instance to ensure the promises will not modify a future instance
      const statusView = this.statusIntroView;
      const statusBannerIdPromise = getStatusId(
        recommendationsPromise,
        pageExperiencePromise,
        safeBrowsingPromise,
        linterPromise,
        mobileFriendlinessPromise
      );
      linterPromise.then(() => {
        statusView.increaseFinishedChecks(AmpLinterCheck.getCheckCount());
      });
      pageExperiencePromise.then(() => {
        statusView.increaseFinishedChecks(PageExperienceCheck.getCheckCount());
      });
      mobileFriendlinessPromise.then(() => {
        statusView.increaseFinishedChecks(
          MobileFriendlinessCheck.getCheckCount()
        );
      });
      safeBrowsingPromise.then(() => {
        statusView.increaseFinishedChecks(SafeBrowsingCheck.getCheckCount());
      });
      statusView.render(statusBannerIdPromise, recommendationsPromise, pageUrl);
      await statusBannerIdPromise;
    } catch (error) {
      console.error('unable to get page status', error);
    }
    this.toggleLoading(false);
  }

  async runPageExperienceCheck(pageUrl, linterDataPromise) {
    // Initialize views before running the check to be able
    // to toggle the loading state
    this.reportViews.pageExperience =
      this.reportViews.pageExperience ||
      new CoreWebVitalsReportView(document, 'core-web-vitals');
    this.reportViews.pageExperience.reset();

    const reportPromise = this.pageExperienceCheck.run(pageUrl);

    const linter = await linterDataPromise;
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

    if (report.error) {
      console.error('Could not perform page experience check', report.error);
      return {error: report.error};
    }

    this.reportViews.pageExperience.render(report, cacheReport);
    return {
      descriptions: report.descriptions,
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

  async getIssueUrl(
    pageUrl,
    pageExperiencePromise,
    linterPromise,
    mobileFriendlinessPromise,
    safeBrowsingPromise
  ) {
    const [
      {pageExperience},
      linter,
      mobileFriendliness,
      safeBrowsing,
    ] = await Promise.all([
      pageExperiencePromise,
      linterPromise,
      mobileFriendlinessPromise,
      safeBrowsingPromise,
    ]);
    const hasFieldData =
      pageExperience !== undefined && pageExperience.source === 'fieldData';
    const issueData = {
      lcp: hasFieldData ? parseScore(pageExperience.fieldData.lcp) : NO_DATA,
      fid: hasFieldData ? parseScore(pageExperience.fieldData.fid) : NO_DATA,
      cls: hasFieldData ? parseScore(pageExperience.fieldData.cls) : NO_DATA,
      labLcp: parseScore(pageExperience.labData.lcp),
      tbt: parseScore(pageExperience.labData.tbt),
      labCls: parseScore(pageExperience.labData.cls),
      safeBrowsing: safeBrowsing.safeBrowsing || NO_DATA,
      mobileFriendly: mobileFriendliness.mobileFriendly || NO_DATA,
      url: pageUrl,
      usedComponents: linter.components || NO_DATA,
      usesHttps:
        linter.usesHttps === undefined
          ? NO_DATA
          : linter.usesHttps === true
          ? 'pass'
          : 'fail',
    };
    return `https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type%3A+Page+experience&title=Pixi:+Poor+page+experience&body=URL%0A---%0A${issueData.url}%0A%0ADetails%0A---%0A%0A%7C%20Metric%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Field%20data%20%7C%20Lab%20data%20%7C%0A%7C-----------------%7C------------%7C---------%7C%0A%7C%20LCP%20%7C%20${issueData.lcp}%20%7C%20${issueData.labLcp}%20%7C%0A%7C%20FID%20%20%7C%20${issueData.fid}%20%7C%20${issueData.tbt}%20%7C%0A%7C%20CLS%20%20%7C%20${issueData.cls}%20%7C%20${issueData.labCls}%20%7C%0A%7C%20HTTPS%20%20%7C%20${issueData.usesHttps}%20%7C%20---%20%7C%0A%7C%20Safe%20browsing%20%20%7C%20${issueData.safeBrowsing}%20%7C%20---%20%7C%0A%7C%20Mobile-friendliness%20%20%7C%20${issueData.mobileFriendly}%20%7C%20---%20%7C%0A%7C%20Intrusive%20Interstitials%20%7C%20%3Cpass%2Ffail%3E%20%7C%20---%20%7C%0A%0ANotes%0A---%0A%0AComponents%20in%20use%3A%20${issueData.usedComponents}%0A%0A%0A%3C%21--%0A%3CAdditional%20notes%3E%0A--%3E%0A%0A%2Fcc%20%40ampproject%2Fwg-performance%60`;
  }

  toggleLoading(force) {
    this.inputBar.toggleLoading(force);
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
