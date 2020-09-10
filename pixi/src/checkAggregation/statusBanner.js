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

import {fixedRecommendations} from './recommendations';

const getStatusId = async (
  recommendationsPromise,
  pageExperiencePromise,
  safeBrowsingPromise,
  linterPromise,
  mobileFriendlinessPromise
) => {
  try {
    const linter = await linterPromise;
    if (!linter.isLoaded) {
      return 'invalid-url';
    }
    if (!linter.isAmp) {
      return 'no-amp';
    }
    if (!linter.isValid) {
      return 'invalid-amp';
    }

    // We need to check all promises for general error
    // (promise can be rejected or error is set in result)
    const [
      recommendations,
      pageExperienceChecks,
      safeBrowsing,
      mobileFriendliness,
    ] = await Promise.all([
      recommendationsPromise,
      pageExperiencePromise,
      safeBrowsingPromise,
      mobileFriendlinessPromise,
    ]);

    if (
      linter.error ||
      pageExperienceChecks.error ||
      safeBrowsing.error ||
      mobileFriendliness.error
    ) {
      return 'api-error';
    }

    const pageExperience = pageExperienceChecks.pageExperience;
    const cacheExperience = pageExperienceChecks.pageExperienceCached;

    // These are the other main checks apart from the core web vitals:
    const passedOtherCriteria =
      mobileFriendliness.mobileFriendly &&
      safeBrowsing.safeBrowsing &&
      linter.usesHttps;

    const dataType = pageExperience.source;
    const pagePassedAll =
      pageExperience[dataType].isAllFast && passedOtherCriteria;

    if (cacheExperience && cacheExperience[dataType] !== undefined) {
      const cachePassedAll =
        cacheExperience[dataType].isAllFast && passedOtherCriteria;
      if (cachePassedAll && !pagePassedAll) {
        if (recommendations.length > fixedRecommendations.length) {
          return 'origin-failed-with-info';
        }
        return 'origin-failed-no-info';
      }

      if (!cachePassedAll && pagePassedAll) {
        if (recommendations.length > fixedRecommendations.length) {
          return 'cache-failed-with-info';
        }
        return 'cache-failed-no-info';
      }
    }

    if (!pagePassedAll) {
      if (recommendations.length > fixedRecommendations.length) {
        return 'failed-with-info';
      }
      return 'failed-no-info';
    }

    if (recommendations.length > fixedRecommendations.length) {
      return 'passed-with-info';
    }
    return 'all-passed';
  } catch (err) {
    return 'api-error';
  }
};

export default getStatusId;
