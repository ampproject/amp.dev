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
const express = require('express');
const request = require('supertest');

const GO_LINKS_YAML = `
/email: /about/email
/websites: /about/websites
^/c/amp-([a-z-]+)$:
  url: /documentation/components/amp-$1
  useRegex: true
`;

jest.mock('js-yaml');
const yaml = require('js-yaml');
const {safeLoad} = jest.requireActual('js-yaml');
const goLinks = safeLoad(GO_LINKS_YAML);
yaml.safeLoad.mockReturnValue(goLinks);

const app = express();
const router = require('./go.js');
app.use(router);

test('redirects simple golink', done => {
  request(app)
    .get('/email')
    .expect(302)
    .expect('Location', /\/about\/email$/, done);
});

test('redirects regex golink', done => {
  request(app)
    .get('/c/amp-fit-text')
    .expect(302)
    .expect('Location', /\/documentation\/components\/amp-fit-text$/, done);
});

test('returns 404 on invalid golink', done => {
  request(app)
    .get('/invalid')
    .expect(404, done);
});
