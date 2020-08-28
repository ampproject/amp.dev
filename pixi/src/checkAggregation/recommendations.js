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

  const result = [];

  if (linter.usesHttps === false) {
    result.push('https');
  }
  if (linter.isValid === false) {
    result.push('valid-cached-amp');
  }
  if (linter.runtimeIsPreloaded === false) {
    result.push('preload-amp-runtime');
  }
  if (linter.blockingExtensionsPreloaded === false) {
    result.push('preload-render-blocking-extensions');
  }
  if (linter.fontsArePreloaded === false) {
    result.push('preload-web-fonts');
  }
  if (linter.fastGoogleFontsDisplay === false) {
    result.push('fast-font-display');
  }
  if (linter.googleFontPreconnect === false) {
    result.push('preconnect-google-fonts');
  }
  if (linter.isTransformedAmp === false) {
    result.push('use-amp-optimizer');
  }
  if (linter.moduleRuntimeIsUsed === false) {
    result.push('upgrade-amp-optimizer');
  }
  if (linter.heroImageIsDefined === false) {
    result.push('hero-images');
  }

  if (linter.boilerplateIsRemoved === false) {
    if (linter.updateOptimizerForBoilerplateRemoval) {
      result.push('upgrade-amp-optimizer');
    } else {
      result.push('amp-boilerplate-removal');
    }
  }

  if (linter.noRenderBlockingExtension === false) {
    result.push('prevent-render-blocking-extensions');
  }
  if (linter.noDynamicLayoutExtensions === false) {
    // TODO: also check for CLS
    result.push('dynamic-layout-extensions');
  }

  if (safeBrowsing.safeBrowsing === false) {
    result.push('safe-browsing');
  }

  if (mobileFriendliness.mobileFriendly === false) {
    result.push('mobile-friendly');
  }

  // This here is only to silence the linter complaining about unused vars
  if (!pageExperience) {
    // TODO: specific page experience results
    result.push('responsive-images');
  }

  return result.filter((item, i, ar) => ar.indexOf(item) === i);
}
