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

'use strict';

const Platform = require('../../platform/lib/platform.js');
const platform = new Platform();

describe('Pixi', () => {

  beforeAll(async () => {
    jest.setTimeout(10000);
    await platform.start();
  });

  afterAll(async () => {
    await platform.stop();
  });

  it('is served', async () => {
    console.log('Going to', platformUrl('/page-experience/'));
    await page.goto(platformUrl('/page-experience/'));
    await expect(page).toMatch('Analyze your AMP page');
  })

  //  it('serves health check', async () => {
  //    const response = await fetch(HEALTH_CHECK_PATH);
  //    expect(response.status).toBe(200);
  //  });
  //  it('serves playground', async () => {
  //    const response = await fetch(config.hosts.playground.base);
  //    expect(response.status).toBe(200);
  //  });
});