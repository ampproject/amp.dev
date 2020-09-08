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

import {Category} from '../checks/PageExperienceCheck';

export const fixedRecommendations = ['intrusive-interstitials'];

const directLinterRecommendations = {
  usesHttps: 'https',
  isValid: 'valid-cached-amp',
  runtimeIsPreloaded: 'preload-amp-runtime',
  blockingExtensionsPreloaded: 'preload-render-blocking-extensions',
  fontsArePreloaded: 'preload-web-fonts',
  fastGoogleFontsDisplay: 'fast-font-display',
  googleFontPreconnect: 'preconnect-google-fonts',
  isTransformedAmp: 'use-amp-optimizer',
  moduleRuntimeIsUsed: 'upgrade-amp-optimizer', // TODO use specific recommendation when text is ready
  heroImageIsDefined: 'hero-images',
  noRenderBlockingExtension: 'prevent-render-blocking-extensions',
};

const directPageExperienceRecommendations = {
  usesAppropriatelySizedImages: 'appropriately-sized-images',
  textCompression: 'text-compression',
  fastServerResponse: 'server-response-time',
  usesOptimizedImages: 'optimized-images',
  usesWebpImages: 'next-gen-images',
  fastFontDisplay: 'fast-font-display',
  minifiedCss: 'minify-css',
};

const directSafeBrowsingRecommendations = {
  safeBrowsing: 'safe-browsing',
};

const directMobileFriendlinessRecommendations = {
  mobileFriendly: 'mobile-friendly',
  resourcesLoadable: 'resource-issues',
};

const addDirectRecommendations = (result, checks, mapping) => {
  for (const [check, status] of Object.entries(checks)) {
    if (status === false && mapping[check]) {
      result.push(mapping[check]);
    }
  }
};

export default async function getRecommendationIds(
  pageExperiencePromise,
  safeBrowsingPromise,
  linterPromise,
  mobileFriendlinessPromise
) {
  const [
    pageExperience,
    safeBrowsing,
    linter,
    mobileFriendliness,
  ] = await Promise.all([
    pageExperiencePromise,
    safeBrowsingPromise,
    linterPromise,
    mobileFriendlinessPromise,
  ]);

  const result = [...fixedRecommendations];

  addDirectRecommendations(result, linter, directLinterRecommendations);
  addDirectRecommendations(
    result,
    pageExperience,
    directPageExperienceRecommendations
  );
  addDirectRecommendations(
    result,
    safeBrowsing,
    directSafeBrowsingRecommendations
  );
  addDirectRecommendations(
    result,
    mobileFriendliness,
    directMobileFriendlinessRecommendations
  );

  if (linter.boilerplateIsRemoved === false) {
    if (linter.updateOptimizerForBoilerplateRemoval) {
      result.push('upgrade-amp-optimizer');
    } else if (
      pageExperience.fieldData &&
      pageExperience.fieldData.lcp.data.category !== Category.FAST
    ) {
      result.push('amp-boilerplate-removal');
    }
  }

  if (
    linter.noDynamicLayoutExtensions === false &&
    pageExperience.fieldData &&
    pageExperience.fieldData.cls.data.category !== Category.FAST
  ) {
    result.push('dynamic-layout-extensions');
  }

  return result.filter((item, i, ar) => ar.indexOf(item) === i);
}
