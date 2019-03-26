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

const express = require('express');
const multer = require('multer');
const upload = multer();
const {setNoCache} = require('@lib/utils/cacheHelpers');

// eslint-disable-next-line new-cap
const examples = express.Router();

examples.get('/time', (request, response) => {
  setNoCache(response);
  response.json({
    time: new Date().toLocaleTimeString(),
  });
});

examples.get('/echo', (request, response) => {
  setNoCache(response);
  response.json(request.query);
});

examples.post('/echo', upload.none(), (request, response) => {
  setNoCache(response);
  response.json(request.body);
});

examples.get('/photo-stream', (req, res) => {
  const {query} = req;
  const items = [];
  const numberOfItems = req.query.items || 10;
  const pagesLeft = req.query.left || 1;
  const latency = query.latency || 0;

  if (pagesLeft == 0) {
    res.json({items: []});
  }

  for (let i = 0; i < numberOfItems; i++) {
    const imageUrl = 'http://picsum.photos/200?' +
        Math.floor(Math.random() * Math.floor(50));
    const r = {
      'title': 'Item ' + i,
      imageUrl,
    };
    items.push(r);
  }

  const nextUrl = '/photo-stream?items=' +
    numberOfItems + '&left=' + JSON.stringify(pagesLeft - 1);

  const randomFalsy = () => {
    const rand = Math.floor(Math.random() * Math.floor(3));
    switch (rand) {
      case 1: return null;
      case 2: return undefined;
      case 3: return '';
      default: return false;
    }
  };

  const next = pagesLeft == 0 ? randomFalsy() : nextUrl;
  const results = next === false ? {items} : {items, next};

  if (latency) {
    setTimeout(() => res.json(results), latency);
  } else {
    res.json(results);
  }
});

module.exports = examples;


