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
const config = require('@lib/config');
const express = require('express');
const request = require('supertest');
const URL = require('url').URL;

const app = express();
const router = require('./growPages.js');
app.use(router);

// eslint-disable-next-line new-cap
const next = express.Router();
next.get('/*', async (req, res) => {
  lastRequest = req;
  res.send('next');
});

app.use(next);

function url(path) {
  return new URL(path, config.hosts.platform.base).toString();
}

test('URL with / at the end is not redirected', done => {
  request(app)
    .get('/nonexisting/')
    .expect(200, 'next')
    .end(done);
});

test('URL without extension gets trailing slash', done => {
  request(app)
    .get('/nonexisting/file')
    .expect(301)
    .expect('Location', url('/nonexisting/file/'))
    .end(done);
});

test('URL with .html extension gets .html removed and trailing slash added', done => {
  request(app)
    .get('/nonexisting/file.html')
    .expect(301)
    .expect('Location', url('/nonexisting/file/'))
    .end(done);
});

test('URL with .amp.html extension gets .amp.html removed and trailing slash added', done => {
  request(app)
    .get('/nonexisting/file.amp.html')
    .expect(301)
    .expect('Location', url('/nonexisting/file/'))
    .end(done);
});

test('URL with .js extension is not rewritten', done => {
  request(app)
    .get('/nonexisting/file.js')
    .expect(200, 'next')
    .end(done);
});
