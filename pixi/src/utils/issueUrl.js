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

export default async function getIssueUrl(
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
    safeBrowsing: getTextFromBoolean(safeBrowsing.safeBrowsing),
    mobileFriendly: getTextFromBoolean(mobileFriendliness.mobileFriendly),
    url: pageUrl,
    usedComponents: linter.components || NO_DATA,
    usesHttps: getTextFromBoolean(linter.usesHttps),
  };
  return encodeURIComponent(
    `https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type%3A+Page+experience&title=Pixi:+Poor+page+experience&body=URL%0A---%0A${issueData.url}%0A%0ADetails%0A---%0A%0A%7C%20Metric%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Field%20data%20%7C%20Lab%20data%20%7C%0A%7C-----------------%7C------------%7C---------%7C%0A%7C%20LCP%20%7C%20${issueData.lcp}%20%7C%20${issueData.labLcp}%20%7C%0A%7C%20FID%20%20%7C%20${issueData.fid}%20%7C%20${issueData.tbt}%20%7C%0A%7C%20CLS%20%20%7C%20${issueData.cls}%20%7C%20${issueData.labCls}%20%7C%0A%7C%20HTTPS%20%20%7C%20${issueData.usesHttps}%20%7C%20---%20%7C%0A%7C%20Safe%20browsing%20%20%7C%20${issueData.safeBrowsing}%20%7C%20---%20%7C%0A%7C%20Mobile-friendliness%20%20%7C%20${issueData.mobileFriendly}%20%7C%20---%20%7C%0A%7C%20Intrusive%20Interstitials%20%7C%20%3Cpass%2Ffail%3E%20%7C%20---%20%7C%0A%0ANotes%0A---%0A%0AComponents%20in%20use%3A%20${issueData.usedComponents}%0A%0A%0A%3C%21--%0A%3CAdditional%20notes%3E%0A--%3E%0A%0A%2Fcc%20%40ampproject%2Fwg-performance%60`
  );
}
