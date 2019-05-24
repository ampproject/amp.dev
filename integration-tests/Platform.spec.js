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

// const nodeFetch = require('node-fetch');
// const config = require('@lib/config.js');
// const Platform = require('@lib/platform.js');
// const platform = new Platform();
// const {HEALTH_CHECK_PATH} = require('@lib/routers/healthCheck.js');

describe('Platform', () => {
  it('is it not implemented yet', () => {
  });
  /*
  beforeAll(async (done) => {
    await platform.start();
    setTimeout(done, 1000);
  });
  afterAll(async (done) => {
    await platform.stop();
    done();
  });
  it('serves health check', async (done) => {
    const response = await fetch(HEALTH_CHECK_PATH);
    expect(response.status).toBe(200);
    console.log('response', response.status);
    done();
  });
  describe('serves valid AMP pages:', () => {
    [
      '/',
      '/documentation/components/',
      '/documentation/examples/',
      '/boilerplate',
    ].forEach(async (url) => {

      it(url, async (done) => {
        const response = await fetch(url);
        expect(response.status).toBe(200);
        done();
      });

      const ampUrl = url + 'index.amp.html';

      it(ampUrl, async (done) => {
        const response = await fetch(ampUrl);
        expect(response.status).toBe(200);
        done();
      });
    });
  });
  function fetch(path) {
    return nodeFetch(config.hosts.platform.base + path);
  }
  */
});

