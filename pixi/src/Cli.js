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

import PageExperienceCheck from './checks/PageExperienceCheck.js';
import PageExperienceCacheCheck from './checks/PageExperienceCacheCheck.js';
import SafeBrowsingCheck from './checks/SafeBrowsingCheck.js';
import AmpLinterCheck from './checks/AmpLinterCheck.js';
import MobileFriendlinessCheck from './checks/MobileFriendlinessCheck.js';

import getRecommendations from './utils/checkAggregation/recommendations.js';
import CheckCache from './utils/checkCache';
import fetch from 'node-fetch';

const Result = {
  pass: 'pass',
  fail: 'fail',
  none: 'n/a',
};

function getTextFromBoolean(result) {
  if (result === undefined) {
    return Result.none;
  }
  return result ? Result.pass : Result.fail;
}

function parseScore(metric) {
  const {data, unit} = metric;
  return `${(data.numericValue / unit.conversion).toFixed(unit.digits)} ${
    unit.name
  }`;
}

export default class PageExperienceCli {
  constructor() {
    const cache = new CheckCache();
    const amp = {
      getState: () => true,
    };
    this.pageExperienceCheck = new PageExperienceCheck(fetch);
    this.pageExperienceCacheCheck = new PageExperienceCacheCheck(fetch);
    this.safeBrowsingCheck = new SafeBrowsingCheck(cache, fetch);
    this.linterCheck = new AmpLinterCheck(amp, fetch);
    this.mobileFriendlinessCheck = new MobileFriendlinessCheck(cache, fetch);
  }

  async run(pageUrl) {
    const linterPromise = this.runLintCheck(pageUrl);

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

    const recommendations = await recommendationsPromise;

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

    const hasPageExperience = pageExperience !== undefined;
    const hasFieldData =
      hasPageExperience && pageExperience.source === 'fieldData';
    return {
      lcp: hasFieldData
        ? parseScore(pageExperience.fieldData.lcp)
        : Result.none,
      fid: hasFieldData
        ? parseScore(pageExperience.fieldData.fid)
        : Result.none,
      cls: hasFieldData
        ? parseScore(pageExperience.fieldData.cls)
        : Result.none,
      labLcp: hasPageExperience
        ? parseScore(pageExperience.labData.lcp)
        : Result.none,
      tbt: hasPageExperience
        ? parseScore(pageExperience.labData.tbt)
        : Result.none,
      labCls: hasPageExperience
        ? parseScore(pageExperience.labData.cls)
        : Result.none,
      safeBrowsing: getTextFromBoolean(safeBrowsing.safeBrowsing),
      mobileFriendly: getTextFromBoolean(mobileFriendliness.mobileFriendly),
      url: pageUrl,
      usedComponents: linter.components || Result.none,
      usesHttps: getTextFromBoolean(linter.usesHttps),
      recommendations,
    };
  }

  async runPageExperienceCheck(pageUrl, linterPromise) {
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
    const {error, data} = await this.safeBrowsingCheck.run(pageUrl);

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
    const {error, data} = await this.linterCheck.run(pageUrl);
    if (error) {
      console.error('Could not perform AMP Linter check', error);
      return {error};
    }
    return data;
  }

  async runMobileFriendlinessCheck(pageUrl) {
    const {error, data} = await this.mobileFriendlinessCheck.run(pageUrl);
    if (error) {
      console.error('Could not perform mobile friendliness check', error);
      return {error};
    }

    return data;
  }
}
