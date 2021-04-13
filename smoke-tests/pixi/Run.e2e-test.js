/**
 * Copyright 2021 The AMP HTML Authors. All Rights Reserved.
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

'use strict';

const Platform = require('../../platform/lib/platform.js');
const platform = new Platform();

describe('Pixi', () => {
  beforeAll(async () => {
    jest.setTimeout(60 * 1000);
    await platform.start();
    await page.goto(platformUrl('/page-experience/'));
  });

  afterAll(async () => {
    await platform.stop();
  });

  it('is served', async () => {
    await expect(page).toMatch('Analyze your AMP page');
  });

  it('accepts URL input', async () => {
    await expect(page).toFill('#input-field', 'http://amp.dev');
  });

  it('starts checks', async () => {
    await expect(page).toClick('#input-submit');
    await expect(page).toMatchElement('#status-intro-banner-loading', {
      visible: true,
    });
  });

  it('performs CWV check', async () => {
    await Promise.all([
      expect(page).toMatchElement(
        '.ap-m-pixi-primary-metric-header-title-full',
        {
          text: 'Loading speed',
          timeout: 30 * 1000,
        }
      ),

      expect(page).toMatchElement(
        '.ap-m-pixi-primary-metric-header-title-full',
        {
          text: 'Interactivity',
          timeout: 30 * 1000,
        }
      ),

      expect(page).toMatchElement(
        '.ap-m-pixi-primary-metric-header-title-full',
        {
          text: 'Visual stability',
          timeout: 30 * 1000,
        }
      ),
    ]);
  });

  it('performs Safe Browsing check', async () => {
    await expect(page).toMatchElement(
      '#safe-browsing .ap-m-pixi-basic-metric-status',
      {
        text: new RegExp('Passed|Failed', 'gm'),
        timeout: 30 * 1000,
      }
    );
  });

  it('performs HTTPS check', async () => {
    await expect(page).toMatchElement('#https .ap-m-pixi-basic-metric-status', {
      text: new RegExp('Passed|Failed', 'gm'),
      timeout: 30 * 1000,
    });
  });

  it('performs Mobile Friendliness check', async () => {
    await expect(page).toMatchElement(
      '#mobile-friendliness .ap-m-pixi-basic-metric-status',
      {
        text: new RegExp('Passed|Failed|Analysis failed', 'gm'),
        timeout: 30 * 1000,
      }
    );
  });

  it('shows recommendations', async () => {
    await expect(page).toMatchElement('.ap-m-pixi-recommendations-item', {
      timeout: 30 * 1000,
    });
  });
});
