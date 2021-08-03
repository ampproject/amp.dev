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

async function getStatusId(checkPromises, recommendationsPromise) {
  try {
    const linter = await checkPromises.linter;
    if (linter.error) {
      return 'generic-error';
    }
    if (linter.hasUnsupportedContentType) {
      return 'invalid-content-type';
    }
    if (!linter.isLoaded) {
      return 'invalid-url';
    }
    if (!linter.isAmp) {
      return 'no-amp';
    }
    if (!linter.isOriginUrl) {
      return 'amp-cache-url';
    }

    // We need to check all promises for general error
    // (promise can be rejected or error is set in result)
    const recommendations = await recommendationsPromise;
    const pageExperienceChecks = await checkPromises.pageExperience;
    const mobileFriendliness = await checkPromises.mobileFriendliness;

    if (!linter.isValid) {
      return 'invalid-amp';
    }
    if (pageExperienceChecks.error) {
      return 'cwv-error';
    }
    if (mobileFriendliness.error) {
      return 'api-error';
    }

    const pageExperience = pageExperienceChecks.pageExperience;
    const cacheExperience = pageExperienceChecks.pageExperienceCached;

    // These are the other main checks apart from the core web vitals:
    const passedOtherCriteria =
      mobileFriendliness.mobileFriendly && linter.usesHttps;

    const dataType = pageExperience.source;
    const pagePassedAll =
      pageExperience[dataType].isAllFast && passedOtherCriteria;

    if (cacheExperience && cacheExperience[dataType]) {
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
        return pageExperience.fieldData
          ? 'failed-with-info'
          : 'failed-with-info-missing-field-data';
      }
      return 'failed-no-info';
    }

    if (recommendations.length > fixedRecommendations.length) {
      return pageExperience.fieldData
        ? 'passed-with-info'
        : 'failed-with-info-missing-field-data';
    }

    if (!pageExperience.fieldData) {
      return 'passed-missing-field-data';
    }

    return 'all-passed';
  } catch (err) {
    console.error('Failed to determine final status', err);
    return 'generic-error';
  }
}

export default getStatusId;
