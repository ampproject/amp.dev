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
  const [{pageExperience}, linter, mobileFriendliness, safeBrowsing] =
    await Promise.all([
      pageExperiencePromise,
      linterPromise,
      mobileFriendlinessPromise,
      safeBrowsingPromise,
    ]);
  const hasPageExperience = pageExperience !== undefined;
  const hasFieldData =
    hasPageExperience && pageExperience.source === 'fieldData';
  const issueData = {
    lcp: hasFieldData ? parseScore(pageExperience.fieldData.lcp) : Result.none,
    fid: hasFieldData ? parseScore(pageExperience.fieldData.fid) : Result.none,
    cls: hasFieldData ? parseScore(pageExperience.fieldData.cls) : Result.none,
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
  };
  const body = encodeURIComponent(
    `URL
---
${issueData.url}

Details
---

| Metric                 | Field data | Lab data |
|-----------------|------------|---------|
| LCP | ${issueData.lcp} | ${issueData.labLcp} |
| FID  | ${issueData.fid} | ${issueData.tbt} |
| CLS  | ${issueData.cls} | ${issueData.labCls} |
| HTTPS  | ${issueData.usesHttps} | --- |
| Safe browsing  | ${issueData.safeBrowsing} | --- |
| Mobile-friendliness  | ${issueData.mobileFriendly} | --- |
| Intrusive Interstitials | <pass/fail> | --- |

Notes
---

Components in use: ${issueData.usedComponents}


<!--
<Additional notes>
-->

/cc @ampproject/wg-performance`
  );
  return `https://github.com/ampproject/wg-performance/issues/new?assignees=&labels=Type%3A+Page+experience&title=Pixi:+Poor+page+experience&body=${body}`;
}
