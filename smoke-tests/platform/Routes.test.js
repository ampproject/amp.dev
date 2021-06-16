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

const nodeFetch = require('node-fetch');
const config = require('@lib/config.js');
const Platform = require('@lib/platform.js');
const amphtmlValidator = require('amphtml-validator');
const {HEALTH_CHECK_PATH} = require('@lib/routers/healthCheck.js');

const platform = new Platform();
let validator;

describe('Routes', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    validator = await amphtmlValidator.getInstance();
    await platform.start();
  });
  afterAll(async () => {
    await platform.stop();
  });
  it('serves health check', async () => {
    const response = await fetch(HEALTH_CHECK_PATH);
    expect(response.status).toBe(200);
  });
  it('serves playground', async () => {
    const response = await fetch(config.hosts.playground.base);
    expect(response.status).toBe(200);
  });
  // it('serves logs', async () => {
  //   const sampleLogUrl = new URL(
  //     '?v=012005151844001&id=2y&s[]=amp-video&s[]=amp-video',
  //     config.hosts.log.base
  //   );
  //   const response = await fetch(sampleLogUrl);
  //   expect(response.status).toBe(200);
  // });
  it('serves health check', async () => {
    const response = await fetch(HEALTH_CHECK_PATH);
    expect(response.status).toBe(200);
  });
  describe('serves docs', () => {
    [
      '/',
      '/documentation/components/',
      '/documentation/examples/',
      '/documentation/components/amp-img',
      '/documentation/components/amp-story-page/?format=stories',
      '/documentation/components/amp-story-cta-layer/?format=stories',
      '/boilerplate',
    ].forEach(async (pagePath) => {
      it(pagePath, async () => {
        const response = await fetch(pagePath);
        expect(response.status).toBe(200);
        const body = await response.text();
        expect(await validate(body)).toBe(true);
      });
    });
  });
  it('serves pixi', async () => {
    const response = await fetch('/page-experience/');
    expect(response.status).toBe(200);
    const body = await response.text();
    expect(await validate(body)).toBe(true);
  });
  function fetch(path) {
    return nodeFetch(new URL(path, config.hosts.platform.base));
  }
});

async function validate(string) {
  const result = validator.validateString(string);
  if (result.status === 'PASS') {
    return true;
  }
  for (let ii = 0; ii < result.errors.length; ii++) {
    const error = result.errors[ii];
    let msg =
      'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    (error.severity === 'ERROR' ? console.error : console.warn)(msg);
  }
  // console.log(`\n\n${string}\n\n`);
  return false;
}
