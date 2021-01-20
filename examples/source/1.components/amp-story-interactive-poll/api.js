/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS-IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const examples = express.Router();

examples.get('/results/:id', (req, res) => {
  res.json({
    'options': [
      {
        'index': 0,
        'selected': false,
        'count': Math.floor(Math.random() * 50),
      },
      {
        'index': 1,
        'selected': false,
        'count': Math.floor(Math.random() * 100),
      },
      {
        'index': 2,
        'selected': false,
        'count': Math.floor(Math.random() * 50),
      },
      {
        'index': 3,
        'selected': false,
        'count': Math.floor(Math.random() * 50),
      },
    ],
  });
});

examples.get('/story', (req, res) => {
  res.sendFile('static/interactives.html', {root: __dirname});
});

examples.post('/results/:id/:verb', (_) => 200);

module.exports = examples;
