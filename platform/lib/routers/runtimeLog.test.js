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

jest.mock('node-fetch');
const fetch = require('node-fetch');
const {Response} = jest.requireActual('node-fetch');

const app = express();
const router = require('./runtimeLog.js');
app.use(router);

let response;
let status;

beforeEach(() => {
  jest.setMock(
    'node-fetch',
    jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: status === 200,
        status,
        json: () => {
          return Promise.resolve(response);
        },
      });
    })
  );
});

test('returns 400 on invalid version', done => {
  request(app)
    .get('/?version=abc&id=123')
    .expect(400, done);
});

test('returns 400 on invalid id', done => {
  request(app)
    .get('/?version=011905140117570&id=abc')
    .expect(400, done);
});

test('returns 404 for unresolved message', done => {
  fetch.mockReturnValue(Promise.resolve(new Response('', {status: 404})));
  request(app)
    .get('/?v=011905140117570&id=99999999')
    .expect(404, done);
});

test('shows message', done => {
  fetch.mockReturnValue(
    Promise.resolve(
      new Response(
        JSON.stringify({
          1234: {
            message: 'hello %s',
          },
        }),
        {status: 200}
      )
    )
  );
  request(app)
    .get('/?v=011905140117570&id=1234&s[]=world')
    .expect(/hello world/, done);
});
