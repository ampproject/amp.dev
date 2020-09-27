/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const config = require('./config');

describe('config', () => {
  // We use the regular project podspec for testing as long as we only use attributes that are not likely to change
  it('Should build a grow podspec with languages, but without filter', () => {
    const podSpec = config.buildGrowPodSpec();

    expect(podSpec.localization.default_locale).toBe('en');

    const allLocales = podSpec.localization.locales;
    expect(allLocales.includes('en')).toBe(true);
    expect(allLocales.includes('es')).toBe(true);
    expect(allLocales.includes('fr')).toBe(true);

    expect(podSpec.deployments.default.filters).toBeUndefined();
  });

  it('Should build a grow podspec with languages and filters', () => {
    const podSpec = config.buildGrowPodSpec({locales: 'en,es'});

    const allLocales = podSpec.localization.locales;
    expect(allLocales.includes('en')).toBe(true);
    expect(allLocales.includes('es')).toBe(true);
    expect(allLocales.includes('fr')).toBe(true);

    expect(podSpec.deployments.default.filters.type).toBe('denylist');

    const filteredlocales = podSpec.deployments.default.filters.locales;
    expect(filteredlocales.includes('en')).toBe(false);
    expect(filteredlocales.includes('es')).toBe(false);
    expect(filteredlocales.includes('fr')).toBe(true);
  });
});
