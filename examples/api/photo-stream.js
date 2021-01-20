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
const {setMaxAge} = require('@lib/utils/cacheHelpers');
const casual = require('casual');

// eslint-disable-next-line new-cap
const examples = express.Router();

examples.all('/photo-stream', (req, res) => {
  setMaxAge(res, 60 * 60); // 1h
  const {query} = req;
  let items = [];
  const numberOfItems = Number(query.items) || 10;
  const pagesLeft = Number.isNaN(Number(query.left)) ? 1 : Number(query.left);
  const latency = Number(query.latency) || 0;
  const width = Number(query.width) || 200;
  const height = Number(query.height) || width;
  const dimensions = width === height ? String(width) : `${width}/${height}`;

  if (pagesLeft == 0) {
    res.json({items: []});
  }

  for (let i = 0; i < numberOfItems; i++) {
    const imageId = Math.floor(Math.random() * Math.floor(50));
    const imageUrl = `https://picsum.photos/id/${imageId}/${dimensions}`;
    const r = {
      id: `item${imageId}`,
      title: casual.title,
      description: casual.description,
      imageUrl,
    };
    items.push(r);
  }

  if ('single' in query) {
    items = items[0];
  }

  const nextUrl =
    req.baseUrl +
    '/photo-stream?items=' +
    numberOfItems +
    '&left=' +
    JSON.stringify(pagesLeft - 1);

  const randomFalsy = () => {
    const rand = Math.floor(Math.random() * Math.floor(3));
    switch (rand) {
      case 1:
        return null;
      case 2:
        return undefined;
      case 3:
        return '';
      default:
        return false;
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
