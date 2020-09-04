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

export default async function getStatusId(
  recommendationsPromise,
  pageExperiencePromise,
  safeBrowsingPromise,
  linterPromise,
  mobileFriendlinessPromise
) {
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
      pageExperience,
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
      pageExperience.error ||
      safeBrowsing.error ||
      mobileFriendliness.error
    ) {
      return 'api-error';
    }

    // This here is only to silence the linter complaining about unused vars
    if (!pageExperience) {
      // TODO: specific page experience results
      return 'failed-with-info';
    }

    // if we reach this point all the page has passed the tests...
    if (recommendations.length > fixedRecommendations.length) {
      return 'passed-with-info';
    }
    return 'all-passed';
  } catch (err) {
    return 'api-error';
  }
}
